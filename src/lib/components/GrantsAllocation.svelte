<script>
  import { prizeTiers, specialAwards } from '../data/gazetteData.js';
</script>

<section class="mb-24 border border-primary p-8 md:p-12">
  <h3 class="font-headline text-4xl font-black uppercase text-center mb-12 italic">
    Innovation Grants Allocation
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each prizeTiers as tier, idx}
      <div class="text-center p-6 border-r border-primary md:border-r-0 md:border-b-0 border-b last:border-b-0 last:border-r-0">
        <span class="font-mono text-xs uppercase opacity-60">{tier.tier}</span>
        <h4 class="font-headline text-4xl font-bold my-4">{tier.title}</h4>
        <p class="font-mono font-bold text-xl uppercase tracking-tighter">{tier.reward}</p>
        <p class="text-xs mt-4">{tier.note}</p>
      </div>
    {/each}
  </div>

  <div class="mt-12 pt-8 border-t border-primary/20 flex flex-wrap justify-center gap-12 font-mono text-xs uppercase font-bold">
    {#each specialAwards as award}
      <span>• {award}</span>
    {/each}
  </div>
</section>
