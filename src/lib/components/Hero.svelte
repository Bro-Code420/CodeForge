<script>
  import { onMount } from 'svelte';
  import { heroData } from '../data/gazetteData.js';
  import TriangleMarquee from './TriangleMarquee.svelte';

  let modelViewerRef;
  let robotContainerRef;
  let animationFrameId;

  let isHolding = false;
  let dragDistance = 0;
  let startX = 0;
  let startY = 0;
  let startTheta = 0;
  let startPhi = 75;

  let currentTheta = 0;
  let targetTheta = 0;
  let currentPhi = 75;
  let targetPhi = 75;

  // Forge Robot Dialogue State
  const forgeMessages = [
    "HI Coder!",
    "I'm Forge!",
    "All the Best for Hackathon!"
  ];
  let tapIndex = 0;
  let showSpeechBubble = false;
  let currentMessage = "";
  let speechTimer;

  function triggerRobotSpeech() {
    currentMessage = forgeMessages[tapIndex];
    tapIndex = (tapIndex + 1) % forgeMessages.length;
    showSpeechBubble = true;

    if (speechTimer) clearTimeout(speechTimer);
    speechTimer = setTimeout(() => {
      showSpeechBubble = false;
    }, 4000);
  }

  function handleStart(clientX, clientY) {
    isHolding = true;
    dragDistance = 0;
    startX = clientX;
    startY = clientY;
    startTheta = targetTheta;
    startPhi = targetPhi;
  }

  function handleMove(clientX, clientY) {
    if (!isHolding) return;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

    // Inverted delta so dragging left/right/up/down rotates the robot directly in the cursor direction
    targetTheta = startTheta - deltaX * 0.7;
    targetPhi = Math.max(15, Math.min(135, startPhi - deltaY * 0.4));
  }

  function handleEnd() {
    if (isHolding && dragDistance < 12) {
      triggerRobotSpeech();
    }
    isHolding = false;
  }

  function onMouseDown(e) {
    handleStart(e.clientX, e.clientY);
  }

  function onMouseMove(e) {
    handleMove(e.clientX, e.clientY);
  }

  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function onTouchMove(e) {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function animate() {
    // Smooth lerp physics towards target orbit angle
    currentTheta += (targetTheta - currentTheta) * 0.15;
    currentPhi += (targetPhi - currentPhi) * 0.15;

    if (modelViewerRef) {
      modelViewerRef.cameraOrbit = `${currentTheta.toFixed(2)}deg ${currentPhi.toFixed(2)}deg 100%`;
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  onMount(() => {
    animationFrameId = requestAnimationFrame(animate);

    const onGlobalMouseMove = (e) => onMouseMove(e);
    const onGlobalMouseUp = () => handleEnd();
    const onGlobalTouchMove = (e) => onTouchMove(e);
    const onGlobalTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    window.addEventListener('touchmove', onGlobalTouchMove, { passive: true });
    window.addEventListener('touchend', onGlobalTouchEnd);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (speechTimer) clearTimeout(speechTimer);
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
      window.removeEventListener('touchmove', onGlobalTouchMove);
      window.removeEventListener('touchend', onGlobalTouchEnd);
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
    <span>NAGPUR, INDIA — AUGUST 25, 2026</span>
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
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLScIqUcQI_jO5ibbkqkskaU0V4VvyHvb1WGR0U_l6GuKS8tXEg/viewform?usp=publish-editor" 
          target="_blank" 
          rel="noopener noreferrer"
          class="group relative inline-block flex-1"
        >
          <div class="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-200"></div>
          <button class="relative w-full bg-burgundy text-background px-8 py-4 font-mono text-lg font-black uppercase border-2 border-primary transition-all hover:cursor-pointer flex items-center justify-center gap-2 group-hover:bg-[#800000] active:scale-[0.98]">
            REGISTER STATION <span class="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </button>
        </a>
      </div>
    </div>

    <!-- Right Column: Interactive 3D Robot Model (Hold & Drag to Rotate 360° / Tap for Dialogue) -->
    <div class="lg:col-span-6 relative w-full flex justify-center lg:justify-end -mt-4 lg:mt-0">
      <div 
        bind:this={robotContainerRef}
        on:mousedown={onMouseDown}
        on:touchstart={onTouchStart}
        class="relative w-full max-w-[580px] h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center select-none {isHolding ? 'cursor-grabbing' : 'cursor-grab'}"
        role="region"
        aria-label="3D Robot Display"
      >
        <!-- Interactive Speech Bubble Tag from Forge -->
        {#if showSpeechBubble}
          <div class="absolute -top-3 sm:top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 transform scale-100 animate-bounce">
            <div class="relative bg-primary text-background font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 border-2 border-background shadow-xl whitespace-nowrap rounded-xs">
              <span>{currentMessage}</span>
              <!-- Speech Bubble Tail Arrow -->
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-primary"></div>
            </div>
          </div>
        {/if}

        <!-- Ambient Warm CRT Glow Backdrop -->
        <div class="crt-glow-backdrop opacity-80 pointer-events-none"></div>

        <!-- 3D Model Viewer -->
        <model-viewer
          bind:this={modelViewerRef}
          src="/robo_v1.glb"
          alt="3D Robot Model - CODE FORGE"
          touch-action="none"
          autoplay
          interaction-prompt="none"
          disable-zoom
          shadow-intensity="1.6"
          shadow-softness="0.5"
          exposure="1.2"
          camera-orbit="0deg 75deg 100%"
          field-of-view="28deg"
          style="width: 100%; height: 100%; background-color: transparent; pointer-events: none;"
          class="w-full h-full relative z-10"
        >
        </model-viewer>
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

