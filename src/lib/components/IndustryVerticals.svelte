<script>
  import { applicationAreasData } from '../data/gazetteData.js';
  
  const cardPages = ["PAGE 04", "PAGE 08", "PAGE 12", "PAGE 16", "PAGE 20"];
</script>

<section id="areas" class="mb-24 select-none max-w-7xl mx-auto px-1">
  <!-- Top Bar -->
  <div class="flex justify-between items-center font-mono text-[9px] md:text-xs uppercase border-b border-primary/40 pb-2 mb-4 tracking-widest text-primary/80">
    <span>★ CODE FORGE 2026 • SPECIAL FEATURE EDITION ★</span>
    <div class="border border-primary px-2 py-0.5 font-bold text-[9px] tracking-normal">EST. 2026</div>
  </div>

  <!-- Section Title Header Bar -->
  <div class="border-t-2 border-b-2 border-primary py-6 mb-3 text-center">
    <h3 class="font-headline text-4xl md:text-6xl uppercase font-black tracking-tight distressed-text mb-3 leading-none">
      FEATURE REPORT: APPLICATION AREAS
    </h3>
    <div class="flex justify-center items-center gap-2 font-serif-alt italic text-xs md:text-sm text-primary max-w-3xl mx-auto px-4">
      <span class="opacity-60 text-lg">☙</span>
      <span>Explore the global domains where intelligent systems and innovation create real-world impact.</span>
      <span class="opacity-60 text-lg">❧</span>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-b-2 border-primary pb-3 mb-10 flex justify-center items-center">
    <span class="font-mono text-[9px] md:text-xs font-bold tracking-widest uppercase text-primary/80">
      ★ RESEARCH &nbsp;•&nbsp; ENGINEER &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; IMPACT ★
    </span>
  </div>

  <!-- 5-Column Vintage Gazette Card Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {#each applicationAreasData.areas as area, index}
      <div class="border border-primary/90 p-5 flex flex-col justify-between bg-[#F6F1E8] hover:bg-primary/5 transition-all group duration-300 relative shadow-sm hover:shadow-md">
        <div>
          <!-- Feature Tag Line -->
          <div class="flex items-center justify-between border-b border-primary/30 pb-2 mb-5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary/70">
            <span>{area.featureCode || `FEATURE 0${index + 1}`}</span>
            <span>│ 2026</span>
          </div>

          <!-- Hand-drawn Vintage Style SVG Icon -->
          <div class="w-20 h-20 mx-auto mb-5 border border-primary/60 p-2 bg-[#F6F1E8] flex items-center justify-center shadow-inner relative group-hover:border-primary transition-colors">
            {#if index === 0}
              <!-- Healthcare Kit -->
              <svg viewBox="0 0 100 100" class="w-full h-full text-primary" fill="none" stroke="currentColor" stroke-width="1.8">
                <!-- Outer shading lines (hatching) -->
                <line x1="15" y1="15" x2="35" y2="15" stroke-dasharray="2 2" />
                <line x1="15" y1="20" x2="25" y2="20" stroke-dasharray="2 2" />
                <!-- Bag Body -->
                <rect x="20" y="30" width="60" height="50" rx="6" stroke-width="2" />
                <!-- Handle -->
                <path d="M38 30 V22 Q38 18 42 18 H58 Q62 18 62 22 V30" stroke-width="2" />
                <!-- Cross Logo on Bag -->
                <rect x="42" y="45" width="16" height="16" fill="currentColor" fill-opacity="0.1" stroke-width="1.5" />
                <path d="M50 49 V57 M46 53 H54" stroke-width="2.5" />
                <!-- Corners locks -->
                <circle cx="28" cy="38" r="2.5" fill="currentColor" />
                <circle cx="72" cy="38" r="2.5" fill="currentColor" />
              </svg>
            {:else if index === 1}
              <!-- Skyscrapers -->
              <svg viewBox="0 0 100 100" class="w-full h-full text-primary" fill="none" stroke="currentColor" stroke-width="1.8">
                <!-- Left Building -->
                <rect x="22" y="38" width="22" height="46" stroke-width="2" />
                <!-- Shading lines -->
                <line x1="28" y1="44" x2="28" y2="78" stroke-dasharray="3 3" />
                <line x1="38" y1="44" x2="38" y2="78" stroke-dasharray="3 3" />
                <!-- Middle Tower -->
                <rect x="44" y="20" width="26" height="64" stroke-width="2.2" />
                <!-- Windows grid -->
                <line x1="50" y1="26" x2="50" y2="78" stroke-dasharray="4 4" />
                <line x1="57" y1="26" x2="57" y2="78" stroke-dasharray="4 4" />
                <line x1="64" y1="26" x2="64" y2="78" stroke-dasharray="4 4" />
                <!-- Right Building -->
                <rect x="70" y="48" width="16" height="36" stroke-width="1.8" />
                <line x1="78" y1="54" x2="78" y2="80" stroke-dasharray="2 2" />
              </svg>
            {:else if index === 2}
              <!-- Sustainability Leaf -->
              <svg viewBox="0 0 100 100" class="w-full h-full text-primary" fill="none" stroke="currentColor" stroke-width="1.8">
                <!-- Circle Frame -->
                <circle cx="50" cy="50" r="38" stroke-width="1.5" stroke-dasharray="1 1" />
                <circle cx="50" cy="50" r="34" stroke-width="2" />
                <!-- Leaf outline -->
                <path d="M32 68 C32 45 45 32 68 32 C68 55 55 68 32 68 Z" stroke-width="2.2" fill="currentColor" fill-opacity="0.08" />
                <!-- Center vein -->
                <path d="M32 68 L60 40" stroke-width="2" />
                <!-- Veins -->
                <line x1="42" y1="58" x2="52" y2="58" stroke-width="1.5" />
                <line x1="48" y1="52" x2="56" y2="48" stroke-width="1.5" />
                <line x1="55" y1="45" x2="60" y2="38" stroke-width="1.5" />
              </svg>
            {:else if index === 3}
              <!-- Shield with Padlock -->
              <svg viewBox="0 0 100 100" class="w-full h-full text-primary" fill="none" stroke="currentColor" stroke-width="1.8">
                <!-- Shield -->
                <path d="M25 25 H75 V45 C75 62 60 76 50 82 C40 76 25 62 25 45 Z" stroke-width="2.2" fill="currentColor" fill-opacity="0.08" />
                <!-- Inner shield line -->
                <path d="M30 30 H70 V45 C70 58 58 70 50 75 C42 70 30 58 30 45 Z" stroke-width="1" stroke-dasharray="2 2" />
                <!-- Padlock -->
                <rect x="40" y="48" width="20" height="15" rx="2" stroke-width="2" />
                <path d="M44 48 V40 Q44 34 50 34 Q56 34 56 40 V48" stroke-width="2" />
                <circle cx="50" cy="55" r="2.2" fill="currentColor" />
              </svg>
            {:else}
              <!-- Enterprise Productivity Chart -->
              <svg viewBox="0 0 100 100" class="w-full h-full text-primary" fill="none" stroke="currentColor" stroke-width="1.8">
                <!-- Ground line -->
                <line x1="20" y1="80" x2="80" y2="80" stroke-width="2" />
                <!-- Bar 1 -->
                <rect x="25" y="65" width="8" height="15" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                <!-- Bar 2 -->
                <rect x="38" y="55" width="8" height="25" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                <!-- Bar 3 -->
                <rect x="51" y="42" width="8" height="38" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                <!-- Bar 4 -->
                <rect x="64" y="28" width="8" height="52" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                <!-- Growth Arrow -->
                <path d="M22 72 Q45 50 76 24" stroke-width="2.2" stroke-linecap="round" />
                <path d="M66 24 H76 V34" stroke-width="2" />
              </svg>
            {/if}
          </div>

          <!-- Column Headline -->
          <h4 class="font-headline font-black uppercase text-center text-lg md:text-xl mb-4 leading-snug tracking-tight text-primary">
            {area.title}
          </h4>

          <!-- Separator Ornament -->
          <div class="flex justify-center items-center gap-2 mb-4 opacity-50">
            <line x1="0" y1="0" x2="25" y2="0" class="border-t border-primary w-8" stroke="currentColor" stroke-width="1" />
            <span class="text-xs">❖</span>
            <line x1="0" y1="0" x2="25" y2="0" class="border-t border-primary w-8" stroke="currentColor" stroke-width="1" />
          </div>

          <!-- Concise Newspaper Summary Copy -->
          <p class="font-serif-alt text-xs md:text-sm leading-relaxed text-center text-primary/95">
            {area.summary}
          </p>
        </div>

        <!-- Column Footer Mark -->
        <div class="mt-6 pt-3 border-t border-primary/50 flex justify-between items-center font-mono text-[9px] uppercase opacity-75">
          <span>{cardPages[index]}</span>
          <span class="opacity-45">│</span>
          <span>CODE FORGE</span>
        </div>
      </div>
    {/each}
  </div>
</section>
