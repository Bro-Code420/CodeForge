<script>
  import { onMount, onDestroy } from 'svelte';

  export let texts = [
    'CODE FORGE 2026 ✦ THE EDITORIAL GAZETTE ✦ INNOVATION IN MOTION',
    'BUILD FOR IMPACT ✦ RESEARCH • ENGINEER • TRANSFORM'
  ];
  export let velocity = 80;
  export let className = 'font-headline text-primary font-black uppercase tracking-wider';
  export let numCopies = 6;

  let lastScrollY = 0;
  let lastTime = performance.now();
  let scrollVelocity = 0;
  let smoothVelocity = 0;
  let animationFrame;

  let rowOffsets = texts.map(() => 0);
  let copyWidths = texts.map(() => 0);
  let copyRefs = [];

  function handleScroll() {
    if (typeof window === 'undefined') return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const deltaY = currentScrollY - lastScrollY;
    
    scrollVelocity = (deltaY / dt) * 1000;
    lastScrollY = currentScrollY;
    lastTime = now;
  }

  function measureWidths() {
    copyRefs.forEach((el, index) => {
      if (el) {
        copyWidths[index] = el.offsetWidth || 0;
      }
    });
  }

  function update() {
    const now = performance.now();

    // Smooth spring/lerp scroll velocity damping
    smoothVelocity += (scrollVelocity - smoothVelocity) * 0.12;
    scrollVelocity *= 0.9;

    const velocityFactor = Math.min(4, Math.max(-4, smoothVelocity / 250));

    texts.forEach((_, index) => {
      const isOdd = index % 2 !== 0;
      let baseVel = isOdd ? -velocity : velocity;

      let moveBy = baseVel * (1 / 60);
      moveBy += moveBy * Math.abs(velocityFactor);

      if (velocityFactor > 0.1) {
        moveBy += Math.abs(baseVel) * velocityFactor * (isOdd ? -0.5 : 0.5);
      } else if (velocityFactor < -0.1) {
        moveBy -= Math.abs(baseVel) * Math.abs(velocityFactor) * (isOdd ? -0.5 : 0.5);
      }

      rowOffsets[index] += moveBy;

      const w = copyWidths[index] || 1;
      if (w > 0) {
        rowOffsets[index] = (((rowOffsets[index] % w) + w) % w) - w;
      }
    });

    rowOffsets = rowOffsets;
    animationFrame = requestAnimationFrame(update);
  }

  onMount(() => {
    lastTime = performance.now();
    lastScrollY = typeof window !== 'undefined' ? (window.scrollY || 0) : 0;

    measureWidths();
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', measureWidths, { passive: true });
    }

    animationFrame = requestAnimationFrame(update);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureWidths);
    }
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>

<section class="scroll-velocity-container border-t-2 border-b-2 border-primary py-3 my-8 bg-primary/5 select-none overflow-hidden" aria-label="Scroll Velocity Banner">
  {#each texts as text, index}
    <div class="parallax relative overflow-hidden py-1">
      <div 
        class="scroller flex whitespace-nowrap will-change-transform"
        style="transform: translate3d({rowOffsets[index].toFixed(2)}px, 0, 0);"
      >
        {#each Array(numCopies) as _, copyIndex}
          <span 
            class="{className} px-4 inline-block flex-shrink-0"
            bind:this={copyRefs[index]}
          >
            {text} &nbsp;✦&nbsp;
          </span>
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  .parallax {
    position: relative;
    overflow: hidden;
  }

  .scroller {
    display: flex;
    white-space: nowrap;
    text-align: center;
    font-size: 1.875rem; /* 30px on mobile */
    line-height: 2.25rem;
    font-weight: 900;
    letter-spacing: -0.01em;
  }

  .scroller span {
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    .scroller {
      font-size: 3.25rem; /* 52px on tablet */
      line-height: 3.75rem;
    }
  }

  @media (min-width: 1024px) {
    .scroller {
      font-size: 4.5rem; /* 72px on desktop */
      line-height: 4.75rem;
    }
  }
</style>
