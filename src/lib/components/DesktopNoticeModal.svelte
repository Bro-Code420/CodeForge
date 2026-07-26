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

      <!-- Vintage Engraved Desktop Terminal Icon Stamp -->
      <div class="w-16 h-16 mx-auto mb-4 border-2 border-primary bg-primary/5 flex items-center justify-center p-3 shadow-inner">
        <svg class="w-full h-full text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <!-- Retro CRT Monitor Outer Shell -->
          <rect x="2" y="3" width="20" height="13" rx="1.5" stroke-width="1.8"/>
          <!-- CRT Screen Area -->
          <rect x="4" y="5" width="16" height="9" rx="0.5" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/>
          <!-- Vintage Terminal Code Prompt -->
          <path d="M6 8l2 2-2 2M10 12h4" stroke-width="1.6"/>
          <!-- Heavy Cast-Iron Monitor Neck & Base -->
          <path d="M10 16l-1 3h6l-1-3" stroke-width="1.5"/>
          <rect x="3" y="19" width="18" height="2" rx="0.5" stroke-width="1.5"/>
          <!-- Status Light Ornament -->
          <circle cx="18" cy="7" r="0.75" fill="currentColor"/>
        </svg>
      </div>

      <!-- Notice Title -->
      <h3 class="font-headline font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide distressed-text mb-3 text-primary leading-tight space-x-1">
        <span>BEST</span> <span>VIEWED</span> <span>ON</span> <span>PC</span>
      </h3>

      <div class="flex justify-center items-center gap-2 font-serif-alt italic text-xs md:text-sm text-primary/85 mb-4">
        <span>☙</span>
        <span>Official Press Advisory</span>
        <span>❧</span>
      </div>

      <div class="w-16 h-[2px] bg-primary mx-auto mb-5"></div>

      <!-- Body Copy -->
      <p class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95 mb-6 px-2">
        For the best visuals and smooth interactions, use a desktop or laptop.
      </p>

      <!-- Feature Pill Badge -->
      <div class="flex justify-center mb-8 text-xs font-bold uppercase tracking-wider font-mono">
        <span class="px-4 py-1.5 border border-primary/60 bg-white/80 shadow-xs">✦ FULL EXPERIENCE</span>
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
