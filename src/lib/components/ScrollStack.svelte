<script>
  import { onMount, onDestroy } from 'svelte';
  import Lenis from 'lenis';

  export let className = '';
  export let itemDistance = 40;
  export let itemScale = 0.03;
  export let itemStackDistance = 25;
  export let stackPosition = '15%';
  export let scaleEndPosition = '8%';
  export let baseScale = 0.88;
  export let rotationAmount = 0;
  export let blurAmount = 0;
  export let useWindowScroll = true;

  let scrollerRef;
  let containerRef;
  let lenisInstance;
  let animFrame;
  let isUpdating = false;
  let lastTransforms = new Map();
  let cardTopCache = [];
  let totalSpacerHeight = 200;

  function calculateProgress(scrollTop, start, end) {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }

  function parsePercentage(value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }

  function getScrollData() {
    if (useWindowScroll) {
      return {
        scrollTop: typeof window !== 'undefined' ? (window.scrollY || window.pageYOffset || 0) : 0,
        containerHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
      };
    } else {
      const scroller = scrollerRef;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 800,
      };
    }
  }

  function measureCardOffsets() {
    if (!containerRef || typeof window === 'undefined') return;
    const cards = Array.from(containerRef.querySelectorAll('.scroll-stack-card'));
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Cache initial un-transformed offsets to prevent layout thrashing inside scroll loop
    cardTopCache = cards.map(card => {
      // Temporarily clear inline transform to measure true static offset
      const savedTransform = card.style.transform;
      card.style.transform = 'none';
      const rect = card.getBoundingClientRect();
      const top = rect.top + scrollY;
      card.style.transform = savedTransform;
      return top;
    });

    if (cards.length > 1) {
      totalSpacerHeight = 650;
    }
  }

  function updateCardTransforms() {
    if (!containerRef || isUpdating) return;
    const cards = Array.from(containerRef.querySelectorAll('.scroll-stack-card'));
    if (!cards.length) return;

    isUpdating = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopCache[i] || card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      
      const lastCardTop = cardTopCache[cards.length - 1] || cardTop;
      const pinEnd = lastCardTop - stackPositionPx + 500;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTopCache[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransforms.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.2 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransforms.set(i, newTransform);
      }
    });

    isUpdating = false;
  }

  function handleScroll() {
    updateCardTransforms();
  }

  function handleResize() {
    measureCardOffsets();
    updateCardTransforms();
  }

  onMount(() => {
    if (!containerRef) return;
    const cards = Array.from(containerRef.querySelectorAll('.scroll-stack-card'));

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
    });

    measureCardOffsets();

    if (useWindowScroll && typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });

      try {
        lenisInstance = new Lenis({
          duration: 1.0,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.5,
          lerp: 0.12
        });

        lenisInstance.on('scroll', handleScroll);

        const raf = time => {
          if (lenisInstance) {
            lenisInstance.raf(time);
            animFrame = requestAnimationFrame(raf);
          }
        };
        animFrame = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis scroll init fallback:', err);
      }
    }

    updateCardTransforms();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
    if (animFrame) cancelAnimationFrame(animFrame);
    if (lenisInstance) {
      try {
        lenisInstance.destroy();
      } catch (e) {}
    }
  });
</script>

<div class="scroll-stack-wrapper w-full relative {className}" bind:this={scrollerRef}>
  <div class="scroll-stack-inner w-full relative" bind:this={containerRef}>
    <slot />
    <div class="scroll-stack-end w-full" style="height: {totalSpacerHeight}px;" aria-hidden="true" />
  </div>
</div>

<style>
  .scroll-stack-wrapper {
    position: relative;
    width: 100%;
  }

  :global(.scroll-stack-card) {
    transform-origin: top center;
    will-change: transform, filter;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    position: relative;
    transition: box-shadow 0.3s ease;
  }
</style>


