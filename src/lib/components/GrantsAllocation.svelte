<script>
  import { prizeData, prizeTiers, specialAwards } from '../data/gazetteData.js';
</script>

<section class="mb-24 border border-primary p-8 md:p-12">
  <div class="text-center mb-10">
    <div class="inline-block font-mono text-xs md:text-sm font-bold uppercase tracking-widest border border-primary px-4 py-1.5 bg-primary text-background mb-4">
      {prizeData.poolBadge}
    </div>
    <h3 class="font-headline text-4xl md:text-5xl font-black uppercase text-center mb-2 italic">
      {prizeData.title}
    </h3>
    <p class="font-serif-alt text-xl md:text-2xl italic tracking-wide text-center opacity-80 mb-4">
      {prizeData.subtitle}
    </p>
    <p class="text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto opacity-90">
      {prizeData.description}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each prizeTiers as tier, idx}
      <div class="text-center p-6 border-r border-primary md:border-r-0 md:border-b-0 border-b last:border-b-0 last:border-r-0">
        <span class="font-mono text-xs uppercase opacity-60">{tier.tier}</span>
        <h4 class="font-headline text-3xl md:text-4xl font-bold my-4">{tier.title}</h4>
        <p class="font-mono font-bold text-lg md:text-xl uppercase tracking-tighter">{tier.reward}</p>
        <p class="text-xs mt-4 leading-relaxed opacity-80">{tier.note}</p>
      </div>
    {/each}
  </div>

</section>
