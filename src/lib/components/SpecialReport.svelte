<script>
  import { themeData } from '../data/gazetteData.js';
</script>

<section class="mb-24 bg-primary text-background p-12 relative overflow-hidden" id="theme">
  <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
    <div>
      <span class="font-mono text-xs font-bold border border-background px-3 py-1 uppercase">
        {themeData.badge}
      </span>
      <h3 class="font-headline text-5xl md:text-6xl font-black mt-8 mb-8 uppercase leading-none">
        {themeData.title}
      </h3>
      <div class="space-y-6 font-body text-lg opacity-90">
        <p><strong class="font-headline">The Theme:</strong> {themeData.themeText}</p>
        <p><strong class="font-headline">Objectives:</strong> {themeData.objectivesText}</p>
        <p><strong class="font-headline">Technology Scope:</strong> {themeData.scopeText}</p>
      </div>
    </div>

    <div class="flex flex-col justify-center">
      <div class="border border-background/30 p-1">
        <img
          alt="Fig 03: The Intelligent Foundry"
          class="w-full grayscale contrast-125 opacity-80"
          src={themeData.figureImg}
        />
      </div>
      <p class="font-mono text-[10px] mt-2 uppercase text-center opacity-60">
        {themeData.figureCaption}
      </p>
    </div>
  </div>
</section>
