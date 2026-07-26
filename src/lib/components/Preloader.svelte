<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import gsap from 'gsap';

  const dispatch = createEventDispatcher();

  let preloaderComplete = false;
  let preloaderBtnRef;
  let btnOutlineTrackRef;
  let btnOutlineProgressRef;
  let preloaderRef;

  onMount(() => {
    const svgPathLength = 974;

    gsap.set([btnOutlineTrackRef, btnOutlineProgressRef], {
      strokeDasharray: svgPathLength,
      strokeDashoffset: svgPathLength
    });

    const introTl = gsap.timeline({ delay: 0.3 });

    introTl
      .to(".preloader .p-row p .line", {
        y: "0%",
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1
      })
      .to(
        btnOutlineTrackRef,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power4.inOut"
        },
        "<"
      )
      .to(
        ".pbc-svg-strokes svg",
        {
          rotation: 270,
          duration: 1.6,
          ease: "power4.inOut"
        },
        "<"
      );

    const progressStops = [0.25, 0.65, 1];

    progressStops.forEach((stop, i) => {
      introTl.to(btnOutlineProgressRef, {
        strokeDashoffset: svgPathLength - svgPathLength * stop,
        duration: 0.55,
        ease: "power3.inOut",
        delay: i === 0 ? 0.2 : 0.2
      });
    });

    introTl
      .to(
        "#pbc-logo",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power1.out"
        },
        "-=0.2"
      )
      .to(
        preloaderBtnRef,
        {
          scale: 0.9,
          duration: 1.0,
          ease: "power4.inOut"
        },
        "-=0.3"
      )
      .to(
        "#pbc-label .line",
        {
          y: "0%",
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            preloaderComplete = true;
            // AUTOMATIC TRANSITION AFTER 1 SECOND PAUSE:
            setTimeout(() => {
              handleEngage();
            }, 1000);
          }
        },
        "-=0.6"
      );
  });

  function handleEngage() {
    if (!preloaderComplete) return;
    preloaderComplete = false;

    dispatch("engageStart");

    const svgPathLength = 974;
    const exitTl = gsap.timeline();

    exitTl
      .to(preloaderRef, {
        scale: 0.75,
        duration: 1.0,
        ease: "power4.inOut"
      })
      .to(
        [btnOutlineTrackRef, btnOutlineProgressRef],
        {
          strokeDashoffset: -svgPathLength,
          duration: 1.0,
          ease: "power4.inOut"
        },
        "<"
      )
      .to(
        "#pbc-label .line",
        {
          y: "-100%",
          duration: 0.5,
          ease: "power3.out"
        },
        "-=1.0"
      )
      .to(
        "#pbc-outro-label .line",
        {
          y: "0%",
          duration: 0.5,
          ease: "power3.out"
        },
        "-=0.5"
      )
      .to(preloaderRef, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          dispatch("complete");
        }
      });
  }
</script>

<!-- PRELOADER FOREGROUND (Black screen overlay revealing Hero underneath) -->
<div bind:this={preloaderRef} class="preloader">
  <div class="p-row font-mono text-xs uppercase tracking-widest">
    <div class="overflow-hidden"><p class="line">Initiating System</p></div>
    <div class="overflow-hidden"><p class="line">Vol. I Issue 01</p></div>
  </div>

  <div class="p-row font-mono text-xs uppercase tracking-wider">
    <div class="p-col flex gap-8 md:gap-16 items-end">
      <div class="p-sub-col flex flex-col gap-1">
        <div class="overflow-hidden"><p class="line">Phase 01</p></div>
        <div class="overflow-hidden"><p class="line">Sequence</p></div>
      </div>
      <div class="p-sub-col flex flex-col gap-1">
        <div class="overflow-hidden"><p class="line">Signal Scan</p></div>
        <div class="overflow-hidden"><p class="line">07 Layers</p></div>
      </div>
    </div>
    <div class="p-col">
      <div class="overflow-hidden"><p class="line">PX-17 // FORGE-2026</p></div>
    </div>
  </div>

  <!-- CENTER INTERACTIVE BUTTON -->
  <button
    bind:this={preloaderBtnRef}
    on:click={handleEngage}
    class="preloader-btn-container group cursor-pointer focus:outline-none"
    aria-label="Engage Code Forge"
  >
    <!-- Logo SVG Icon: Retro Terminal Monitor Icon -->
    <div id="pbc-logo" class="w-16 h-16 flex items-center justify-center text-background">
      <svg class="w-12 h-12 text-white/90" viewBox="0 0 32 32" fill="none" stroke="currentColor">
        <!-- Heavy Outer Terminal Frame with Rounded Corners -->
        <rect x="5" y="6" width="22" height="15" rx="3" stroke-width="2.5" />
        <!-- Inner Screen Area -->
        <rect x="7" y="8" width="18" height="11" rx="1.5" stroke-width="1.5" fill="currentColor" fill-opacity="0.12" />
        <!-- Top-Right Solid Dot Indicator -->
        <circle cx="21" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
        <!-- Terminal Prompt: > -->
        <path d="M10 12l2.5 2.5L10 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Terminal Cursor: _ -->
        <line x1="14" y1="17" x2="17" y2="17" stroke-width="2" stroke-linecap="round" />
        <!-- Stand Neck -->
        <path d="M13 21v2.5M19 21v2.5" stroke-width="2" stroke-linecap="round" />
        <!-- Heavy Base Bar -->
        <rect x="8" y="24" width="16" height="2.5" rx="1" fill="currentColor" stroke="none" />
      </svg>
    </div>

    <!-- Label "CodeForge" -->
    <div id="pbc-label" class="overflow-hidden font-mono font-bold text-sm md:text-base uppercase tracking-[0.2em] text-white">
      <p class="line">CodeForge</p>
    </div>

    <!-- Outro Label "ACCESS GRANTED" -->
    <div id="pbc-outro-label" class="overflow-hidden font-mono font-bold text-sm md:text-base uppercase tracking-[0.2em] text-green-400 opacity-0">
      <p class="line">Access Granted</p>
    </div>

    <!-- SVG Circle Stroke Animations -->
    <div class="pbc-svg-strokes">
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" class="w-full h-full">
        <circle
          bind:this={btnOutlineTrackRef}
          class="stroke-track"
          cx="160"
          cy="160"
          r="155"
          stroke="#444444"
          stroke-width="2"
          stroke-dasharray="974"
          stroke-dashoffset="974"
        />
        <circle
          bind:this={btnOutlineProgressRef}
          class="stroke-progress"
          cx="160"
          cy="160"
          r="155"
          stroke="#F6F1E8"
          stroke-width="2.5"
          stroke-dasharray="974"
          stroke-dashoffset="974"
        />
      </svg>
    </div>
  </button>
</div>

<style>
  .preloader {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: #161616;
    color: #F6F1E8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    will-change: transform, clip-path;
    z-index: 9999;
  }

  .p-row {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
  }

  .preloader-btn-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18rem;
    height: 18rem;
  }

  @media (min-width: 768px) {
    .preloader-btn-container {
      width: 20rem;
      height: 20rem;
    }
  }

  .pbc-svg-strokes,
  #pbc-logo,
  #pbc-label,
  #pbc-outro-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .line {
    position: relative;
    transform: translateY(100%);
    will-change: transform;
    display: block;
  }

  .stroke-track {
    opacity: 0.35;
    fill: none;
  }

  .stroke-progress {
    fill: none;
    stroke-linecap: round;
    transform-origin: center;
    transform: rotate(-90deg);
    transform-box: fill-box;
  }
</style>
