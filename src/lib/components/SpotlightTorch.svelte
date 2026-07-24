<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  let isPickedUp = false;
  let isActive = false;
  let isScrolledPastHero = false;
  let isMobile = false;

  let mouse = { x: 0, y: 0 };
  let torch = { x: 0, y: 0 };
  let targetPos = { x: 0, y: 0 };
  
  let torchSize = 340;
  let targetTorchSize = 340;
  let animationFrameId;
  let canvasEl;

  // Three.js variables
  let scene, camera, renderer, torchGroup, flameLight, emberLight, loadedModel;

  const ease = 0.1; // Lerp factor for smooth movement

  function checkMobile() {
    if (typeof window === 'undefined') return false;
    isMobile = window.innerWidth < 640;
    const baseSize = isMobile ? 260 : 360;
    if (!isPickedUp) {
      torchSize = baseSize;
      targetTorchSize = baseSize;
    }
    return isMobile;
  }

  function getDockPosition() {
    if (typeof window === 'undefined') return { x: 300, y: 150 };
    checkMobile();
    return {
      x: isMobile ? window.innerWidth - 22 : window.innerWidth - 42,
      y: isMobile ? 116 : 148
    };
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleTouch(e) {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const heroElement = document.querySelector('#about') || document.querySelector('header');
    
    if (heroElement) {
      const heroRect = heroElement.getBoundingClientRect();
      const heroBottomAbsolute = heroRect.top + scrollY + (heroRect.height * 0.7);
      isScrolledPastHero = scrollY >= heroBottomAbsolute - 100;
    } else {
      isScrolledPastHero = scrollY > 350;
    }
  }

  function pickUpTorch() {
    isPickedUp = true;
    isActive = true;
    checkMobile();
    targetTorchSize = isMobile ? 280 : 360;
  }

  function dockTorch() {
    isPickedUp = false;
    isActive = false;
    checkMobile();
    targetTorchSize = isMobile ? 260 : 360;
  }

  function toggleTorch() {
    if (isPickedUp) {
      dockTorch();
    } else {
      pickUpTorch();
    }
  }

  function handleElementHover(e) {
    if (!isPickedUp) return;
    const target = e.target.closest('a, button, [role="button"], input, textarea, .hover-expand');
    checkMobile();
    if (target) {
      targetTorchSize = isMobile ? 340 : 480;
    } else {
      targetTorchSize = isMobile ? 280 : 360;
    }
  }

  function initThreeJS() {
    if (!canvasEl) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Group for Torch Model & Lights
    torchGroup = new THREE.Group();
    scene.add(torchGroup);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    // Glowing flame point lights
    flameLight = new THREE.PointLight(0xffaa33, 6.0, 16);
    flameLight.position.set(0, 0.9, 0.5);
    torchGroup.add(flameLight);

    emberLight = new THREE.PointLight(0xff4400, 3.5, 9);
    emberLight.position.set(0, 0.4, 0.8);
    torchGroup.add(emberLight);

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/minecraft_torch.glb',
      (gltf) => {
        loadedModel = gltf.scene;
        updateModelScale();
      },
      undefined,
      (err) => {
        console.warn('Could not load minecraft_torch.glb:', err);
      }
    );
  }

  let originalMaxDim = 1;
  let originalCenter = new THREE.Vector3();

  function updateModelScale() {
    if (!loadedModel || !torchGroup) return;

    checkMobile();
    const box = new THREE.Box3().setFromObject(loadedModel);
    const size = box.getSize(new THREE.Vector3());
    originalMaxDim = Math.max(size.x, size.y, size.z) || 1;
    originalCenter = box.getCenter(new THREE.Vector3());
    
    // Default initial scale
    const targetScaleFactor = isMobile ? 0.65 : 0.95;
    const scale = targetScaleFactor / originalMaxDim;
    loadedModel.scale.setScalar(scale);

    // Position the model center relative to the pivot group
    loadedModel.position.copy(originalCenter).multiplyScalar(-scale);
    
    // Standing straight up vertically
    loadedModel.rotation.y = 0;
    loadedModel.rotation.x = 0;
    loadedModel.rotation.z = 0;

    if (!torchGroup.children.includes(loadedModel)) {
      torchGroup.add(loadedModel);
    }
  }

  function updateTorchPosition() {
    if (!camera || !torchGroup) return;

    // On mobile touch, offset position slightly above finger so finger doesn't obscure flame
    let posX = torch.x;
    let posY = torch.y;
    if (isMobile && isPickedUp) {
      posY -= 35; // Lift torch above finger
    }

    const normalizedX = (posX / window.innerWidth) * 2 - 1;
    const normalizedY = -(posY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(normalizedX, normalizedY, 0.5);
    vector.unproject(camera);

    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

    torchGroup.position.copy(worldPos);

    // Dynamic tilt physics when picked up
    if (isPickedUp) {
      const vx = mouse.x - torch.x;
      const vy = mouse.y - torch.y;
      torchGroup.rotation.z = THREE.MathUtils.lerp(torchGroup.rotation.z, -vx * 0.0015, 0.15);
      torchGroup.rotation.x = THREE.MathUtils.lerp(torchGroup.rotation.x, vy * 0.0015, 0.15);
      torchGroup.rotation.y = THREE.MathUtils.lerp(torchGroup.rotation.y, Math.PI / 4, 0.15);
    } else {
      // Completely straight vertical rotation when docked
      torchGroup.rotation.z = 0;
      torchGroup.rotation.x = 0;
      torchGroup.rotation.y = 0;
    }
  }

  function animate() {
    // Determine target position (mouse/touch if picked up, dock if resting at corner)
    if (isPickedUp) {
      targetPos.x = mouse.x;
      targetPos.y = mouse.y;
    } else {
      const dock = getDockPosition();
      targetPos.x = dock.x;
      targetPos.y = dock.y;
    }

    // Lerp coordinates
    torch.x += (targetPos.x - torch.x) * ease;
    torch.y += (targetPos.y - torch.y) * ease;

    // Lerp torch size
    torchSize += (targetTorchSize - torchSize) * ease;

    // Update CSS variables for CSS spotlight mask
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--torch-x', `${torch.x.toFixed(2)}px`);
      document.documentElement.style.setProperty('--torch-y', `${torch.y.toFixed(2)}px`);
      document.documentElement.style.setProperty('--torch-size', `${torchSize.toFixed(1)}px`);
    }

    // Dynamic scale interpolation (no feedback loop)
    if (loadedModel) {
      checkMobile();
      const targetScaleFactor = isPickedUp ? (isMobile ? 1.1 : 1.7) : (isMobile ? 0.65 : 0.95);
      const scale = targetScaleFactor / originalMaxDim;

      // Lerp scale
      loadedModel.scale.x += (scale - loadedModel.scale.x) * ease;
      loadedModel.scale.y += (scale - loadedModel.scale.y) * ease;
      loadedModel.scale.z += (scale - loadedModel.scale.z) * ease;

      // Keep model offset centered based on current scale
      loadedModel.position.copy(originalCenter).multiplyScalar(-loadedModel.scale.x);
    }

    // Render 3D scene & flame animation
    if (renderer && scene && camera) {
      updateTorchPosition();

      const time = performance.now() * 0.005;
      if (flameLight) {
        flameLight.intensity = (isScrolledPastHero && !isPickedUp ? 7.5 : 4.8) + Math.sin(time * 8) * 0.8 + (Math.random() - 0.5) * 0.4;
      }
      if (emberLight) {
        emberLight.intensity = (isScrolledPastHero && !isPickedUp ? 4.5 : 3.0) + Math.cos(time * 12) * 0.6;
      }

      renderer.render(scene, camera);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function handleResize() {
    checkMobile();
    handleScroll();
    updateModelScale();
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  onMount(() => {
    checkMobile();
    const dock = getDockPosition();
    mouse.x = dock.x;
    mouse.y = dock.y;
    torch.x = dock.x;
    torch.y = dock.y;
    torchSize = isMobile ? 260 : 360;
    targetTorchSize = torchSize;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mouseover', handleElementHover);
    window.addEventListener('resize', handleResize);

    initThreeJS();
    handleResize();
    handleScroll();
    animate();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('resize', handleResize);
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose();
    }
  });
</script>

<!-- Top Right Corner Flambeau Dock Indicator & Control Button -->
<div 
  class="flambeau-dock-badge" 
  class:visible={isScrolledPastHero || isPickedUp}
  class:picked={isPickedUp}
  class:highlight={isScrolledPastHero && !isPickedUp}
>
  <button 
    class="vintage-torch-ticket"
    class:picked={isPickedUp}
    on:click={toggleTorch}
    title={isPickedUp ? 'Dock Flambeau (Return to Original Site)' : 'Take the Torch to Illuminate'}
  >
    <!-- Vintage Editorial Typography -->
    <div class="ticket-right">
      <div class="ticket-top">═ ★ FEATURE STORY ★ ═</div>
      <div class="ticket-middle">
        {#if isPickedUp}
          RETURN TORCH
        {:else}
          TAKE THE TORCH
        {/if}
      </div>
      <div class="ticket-bottom">
        {#if isPickedUp}
          DOCK FLAMBEAU ──→
        {:else}
          CONTINUE READING ──→
        {/if}
      </div>
    </div>
  </button>
</div>

<!-- Ambient Dark Dimming Overlay (Active when scrolled past hero & torch not picked up yet) -->
<div 
  class="ambient-dim-overlay"
  class:active={isScrolledPastHero && !isPickedUp}
  aria-hidden="true"
></div>

<!-- 3D WebGL Canvas Rendering the 3D Glowing Torch -->
<canvas 
  bind:this={canvasEl} 
  class="torch-3d-canvas"
  class:active={isScrolledPastHero || isPickedUp}
  aria-hidden="true"
></canvas>

<!-- Dark Spotlight Mask Overlay (Active when torch is picked up) -->
<div 
  class="spotlight-overlay"
  class:active={isActive}
  aria-hidden="true"
></div>

<!-- Warm Ambient Beam Glow Effect -->
<div 
  class="torch-glow-beam"
  class:active={isActive}
  aria-hidden="true"
></div>

<style>
  :global(:root) {
    --torch-x: 50vw;
    --torch-y: 50vh;
    --torch-size: 360px;
  }

  /* Ambient Dark Dim Overlay when scrolled past hero (before torch is picked up) */
  .ambient-dim-overlay {
    position: fixed;
    inset: 0;
    z-index: 35;
    pointer-events: none;
    touch-action: pan-y !important;
    background-color: rgba(12, 11, 10, 0.52);
    backdrop-filter: brightness(0.6) contrast(1.04);
    -webkit-backdrop-filter: brightness(0.6) contrast(1.04);
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ambient-dim-overlay.active {
    opacity: 1;
  }

  /* Right Side Dock Badge & Button */
  .flambeau-dock-badge {
    position: fixed;
    top: 96px;
    right: 24px;
    z-index: 60;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-12px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .flambeau-dock-badge.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }



  /* Vintage Torch Ticket Style */
  .vintage-torch-ticket {
    display: flex;
    align-items: center;
    width: 200px;
    height: 105px;
    background-color: #dfd2bf;
    background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0), url("https://www.transparenttextures.com/patterns/natural-paper.png");
    border: 3px double #2b2b2a;
    border-radius: 8px;
    padding: 2px;
    color: #2b2b2a;
    font-family: 'Playfair Display', Georgia, serif;
    box-shadow: 6px 6px 0px rgba(43, 43, 42, 0.25);
    cursor: pointer;
    overflow: hidden;
    text-align: left;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .vintage-torch-ticket::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid #2b2b2a;
    border-radius: 5px;
    pointer-events: none;
  }

  .vintage-torch-ticket:hover {
    transform: translateY(-2px);
    box-shadow: 8px 8px 0px rgba(43, 43, 42, 0.3);
  }

  .flambeau-dock-badge.highlight .vintage-torch-ticket {
    background-color: #dfc8ab; /* Pulsating warm highlight */
    box-shadow: 0 0 25px rgba(223, 200, 171, 0.45);
  }

  .ticket-right {
    width: 100%;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .ticket-top {
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 2px;
    opacity: 0.8;
    text-align: center;
    border-bottom: 1px dashed rgba(43, 43, 42, 0.25);
    padding-bottom: 3px;
  }

  .ticket-middle {
    font-size: 20px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
    margin: 4px 0;
    font-family: 'Playfair Display', serif;
    line-height: 1.1;
  }

  .ticket-bottom {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    opacity: 0.8;
  }

  /* Color Tonal Change on Picked State */
  .vintage-torch-ticket.picked {
    background-color: #dfbfbf; /* Warm sepia red tint */
    border-color: #8b0000;
    color: #8b0000;
  }

  .vintage-torch-ticket.picked::before {
    border-color: #8b0000;
  }

  .vintage-torch-ticket.picked .ticket-top,
  .vintage-torch-ticket.picked .ticket-bottom {
    border-color: rgba(139, 0, 0, 0.2);
    color: #8b0000;
  }

  /* Mobile responsive styling for small screens (< 640px) */
  @media (max-width: 640px) {
    .flambeau-dock-badge {
      top: 76px;
      right: 12px;
      transform: scale(0.8);
      transform-origin: top right;
    }
  }

  /* 3D WebGL Canvas */
  .torch-3d-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 65;
    pointer-events: none;
    touch-action: pan-y !important;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .torch-3d-canvas.active {
    opacity: 1;
  }

  .spotlight-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    pointer-events: none;
    touch-action: pan-y !important;
    background-color: #0b0a08;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    
    mask-image: radial-gradient(
      circle var(--torch-size) at var(--torch-x) var(--torch-y),
      transparent 0%,
      transparent 32%,
      rgba(0, 0, 0, 0.82) 75%,
      black 100%
    );
    -webkit-mask-image: radial-gradient(
      circle var(--torch-size) at var(--torch-x) var(--torch-y),
      transparent 0%,
      transparent 32%,
      rgba(0, 0, 0, 0.82) 75%,
      black 100%
    );
  }

  .spotlight-overlay.active {
    opacity: 0.82;
  }

  /* Ambient Warm Beam Glow Effect */
  .torch-glow-beam {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(var(--torch-size) * 1.8);
    height: calc(var(--torch-size) * 1.8);
    border-radius: 50%;
    z-index: 45;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    background: radial-gradient(
      circle,
      rgba(255, 225, 140, 0.35) 0%,
      rgba(220, 160, 40, 0.15) 45%,
      transparent 70%
    );
    transform: translate(
      calc(var(--torch-x) - (var(--torch-size) * 0.9)),
      calc(var(--torch-y) - (var(--torch-size) * 0.9))
    );
    mix-blend-mode: color-burn;
  }

  .torch-glow-beam.active {
    opacity: 1;
  }
</style>
