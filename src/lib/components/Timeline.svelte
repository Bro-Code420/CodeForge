<script>
  import { timelineEvents } from '../data/gazetteData.js';
</script>

<section class="mb-24" id="timeline">
  <h3 class="font-headline text-5xl font-black uppercase mb-12 text-center">
    Chronology of Events
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 font-mono text-xs">
    {#each timelineEvents as event}
      <div class="flex justify-between border-b border-primary py-4 hover:bg-primary/5 px-2 transition-colors">
        <span class="font-bold">{event.time}</span>
        <span class="uppercase text-right">{event.event}</span>
      </div>
    {/each}
  </div>
</section>
