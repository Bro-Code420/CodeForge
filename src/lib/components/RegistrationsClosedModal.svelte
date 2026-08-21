<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let sectionScoped = false;

  function handleClose() {
    isOpen = false;
    dispatch('close');
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Full-section overlay -->
  <div
    class="{sectionScoped ? 'absolute' : 'fixed'} inset-0 bg-primary/75 backdrop-blur-sm z-[9999] select-none"
    transition:fade={{ duration: 250 }}
  >
    <!-- Backdrop click-to-close -->
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0 outline-none"
      on:click={handleClose}
      tabindex="-1"
      aria-label="Close dialog overlay"
    ></button>

    <!-- Gazette Notice Card — pinned dead-center of the overlay -->
    <div
      class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF6EE] paper-texture border-4 border-double border-primary px-6 py-4 sm:px-8 sm:py-5 max-w-lg w-[calc(100%-2rem)] text-primary shadow-[8px_8px_0px_rgba(22,22,22,0.35)] rounded-none font-mono text-center overflow-hidden z-10"
      transition:scale={{ duration: 300, start: 0.94 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-closed-title"
    >
      <!-- Close Button -->
      <button
        on:click={handleClose}
        type="button"
        aria-label="Close modal"
        class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center border border-primary/50 text-primary hover:bg-primary hover:text-background font-bold transition-colors cursor-pointer text-xs z-20"
      >✕</button>

      <!-- Corner Ornament -->
      <div class="absolute top-1.5 left-2.5 text-[8px] opacity-35 font-bold tracking-widest">❖ SPECIAL BULLETIN</div>

      <!-- Header Ribbon -->
      <div class="flex justify-between items-center border-b-2 border-primary pb-2 mb-3 mt-3 pr-8 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary/80">
        <span>★ CODE FORGE 2026 DISPATCH ★</span>
        <span>EDITION: EXTRA</span>
      </div>

      <!-- Icon + Headline (inline, compact) -->
      <div class="flex items-center justify-center gap-2 mb-1">
        <span class="text-xl">🗞️</span>
        <h3 id="reg-closed-title" class="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight distressed-text text-primary leading-tight">
          REGISTRATIONS CLOSED
        </h3>
        <span class="text-xl">📰</span>
      </div>

      <div class="flex justify-center items-center gap-2 font-serif-alt italic text-[10px] sm:text-xs text-primary/75 mb-2">
        <span>☙</span><span>Official Hackathon Announcement</span><span>❧</span>
      </div>

      <div class="w-16 h-[2px] bg-primary mx-auto mb-3"></div>

      <!-- Subheadline -->
      <p class="font-headline text-base sm:text-lg font-bold text-burgundy mb-2 leading-snug">
        Extra! Extra! — The registrations are officially closed! 🗞️
      </p>

      <!-- Thank you message -->
      <p class="font-body text-xs sm:text-sm leading-relaxed text-primary/90 mb-3 px-1">
        A huge thank you to everyone who registered and made this response incredible. ❤️
      </p>

      <!-- Framed Box: Next Edition -->
      <div class="bg-primary/5 border-2 border-dashed border-primary/60 px-4 py-2.5 mb-3 text-left font-mono">
        <div class="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-primary mb-1">
          <span>📜</span>
          <span class="uppercase tracking-wider">Next Edition: Problem Statements</span>
        </div>
        <div class="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-primary">
          <span>🕙</span>
          <span>Release: 22nd August, 10 PM</span>
        </div>
      </div>

      <!-- Stay Tuned + Good Luck (merged, compact) -->
      <p class="font-body text-[10px] sm:text-xs leading-relaxed text-primary/80 mb-1">
        Stay tuned — the complete event schedule will be published on the website soon.
      </p>
      <p class="font-headline font-bold text-xs sm:text-sm text-primary mb-3">
        Good luck, participants! May the best ideas win. 📰
      </p>

      <!-- Action Button -->
      <button
        type="button"
        on:click={handleClose}
        class="w-full py-3 bg-burgundy text-background font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 border-primary hover:bg-primary transition-all shadow-[4px_4px_0px_rgba(22,22,22,0.3)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
      >
        <span>ACKNOWLEDGE & CLOSE DISPATCH</span>
        <span class="group-hover:translate-x-1 transition-transform">──→</span>
      </button>

      <!-- Footer -->
      <p class="text-[8px] uppercase tracking-widest text-primary/55 font-bold border-t border-primary/30 pt-2 mt-3">
        ★ CODE FORGE 2026 • G.H. RAISONI COLLEGE OF ENGINEERING & MANAGEMENT ★
      </p>
    </div>
  </div>
{/if}
