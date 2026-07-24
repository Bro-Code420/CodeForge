<script>
  import { valueProps, eventHighlights } from '../data/gazetteData.js';
</script>

<section class="mb-24 select-none">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
    
    <!-- Left Column: Value Proposition -->
    <div class="lg:col-span-7 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between border-b-2 border-primary pb-3 mb-6">
          <h3 class="font-headline text-3xl md:text-4xl font-black uppercase tracking-tight distressed-text">
            VALUE PROPOSITION
          </h3>
          <span class="font-mono text-xs font-bold uppercase tracking-widest bg-primary text-background px-2.5 py-1">
            CORE PILLARS
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {#each valueProps as prop, idx}
            <div class="border-2 border-primary p-5 bg-white/90 shadow-[3px_3px_0px_0px_rgba(22,22,22,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between border-b border-primary/30 pb-2 mb-3">
                  <span class="font-mono text-[10px] font-bold uppercase text-burgundy tracking-widest">
                    PILLAR 0{idx + 1}
                  </span>
                  <span class="material-symbols-outlined text-xl text-primary group-hover:scale-110 transition-transform">
                    {prop.symbol}
                  </span>
                </div>
                <h4 class="font-headline font-bold text-base md:text-lg uppercase text-primary mb-2">
                  {prop.title}
                </h4>
                <p class="font-serif-alt text-xs md:text-sm text-primary/85 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </div>
          {/each}
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
