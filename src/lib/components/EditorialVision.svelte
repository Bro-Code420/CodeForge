<script>
  import { visionData } from '../data/gazetteData.js';
</script>

<section class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-24" id="about">
  <div class="md:col-span-3 font-mono text-xs border-r border-primary pr-6 space-y-6">
    <div>
      <h4 class="font-bold uppercase mb-2 underline tracking-wider">Presentation</h4>
      <p class="leading-relaxed opacity-90">{visionData.presentation}</p>
    </div>
    <div>
      <h4 class="font-bold uppercase mb-2 underline tracking-wider">Collaboration</h4>
      <p class="leading-relaxed opacity-90">{visionData.collaboration}</p>
    </div>
  </div>

  <div class="md:col-span-6">
    <h3 class="font-mono text-sm font-bold uppercase mb-6 underline decoration-2 underline-offset-4 tracking-wider">
      {visionData.sectionTitle || "ABOUT CODE FORGE"}
    </h3>
    <div class="space-y-4 font-body text-base md:text-lg leading-relaxed text-justify mb-8">
      <p class="drop-cap">
        Innovation is more than writing code—it's about solving meaningful problems with creativity, collaboration, and engineering excellence.
      </p>
      <p>
        At CODE FORGE, participants are challenged to think critically, build intelligently, and create software that delivers real-world impact. Whether improving healthcare, securing digital systems, enabling smarter cities, or transforming businesses, every project begins with a bold idea and ends with a working solution.
      </p>
      <p>
        Our mission is to provide a platform where students learn by building, compete with purpose, and push the boundaries of technology through innovation.
      </p>
    </div>
    <div class="bg-primary/5 p-6 italic font-headline text-base md:text-lg border-l-4 border-primary">
      {visionData.quote}
    </div>
  </div>

  <div class="md:col-span-3">
    <div class="newspaper-border p-1 mb-4 border-2 border-primary bg-white">
      <img
        alt={visionData.figureCaption}
        class="w-full grayscale ink-bleed"
        src={visionData.figureImg}
      />
    </div>
    <p class="font-mono text-[10px] font-bold uppercase text-center">{visionData.figureCaption}</p>
  </div>
</section>

