<script>
  import { valueProps, eventHighlights } from '../data/gazetteData.js';
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
  <div>
    <h3 class="font-headline text-3xl font-bold uppercase mb-8">Value Proposition</h3>
    <div class="grid grid-cols-2 gap-4">
      {#each valueProps as prop}
        <div class="border border-primary p-4">
          <h5 class="font-mono font-bold text-xs uppercase mb-2">{prop.title}</h5>
          <p class="text-xs">{prop.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="bg-primary/5 p-8 border-2 border-primary">
    <h3 class="font-headline text-3xl font-bold uppercase mb-8 text-center">Event Highlights</h3>
    <div class="grid grid-cols-2 gap-x-8 gap-y-6">
      {#each eventHighlights as highlight}
        <div class="flex flex-col">
          <span class="font-headline text-2xl md:text-3xl font-black tracking-tight">{highlight.metric}</span>
          <span class="font-mono text-[10px] uppercase font-bold tracking-wider">{highlight.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>
