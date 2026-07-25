<script>
  import { onMount } from 'svelte';
  import { heroData } from '../data/gazetteData.js';
  import TriangleMarquee from './TriangleMarquee.svelte';

  let modelViewerRef;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let animationFrameId;

  // Parallax position and camera variables with smooth physics lerp
  let objectOffsetX = 0;
  let objectOffsetY = 0;
  let objectRotationY = 0;
  let objectRotationX = 0;
  let cameraOrbitTheta = 0;
  let cameraOrbitPhi = 75;

  let isHovered = false;
  let time = 0;

  function handleMouseMove(e) {
    // Normalize mouse position: center = 0, left = -1, right = +1, top = -1, bottom = +1
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  function updateParallax() {
    time += 0.03;

    // Organic floating levitation effect
    const floatY = Math.sin(time * 0.8) * 6;
    const floatX = Math.cos(time * 0.6) * 4;
    const floatTilt = Math.sin(time * 0.7) * 2;

    // Smooth spring lerp for fluid cursor tracking
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Subtle 3D position translation & 3D tilt
    objectOffsetX = -mouseX * 22 + floatX;
    objectOffsetY = -mouseY * 12 + floatY;
    objectRotationY = mouseX * 14 + floatTilt;
    objectRotationX = -mouseY * 8;

    // Camera tracking: camera angle follows cursor direction smoothly
    cameraOrbitTheta = mouseX * 25 + Math.sin(time * 0.5) * 3;
    cameraOrbitPhi = 75 + mouseY * 8 + Math.cos(time * 0.6) * 2;

    if (modelViewerRef) {
      modelViewerRef.cameraOrbit = `${cameraOrbitTheta.toFixed(2)}deg ${cameraOrbitPhi.toFixed(2)}deg 100%`;
    }

    animationFrameId = requestAnimationFrame(updateParallax);
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<section id="about" class="relative mb-20 pt-2 pb-8 overflow-hidden select-none">
  <!-- Top Saw-tooth / Serrated Edge (Razor-Sharp Repeating Vector Marquee) -->
  <TriangleMarquee className="mb-4" speed="0.8s" />

  <!-- Meta Header Bar -->
  <div class="border-t-2 border-b-2 border-primary py-2.5 px-4 mb-8 flex flex-col sm:flex-row justify-between items-center font-mono text-xs md:text-sm font-bold tracking-widest uppercase gap-2">
    <span class="flex items-center gap-2">
      <span class="inline-block w-2 h-2 rounded-full bg-burgundy animate-pulse"></span>
      CODE FORGE 2026 // VOL. I ISSUE 01
    </span>
    <span>NAGPUR, INDIA — AUGUST 21, 2026</span>
  </div>

  <!-- Hero Main Content Grid -->
  <div class="max-w-7xl mx-auto px-2 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative min-h-[480px] pb-16">
    
    <!-- Left Column: Bold Headline, Ribbon & Original Intro Copy + CTA -->
    <div class="lg:col-span-6 flex flex-col items-start z-10 space-y-6">
      <!-- Headline -->
      <div class="font-masthead font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.88] tracking-normal text-primary uppercase text-left distressed-text">
        <div>CODE</div>
        <div>FORGE</div>
      </div>

      <!-- Black Ribbon Badge with Swallowtail Cutout -->
      <div class="swallowtail-ribbon shadow-md hover:scale-[1.02] transition-transform duration-300">
        <span class="font-mono text-sm md:text-base font-bold uppercase tracking-[0.25em] text-background">
          REGISTRATION OPEN
        </span>
      </div>

      <!-- Lead Narrative Text from Hero Data -->
      <p class="text-base sm:text-lg leading-relaxed text-justify font-body max-w-xl text-primary/95 pt-2">
        {heroData.leadParas[0]}
      </p>

      <!-- CTA Action Button & Live Status -->
      <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md">
        <a href="#registry" class="group relative inline-block flex-1">
          <div class="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-200"></div>
          <button class="relative w-full bg-burgundy text-background px-8 py-4 font-mono text-lg font-black uppercase border-2 border-primary transition-all hover:cursor-pointer flex items-center justify-center gap-2 group-hover:bg-[#800000] active:scale-[0.98]">
            REGISTER STATION <span class="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </button>
        </a>
      </div>
    </div>

    <!-- Right Column: Interactive 3D Retro Monitor with Physics & CRT Glow -->
    <div 
      class="lg:col-span-6 relative w-full flex justify-center lg:justify-end -mt-4 lg:mt-0 tilt-card-container"
      on:mouseenter={() => (isHovered = true)}
      on:mouseleave={() => (isHovered = false)}
      role="region"
      aria-label="3D CRT Monitor Display"
    >
      <div 
        style="transform: translate3d({objectOffsetX}px, {objectOffsetY}px, 0px) rotateY({objectRotationY}deg) rotateX({objectRotationX}deg);"
        class="relative w-full max-w-[580px] h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center will-change-transform transition-transform duration-100 ease-out"
      >
        <!-- Ambient Warm CRT Glow Backdrop -->
        <div class="crt-glow-backdrop opacity-80"></div>

        <!-- 3D Model Viewer with Drag, Touch and Orbit Physics -->
        <model-viewer
          bind:this={modelViewerRef}
          src="/monitor.glb"
          alt="3D Retro CRT Monitor - CODE FORGE"
          touch-action="pan-y"
          camera-controls
          auto-rotate-delay="0"
          interaction-prompt="none"
          disable-zoom
          shadow-intensity="1.6"
          shadow-softness="0.5"
          exposure="1.2"
          camera-orbit="0deg 75deg 100%"
          field-of-view="28deg"
          style="width: 100%; height: 100%; background-color: transparent;"
          class="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        >
        </model-viewer>

        <!-- Interactive Hint Badge on Hover -->
        <div class="absolute bottom-2 right-4 z-20 pointer-events-none opacity-70 font-mono text-[9px] uppercase tracking-widest bg-primary text-background px-2.5 py-1 border border-background shadow-sm transition-opacity duration-300">
          ✦ DRAG TO ROTATE 3D DISPLAY ✦
        </div>
      </div>
    </div>

  </div>

  <!-- Integrated Metrics Data Grid Row with Hover Elevation -->
  <div class="max-w-7xl mx-auto px-2 md:px-6 mt-8 md:mt-12 lg:mt-16 mb-6">
    <div class="border-2 border-primary bg-white/80 shadow-sm transition-shadow hover:shadow-md">
      <div class="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 sm:divide-y-0 divide-primary">
        {#each heroData.metrics as metric}
          <div class="p-4 flex flex-col justify-center hover:bg-primary/5 transition-colors duration-200 cursor-default group">
            <span class="font-mono text-[10px] uppercase opacity-70 font-bold block mb-1 group-hover:text-burgundy transition-colors">{metric.label}</span>
            <span class="font-headline font-bold text-base md:text-lg text-primary">{metric.value}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Bottom Framing Horizontal Rule -->
  <div class="border-b-2 border-primary w-full mt-6"></div>
</section>

