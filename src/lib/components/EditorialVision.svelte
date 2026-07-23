<script>
  import { visionData } from '../data/gazetteData.js';
</script>

<section class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24" id="about">
  <div class="md:col-span-3 font-mono text-xs border-r border-primary pr-8 space-y-6">
    <div>
      <h4 class="font-bold uppercase mb-2 underline">Presentation</h4>
      <p>{visionData.presentation}</p>
    </div>
    <div>
      <h4 class="font-bold uppercase mb-2 underline">Collaboration</h4>
      <p>{visionData.collaboration}</p>
    </div>
  </div>

  <div class="md:col-span-6">
    <h3 class="font-mono text-sm font-bold uppercase mb-6 underline decoration-2 underline-offset-4">EDITORIAL VISION</h3>
    <p class="text-lg md:text-xl leading-relaxed text-justify drop-cap mb-6">
      {visionData.editorialText}
    </p>
    <div class="bg-primary/5 p-6 italic font-headline text-lg border-l-4 border-primary">
      {visionData.quote}
    </div>
  </div>

  <div class="md:col-span-3">
    <div class="newspaper-border p-1 mb-4 border border-primary">
      <img
        alt="Fig 02: The Vision"
        class="w-full grayscale ink-bleed"
        src={visionData.figureImg}
      />
    </div>
    <p class="font-mono text-[10px] uppercase text-center">{visionData.figureCaption}</p>
  </div>
</section>
