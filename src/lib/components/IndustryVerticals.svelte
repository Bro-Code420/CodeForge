<script>
  import { applicationAreasData } from '../data/gazetteData.js';
</script>

<section class="mb-24" id="areas">
  <div class="text-center mb-10">
    <h3 class="font-headline text-3xl md:text-5xl uppercase font-black mb-3 underline decoration-double">
      {applicationAreasData.title}
    </h3>
    <p class="font-serif-alt italic text-base md:text-xl opacity-85 max-w-3xl mx-auto">
      {applicationAreasData.subtitle}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-5 gap-px bg-primary border-2 border-primary shadow-sm">
    {#each applicationAreasData.areas as area}
      <div class="bg-background p-6 hover:bg-white transition-colors flex flex-col justify-between">
        <div>
          <div class="text-2xl mb-3">{area.icon}</div>
          <h4 class="font-headline font-bold uppercase text-base md:text-lg mb-3 leading-snug">{area.title}</h4>
          <p class="font-body text-xs md:text-sm leading-relaxed opacity-90">{area.desc}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

