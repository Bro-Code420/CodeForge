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
  let isMobile = false;

  // Parallax position and camera variables
  let objectOffsetX = 0;
  let objectOffsetY = 0;
  let cameraOrbitTheta = 0;
  let cameraOrbitPhi = 75;
  let spinAngle = 0;

  function checkMobile() {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 1024;
    }
  }

  function handleMouseMove(e) {
    if (isMobile) return;
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  function handleTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      targetMouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (touch.clientY / window.innerHeight) * 2 - 1;
    }
  }

  function handleDeviceOrientation(e) {
    if (e && e.gamma !== null && e.beta !== null) {
      // Gyroscope phone tilt tracking on mobile
      const normGamma = Math.max(-1, Math.min(1, e.gamma / 30));
      const normBeta = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      targetMouseX = normGamma;
      targetMouseY = normBeta;
    }
  }

  function spinMonitor() {
    spinAngle += 360;
  }

  function updateParallax() {
    // Smooth lerp (interpolation) for fluid movement
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // Parallax logic
    objectOffsetX = -mouseX * (isMobile ? 25 : 45);
    objectOffsetY = -mouseY * (isMobile ? 12 : 20);

    cameraOrbitTheta = mouseX * (isMobile ? 55 : 40) + spinAngle;
    cameraOrbitPhi = 75 + mouseY * (isMobile ? 18 : 12);

    if (modelViewerRef) {
      modelViewerRef.cameraOrbit = `${cameraOrbitTheta}deg ${cameraOrbitPhi}deg 100%`;
    }

    animationFrameId = requestAnimationFrame(updateParallax);
  }

  onMount(() => {
    checkMobile();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    window.addEventListener('resize', checkMobile);

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', checkMobile);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<section id="about" class="relative mb-20 pt-2 pb-8 overflow-hidden select-none">
  <!-- Top Saw-tooth / Serrated Edge (Razor-Sharp Repeating Vector Marquee) -->
  <TriangleMarquee className="mb-4" speed="0.8s" />

  <!-- Meta Header Bar -->
  <div class="border-t-2 border-b-2 border-primary py-2.5 px-4 mb-8 flex flex-col sm:flex-row justify-between items-center font-mono text-xs md:text-sm font-bold tracking-widest uppercase gap-2">
    <span>CODE FORGE 2026 // VOL. I ISSUE 01</span>
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
      <div class="swallowtail-ribbon shadow-md">
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
          <div class="absolute inset-0 bg-primary translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <button class="relative w-full bg-burgundy text-background px-8 py-4 font-mono text-lg font-black uppercase border-2 border-primary transition-all hover:cursor-pointer flex items-center justify-center gap-2">
            REGISTER STATION <span>→</span>
          </button>
        </a>
      </div>
    </div>

    <!-- Right Column: Interactive 3D Retro Monitor with Touch & Gyro Orientation for Mobile -->
    <div class="lg:col-span-6 relative w-full flex flex-col items-center lg:items-end -mt-4 lg:mt-0">
      <div 
        style="transform: translate3d({objectOffsetX}px, {objectOffsetY}px, 0px);"
        class="relative w-full max-w-[580px] h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center will-change-transform transition-transform duration-75 ease-out"
        on:click={spinMonitor}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && spinMonitor()}
      >
        <model-viewer
          bind:this={modelViewerRef}
          src="/monitor.glb"
          alt="3D Retro CRT Monitor"
          camera-controls
          auto-rotate={isMobile}
          auto-rotate-delay="3000"
          rotation-per-second="12deg"
          touch-action="pan-y"
          interaction-prompt="none"
          disable-zoom
          shadow-intensity="1.5"
          shadow-softness="0.6"
          exposure="1.2"
          camera-orbit="0deg 75deg 100%"
          field-of-view="30deg"
          style="width: 100%; height: 100%; background-color: transparent; touch-action: pan-y;"
          class="w-full h-full cursor-grab active:cursor-grabbing"
        >
        </model-viewer>
      </div>

      <!-- Mobile Interactive Hint Badge -->
      <div class="block lg:hidden mt-2 text-center">
        <button 
          on:click={spinMonitor}
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-background font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-primary rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <span>↺</span>
          <span>TOUCH OR TILT PHONE TO ROTATE 3D MONITOR</span>
        </button>
      </div>
    </div>

  </div>

  <!-- Integrated Metrics Data Grid Row (From Original Hero Data) -->
  <div class="max-w-7xl mx-auto px-2 md:px-6 mt-8 md:mt-12 lg:mt-16 mb-6">
    <div class="border-2 border-primary bg-white/70 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 sm:divide-y-0 divide-primary">
        {#each heroData.metrics as metric}
          <div class="p-4 flex flex-col justify-center">
            <span class="font-mono text-[10px] uppercase opacity-70 font-bold block mb-1">{metric.label}</span>
            <span class="font-headline font-bold text-base md:text-lg text-primary">{metric.value}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Bottom Framing Horizontal Rule -->
  <div class="border-b-2 border-primary w-full mt-6"></div>
</section>
