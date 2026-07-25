<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let isOpen = false;

  function handleClose() {
    isOpen = false;
    dispatch('close');
  }
</script>

{#if isOpen}
  <!-- Backdrop Blur Overlay -->
  <div 
    class="fixed inset-0 bg-primary/70 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 select-none"
    transition:fade={{ duration: 300 }}
  >
    <!-- Vintage Gazette Notice Modal Box -->
    <div 
      class="bg-[#FAF6EE] paper-texture border-4 border-double border-primary p-6 md:p-10 max-w-xl w-full text-primary shadow-[10px_10px_0px_rgba(43,43,42,0.3)] rounded-sm relative font-mono text-center overflow-hidden"
      transition:scale={{ duration: 350, start: 0.92 }}
    >
      <!-- Top Press Badge Header -->
      <div class="flex justify-between items-center border-b border-primary/40 pb-3 mb-6 font-mono text-[9px] md:text-xs font-bold uppercase tracking-widest text-primary/80">
        <span>★ PRESS ADVISORY NO. 2026 ★</span>
        <span>ISSUED: AUG 2026</span>
      </div>

      <!-- Corner Certificate Ornament Marks -->
      <div class="absolute top-2 left-2 text-[9px] opacity-30">❖ GAZETTE NOTICE</div>
      <div class="absolute top-2 right-2 text-[9px] opacity-30">CERTIFIED</div>

      <!-- Icon Stamp -->
      <div class="w-16 h-16 mx-auto mb-4 border-2 border-primary bg-primary/5 flex items-center justify-center p-3 shadow-inner">
        <svg class="w-full h-full text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke-width="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke-width="2"/>
          <path d="M7 8h10M7 12h7" stroke-dasharray="2 2" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- Notice Title -->
      <h3 class="font-headline font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight distressed-text mb-2 text-primary leading-tight">
        BEST EXPERIENCED ON PC & LAPTOP
      </h3>

      <div class="flex justify-center items-center gap-2 font-serif-alt italic text-xs md:text-sm text-primary/85 mb-4">
        <span>☙</span>
        <span>For the Best Visuals & Smooth 3D Animations</span>
        <span>❧</span>
      </div>

      <div class="w-16 h-[2px] bg-primary mx-auto mb-5"></div>

      <!-- Body Copy -->
      <p class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/90 mb-6 px-2">
        Welcome to <strong>CODE FORGE 2026</strong>! For the smoothest 3D animations, full interactive effects, and the best creative experience, we recommend viewing this site on a <strong>Laptop or Desktop PC</strong>.
      </p>

      <!-- Feature Pill Badges -->
      <div class="flex flex-wrap justify-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-wider">
        <span class="px-2.5 py-1 border border-primary/60 bg-white/70">✦ SMOOTH 3D EFFECTS</span>
        <span class="px-2.5 py-1 border border-primary/60 bg-white/70">✦ FULL INTERACTIVE SITE</span>
        <span class="px-2.5 py-1 border border-primary/60 bg-white/70">✦ BEST DISPLAY</span>
      </div>

      <!-- Action Button -->
      <button 
        on:click={handleClose}
        class="w-full py-3.5 bg-primary text-background font-mono text-xs sm:text-sm font-bold uppercase tracking-widest border-2 border-primary hover:bg-burgundy hover:text-white transition-all shadow-[4px_4px_0px_rgba(43,43,42,0.2)] hover:shadow-[6px_6px_0px_rgba(43,43,42,0.3)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
      >
        <span>CONTINUE TO WEBSITE</span>
        <span class="group-hover:translate-x-1 transition-transform">──→</span>
      </button>

      <!-- Footer Disclaimer -->
      <p class="text-[9px] uppercase tracking-widest text-primary/60 font-bold border-t border-primary/30 pt-3 mt-5">
        ★ PRESS DISPATCH • CODE FORGE 2026 EDITORIAL BOARD ★
      </p>
    </div>
  </div>
{/if}
