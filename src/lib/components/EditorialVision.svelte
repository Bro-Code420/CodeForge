<script>
  import { visionData } from '../data/gazetteData.js';
</script>

<section class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-24 items-stretch" id="about">
  <!-- Left Sidebar: Presentation & Collaboration with horizontal divider -->
  <div class="md:col-span-3 font-body text-xs md:text-sm border-r border-primary/50 pr-6 flex flex-col justify-start">
    <div class="mb-6">
      <h4 class="font-headline font-bold uppercase underline tracking-wider mb-2 text-primary">PRESENTATION</h4>
      <p class="leading-relaxed opacity-95 text-justify">{visionData.presentation}</p>
    </div>
    
    <hr class="border-t border-primary/40 my-2 mb-6" />

    <div>
      <h4 class="font-headline font-bold uppercase underline tracking-wider mb-2 text-primary">COLLABORATION</h4>
      <p class="leading-relaxed opacity-95 text-justify">{visionData.collaboration}</p>
    </div>
  </div>

  <!-- Center Main Article -->
  <div class="md:col-span-6 flex flex-col justify-between">
    <div>
      <h3 class="font-mono text-sm font-bold uppercase mb-6 underline decoration-1 underline-offset-4 tracking-wider">
        {visionData.sectionTitle || "ABOUT CODE FORGE"}
      </h3>
      
      <div class="space-y-4 font-body text-base md:text-lg leading-relaxed text-justify mb-6">
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
    </div>

    <div class="bg-primary/5 p-6 italic font-headline text-base md:text-lg border-l-4 border-primary mt-4">
      {visionData.quote}
    </div>
  </div>

  <!-- Right Column Gazette Frame Card -->
  <div class="md:col-span-3 border-2 border-primary p-3 md:p-4 bg-white/40 shadow-sm flex flex-col justify-between h-full relative">
    <div>
      <div class="border-2 border-primary bg-white p-1 mb-3">
        <img
          alt={visionData.figureCaption}
          class="w-full grayscale contrast-125 ink-bleed block"
          src={visionData.figureImg}
        />
      </div>
      <p class="font-mono text-[10px] font-bold uppercase text-center tracking-wider text-primary border-t border-b border-primary/40 py-2 mb-4">
        {visionData.figureCaption}
      </p>
    </div>
    
    <!-- Download Theme PDF Button Inside the Frame Container -->
    <div class="mt-auto pt-2">
      <a
        href="/Hackathon-Theme.pdf"
        download="Hackathon-Theme.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative inline-block w-full"
      >
        <div class="absolute inset-0 bg-primary translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
        <button class="relative w-full bg-burgundy text-background px-3 py-3 font-mono text-xs md:text-sm font-black uppercase border-2 border-primary transition-all hover:cursor-pointer flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-base">download</span>
          DOWNLOAD THEME PDF
        </button>
      </a>
    </div>
  </div>
</section>

