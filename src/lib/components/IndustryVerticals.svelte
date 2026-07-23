<script>
  import { industryVerticals } from '../data/gazetteData.js';
</script>

<section class="mb-24" id="areas">
  <h3 class="font-headline text-4xl uppercase font-black mb-12 text-center underline decoration-double">
    Feature Articles: Industry Verticals
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-px bg-primary border border-primary">
    {#each industryVerticals as vertical}
      <div class="bg-background p-6 hover:bg-surface-container transition-colors">
        <h4 class="font-headline font-bold uppercase text-lg mb-4">{vertical.title}</h4>
        <p class="font-body text-sm leading-snug">{vertical.desc}</p>
      </div>
    {/each}
  </div>
</section>
