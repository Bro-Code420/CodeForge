<script>
  import { prizeData, prizeTiers } from '../data/gazetteData.js';
</script>

<section class="mb-24 select-none max-w-7xl mx-auto px-2" id="prizes">
  <!-- Newspaper Top Header Rule -->
  <div class="flex justify-between items-center font-mono text-[9px] md:text-xs uppercase border-b border-primary/40 pb-2 mb-4 tracking-widest text-primary/80">
    <span>★ CODE FORGE 2026 • FINANCIAL DISPATCH SECTION ★</span>
    <div class="border border-primary px-2 py-0.5 font-bold text-[9px] tracking-normal">ISSUE NO. 04</div>
  </div>

  <!-- Newspaper Section Header Bar -->
  <div class="border-t-4 border-b-4 border-double border-primary py-8 mb-8 text-center bg-primary/5">
    <div class="inline-block font-mono text-xs md:text-sm font-bold uppercase tracking-widest border-2 border-primary px-5 py-1.5 bg-primary text-background mb-4 shadow-sm">
      ★ {prizeData.poolBadge} ★
    </div>
    
    <h3 class="font-headline text-4xl md:text-6xl uppercase font-black tracking-tight distressed-text mb-3 leading-none text-primary">
      {prizeData.title}
    </h3>
    
    <div class="flex justify-center items-center gap-2 font-serif-alt italic text-base md:text-xl text-primary/90 max-w-3xl mx-auto px-4 mb-3">
      <span class="opacity-60 text-xl">☙</span>
      <span>{prizeData.subtitle}</span>
      <span class="opacity-60 text-xl">❧</span>
    </div>

    <div class="w-24 h-[2px] bg-primary mx-auto my-3"></div>

    <p class="font-serif-alt text-xs md:text-sm leading-relaxed text-center max-w-3xl mx-auto text-primary/85 px-4">
      {prizeData.description}
    </p>
  </div>

  <!-- 3-Column Authentic Broadsheet Newspaper Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-primary/80 border-2 border-primary bg-[#FAF6EE] paper-texture shadow-lg rounded-sm overflow-hidden">
    {#each prizeTiers as tier, idx}
      {@const isWinner = idx === 1}
      <div 
        class="p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 group hover:bg-[#FDFBF7] {isWinner ? 'bg-[#F4EFE6] border-y-4 md:border-y-0 md:border-x-4 border-double border-burgundy/80 z-10' : ''}"
      >
        <!-- Vintage Top Stamp -->
        <div class="flex items-center justify-between border-b border-primary/40 pb-3 mb-6 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full {isWinner ? 'bg-burgundy animate-pulse' : 'bg-primary/60'}"></span>
            {tier.tier}
          </span>
          <span class="opacity-75">{isWinner ? '★ TOP AWARD' : `NO. 0${idx + 1}`}</span>
        </div>

        <!-- Main Column Content -->
        <div class="flex-grow flex flex-col items-center text-center">
          {#if isWinner}
            <div class="inline-block bg-burgundy text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 shadow-sm">
              ★ GRAND CHAMPION DISPATCH ★
            </div>
          {:else}
            <div class="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-2">
              OFFICIAL AWARD CATEGORY
            </div>
          {/if}

          <!-- Award Title -->
          <h4 class="font-headline font-black uppercase text-3xl md:text-4xl my-3 text-primary group-hover:text-burgundy transition-colors leading-tight">
            {tier.title}
          </h4>

          <!-- Decorative Line Divider -->
          <div class="flex justify-center items-center gap-2 my-3 opacity-60">
            <div class="w-8 h-[1px] bg-primary"></div>
            <span class="text-xs">❖</span>
            <div class="w-8 h-[1px] bg-primary"></div>
          </div>

          <!-- Reward Banner Box -->
          <div class="w-full my-4 p-4 border-2 border-primary bg-white/80 shadow-inner">
            <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">ALLOCATED BOUNTY</span>
            <p class="font-mono font-black text-xl md:text-2xl uppercase tracking-tight text-burgundy">
              {tier.reward}
            </p>
          </div>

          <!-- Newspaper Body Copy -->
          <p class="font-serif-alt text-xs md:text-sm leading-relaxed text-primary/90 mt-2">
            {tier.note}
          </p>
        </div>

        <!-- Gazette Column Footer -->
        <div class="mt-8 pt-3 border-t border-primary/40 flex justify-between items-center font-mono text-[9px] uppercase opacity-75">
          <span>PAGE 1{idx + 1}</span>
          <span>CODE FORGE GAZETTE</span>
        </div>
      </div>
    {/each}
  </div>
</section>

