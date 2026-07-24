<script>
  import { applicationAreasData } from '../data/gazetteData.js';
</script>

<section id="areas" class="mb-24 select-none">
  <!-- Section Title Header Bar -->
  <div class="border-t-2 border-b-2 border-primary py-3 mb-10 text-center bg-primary/5">
    <h3 class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1">
      {applicationAreasData.title}
    </h3>
    <p class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto">
      {applicationAreasData.subtitle}
    </p>
  </div>

  <!-- Authentic 5-Column Vintage Gazette Newspaper Feature Layout -->
  <div class="border-2 border-primary paper-texture bg-background shadow-sm">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-primary">
      {#each applicationAreasData.areas as area, index}
        <div class="p-5 md:p-6 flex flex-col justify-between hover:bg-primary/5 transition-colors group">
          <div>
            <!-- Feature Tag Line -->
            <div class="flex items-center justify-between border-b border-primary/30 pb-2 mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-burgundy">
              <span>{area.featureCode || `FEATURE 0${index + 1}`}</span>
              <span class="opacity-40">§ 2026</span>
            </div>

            <!-- Monochrome Vintage Engraving Style Icon Badge -->
            <div class="w-12 h-12 mb-4 border-2 border-primary p-2 bg-background flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(22,22,22,1)] group-hover:bg-primary group-hover:text-background transition-colors">
              <span class="material-symbols-outlined text-2xl font-bold">{area.symbol}</span>
            </div>

            <!-- Column Headline -->
            <h4 class="font-headline font-black uppercase text-base md:text-lg mb-2.5 leading-snug tracking-tight text-primary border-b border-dotted border-primary/40 pb-2">
              {area.title}
            </h4>

            <!-- Concise Newspaper Summary Copy -->
            <p class="font-serif-alt text-xs md:text-sm leading-relaxed text-justify text-primary/90">
              {area.summary}
            </p>
          </div>

          <!-- Column Footer Mark -->
          <div class="mt-6 pt-2 border-t border-dotted border-primary/30 flex justify-between items-center font-mono text-[9px] uppercase opacity-60">
            <span>COL. 0{index + 1}</span>
            <span>GAZETTE SPEC</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

