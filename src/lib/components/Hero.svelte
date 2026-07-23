<script>
  import { heroData } from '../data/gazetteData.js';
</script>

<section class="mb-24">
  <div class="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16">
    <!-- Headline and Intro -->
    <div class="md:col-span-12 mb-12">
      <h2 class="font-headline text-5xl md:text-8xl uppercase font-black leading-[0.85] mb-12 tracking-tighter text-center">
        In Pursuit of Structural <br class="hidden md:block" /> Digital Integrity
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <p class="text-xl md:text-2xl leading-relaxed text-justify drop-cap">
          {heroData.leadParas[0]}
        </p>
        <p class="text-xl md:text-2xl leading-relaxed text-justify">
          {heroData.leadParas[1]}
        </p>
      </div>
    </div>

    <!-- Visual Interest & Data Grid Row -->
    <div class="md:col-span-7">
      <div class="border-[6px] border-primary p-2 bg-white">
        <img
          alt="Fig 01: The Central Engine."
          class="w-full grayscale ink-bleed"
          src={heroData.figureImg}
        />
      </div>
      <p class="font-mono text-xs italic mt-4 uppercase tracking-tighter text-left border-l-4 border-primary pl-4">
        {heroData.figureCaption}
      </p>
    </div>

    <div class="md:col-span-5 flex flex-col justify-between h-full">
      <!-- Data Grid -->
      <div class="border border-primary bg-white/50 mb-12">
        <div class="grid grid-cols-2 border-b border-primary">
          {#each heroData.metrics.slice(0, 2) as metric}
            <div class="p-4 border-r last:border-r-0 border-primary">
              <span class="font-mono text-[10px] uppercase opacity-60 block mb-1">{metric.label}</span>
              <span class="font-headline font-bold text-lg">{metric.value}</span>
            </div>
          {/each}
        </div>
        <div class="grid grid-cols-2 border-b border-primary">
          {#each heroData.metrics.slice(2, 4) as metric}
            <div class="p-4 border-r last:border-r-0 border-primary">
              <span class="font-mono text-[10px] uppercase opacity-60 block mb-1">{metric.label}</span>
              <span class="font-headline font-bold text-lg">{metric.value}</span>
            </div>
          {/each}
        </div>
        <div class="p-4 bg-primary text-background text-center">
          <span class="font-mono text-[10px] uppercase tracking-widest block mb-1">Chronology</span>
          <span class="font-headline font-bold text-xl uppercase italic">{heroData.eventDate}</span>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center md:text-left">
        <h4 class="font-mono text-xs font-bold uppercase mb-4 tracking-[0.2em] opacity-80 border-b border-primary/20 pb-2 inline-block">
          SECURE YOUR STATION
        </h4>
        <div class="flex flex-col gap-6">
          <a href="#registry" class="group relative inline-block">
            <div class="absolute inset-0 bg-primary translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
            <button class="relative w-full bg-burgundy text-background px-12 py-6 font-mono text-xl font-black uppercase border-2 border-primary transition-all hover:cursor-pointer">
              REGISTER STATION
            </button>
          </a>
          <div class="font-mono text-[10px] uppercase flex items-center justify-center md:justify-start gap-3 opacity-70">
            <span class="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            {heroData.countdownText}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
