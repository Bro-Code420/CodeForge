<script>
  import { prizeTiers, eventHighlights } from '../data/gazetteData.js';
</script>

<section class="mb-24 select-none">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
    
    <!-- Left Column: Prize Pool Allocation (Img2 Blocks in Img1 Card Size) -->
    <div class="lg:col-span-7 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between border-b-2 border-primary pb-3 mb-6">
          <h3 class="font-headline text-3xl md:text-4xl font-black uppercase tracking-tight distressed-text">
            PRIZE ALLOCATION
          </h3>
          <span class="font-mono text-xs font-bold uppercase tracking-widest bg-primary text-background px-2.5 py-1">
            ₹15,000+ POOL
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {#each prizeTiers as tier, idx}
            {@const isWinner = idx === 1}
            <div class="border-2 {isWinner ? 'border-burgundy bg-[#F4EFE6]' : 'border-primary bg-white/90'} p-4 shadow-[3px_3px_0px_0px_rgba(22,22,22,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between border-b border-primary/30 pb-2 mb-2">
                  <span class="font-mono text-[9px] md:text-[10px] font-bold uppercase {isWinner ? 'text-burgundy' : 'text-primary/70'} tracking-wider truncate">
                    {isWinner ? '★ GRAND PRIZE' : tier.tier}
                  </span>
                  <span class="font-mono text-[9px] font-bold uppercase opacity-60">
                    {isWinner ? 'TOP' : `0${idx + 1}`}
                  </span>
                </div>

                {#if isWinner}
                  <div class="bg-burgundy text-white font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 mb-1.5 text-center shadow-xs">
                    ★ CHAMPION ★
                  </div>
                {/if}

                <h4 class="font-headline font-black text-sm md:text-base uppercase text-primary mb-1 group-hover:text-burgundy transition-colors leading-tight">
                  {tier.title}
                </h4>

                <div class="my-2 p-2 border border-primary/40 bg-white/80 text-center">
                  <span class="font-mono text-[8px] font-bold uppercase tracking-widest text-primary/60 block">BOUNTY</span>
                  <p class="font-mono font-black text-xs md:text-sm uppercase tracking-tight text-burgundy">
                    {tier.reward}
                  </p>
                </div>

                <p class="font-serif-alt text-[11px] md:text-xs text-primary/85 leading-snug">
                  {tier.note}
                </p>
              </div>
            </div>
          {/each}
        </div>

        <!-- Vintage Gazette Editorial Quote Banner -->
        <div class="mt-4 p-4 md:p-5 border-2 border-primary bg-white/90 shadow-[3px_3px_0px_0px_rgba(22,22,22,1)] relative font-mono text-center flex flex-col justify-center items-center">
          <div class="flex justify-center items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-burgundy mb-2">
            <span>★ GAZETTE EDITORIAL DIRECTIVE ★</span>
          </div>
          <blockquote class="font-serif-alt italic text-xs md:text-sm text-primary/95 leading-relaxed max-w-lg mx-auto">
            “Great ideas aren’t discovered by chance — they are forged through curiosity, collaboration, and relentless engineering execution.”
          </blockquote>
          <div class="mt-2.5 pt-2 border-t border-dotted border-primary/40 w-full flex justify-between items-center text-[9px] font-mono uppercase text-primary/70">
            <span>CODE FORGE GAZETTE • 2026</span>
            <span>DISPATCH NO. 02</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Event Highlights Dispatch Box -->
    <div class="lg:col-span-5 border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between relative">
      <div>
        <div class="flex justify-between items-center border-b-2 border-primary pb-3 mb-6 font-mono text-xs font-bold uppercase tracking-wider">
          <span>GAZETTE METRICS</span>
          <span class="bg-burgundy text-background px-2 py-0.5">DISPATCH 03</span>
        </div>

        <h3 class="font-headline text-3xl md:text-4xl font-black uppercase text-center mb-2 tracking-tight">
          EVENT HIGHLIGHTS
        </h3>
        <p class="font-serif-alt italic text-xs md:text-sm text-center opacity-80 mb-6 border-b border-primary/20 pb-4">
          Key Operating Metrics & Allocation Overview
        </p>

        <div class="grid grid-cols-2 gap-4">
          {#each eventHighlights as highlight}
            <div class="p-4 border-2 border-primary bg-background/80 shadow-[2px_2px_0px_0px_rgba(22,22,22,1)] flex flex-col justify-center items-center text-center">
              <span class="font-headline text-2xl md:text-3xl font-black text-primary tracking-tight block mb-1">
                {highlight.metric}
              </span>
              <span class="font-mono text-[10px] uppercase font-bold tracking-widest text-burgundy">
                {highlight.label}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <div class="mt-6 pt-3 border-t-2 border-primary">
        <p class="font-mono text-[10px] uppercase text-center font-bold tracking-wider opacity-70">
          ★ OFFICIAL HACKATHON DISPATCH SPECIFICATIONS — 2026
        </p>
      </div>
    </div>

  </div>
</section>
