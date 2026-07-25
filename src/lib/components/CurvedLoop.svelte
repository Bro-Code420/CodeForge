<script>
  import { onMount, onDestroy } from 'svelte';

  export let marqueeText = 'CODE FORGE 2026 ✦ THE EDITORIAL GAZETTE ✦ INNOVATION IN MOTION ✦ BUILD FOR IMPACT ✦ ';
  export let speed = 2;
  export let className = 'font-headline fill-primary text-primary font-black uppercase tracking-wider';
  export let curveAmount = 140;
  export let direction = 'left';
  export let interactive = true;
  export let fontSize = '5.5rem';

  let measureRef;
  let textPathRef;
  let pathRef;

  let spacing = 0;
  let offset = 0;

  const uid = Math.random().toString(36).substring(2, 9);
  const pathId = `curve-${uid}`;

  $: pathD = `M-100,45 Q500,${45 + curveAmount} 1540,45`;

  $: text = (/\s|\u00A0$/.test(marqueeText) ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';

  let isDragging = false;
  let lastX = 0;
  let currentDir = direction;
  let vel = 0;
  let animFrame;

  $: totalText = spacing > 0
    ? Array(Math.ceil(2200 / spacing) + 3).fill(text).join('')
    : text;

  $: ready = spacing > 0;

  function updateMeasure() {
    if (measureRef && typeof measureRef.getComputedTextLength === 'function') {
      spacing = measureRef.getComputedTextLength();
    }
  }

  $: if (spacing > 0 && textPathRef) {
    const initial = -spacing;
    textPathRef.setAttribute('startOffset', initial + 'px');
    offset = initial;
  }

  function startAnimation() {
    if (animFrame) cancelAnimationFrame(animFrame);

    function step() {
      if (!isDragging && textPathRef && spacing > 0) {
        const delta = currentDir === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.setAttribute('startOffset', newOffset + 'px');
        offset = newOffset;
      }
      animFrame = requestAnimationFrame(step);
    }
    animFrame = requestAnimationFrame(step);
  }

  onMount(() => {
    updateMeasure();
    startAnimation();
  });

  onDestroy(() => {
    if (animFrame) cancelAnimationFrame(animFrame);
  });

  function handlePointerDown(e) {
    if (!interactive) return;
    isDragging = true;
    lastX = e.clientX;
    vel = 0;
    if (e.target && typeof e.target.setPointerCapture === 'function') {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback for browsers
      }
    }
  }

  function handlePointerMove(e) {
    if (!interactive || !isDragging || !textPathRef || spacing <= 0) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    vel = dx;

    const currentOffset = parseFloat(textPathRef.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.setAttribute('startOffset', newOffset + 'px');
    offset = newOffset;
  }

  function handlePointerEnd() {
    if (!interactive) return;
    isDragging = false;
    currentDir = vel > 0 ? 'right' : 'left';
  }

  $: cursorStyle = interactive ? (isDragging ? 'grabbing' : 'grab') : 'auto';
</script>

<div
  class="curved-loop-jacket select-none w-full relative overflow-hidden my-4 sm:my-8"
  style="visibility: {ready ? 'visible' : 'hidden'}; cursor: {cursorStyle}; --svg-font-size: {fontSize};"
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerEnd}
  on:pointerleave={handlePointerEnd}
  role="region"
  aria-label="Curved Marquee Loop"
>
  <svg class="curved-loop-svg w-full block overflow-visible select-none" viewBox="0 0 1440 220">
    <text bind:this={measureRef} xmlSpace="preserve" style="visibility: hidden; opacity: 0; pointer-events: none;" class="svg-curved-text {className}">
      {text}
    </text>
    <defs>
      <path bind:this={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
    </defs>
    {#if ready}
      <text font-weight="900" xmlSpace="preserve" class="svg-curved-text {className}">
        <textPath bind:this={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
          {totalText}
        </textPath>
      </text>
    {/if}
  </svg>
</div>

<style>
  .curved-loop-jacket {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .curved-loop-svg {
    user-select: none;
    -webkit-user-select: none;
    width: 100%;
    aspect-ratio: 100 / 16;
    overflow: visible;
    display: block;
    line-height: 1;
  }

  .svg-curved-text {
    font-size: var(--svg-font-size, 5.5rem);
    font-weight: 900;
  }

  /* Responsive SVG font scaling on mobile screens */
  @media (max-width: 640px) {
    .curved-loop-svg {
      aspect-ratio: 100 / 25;
    }
    .svg-curved-text {
      font-size: 6.8rem; /* Scaled up in SVG space for mobile readability */
    }
  }
</style>

