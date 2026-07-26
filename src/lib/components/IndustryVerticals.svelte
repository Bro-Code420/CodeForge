<script>
  import { applicationAreasData } from '../data/gazetteData.js';
  import ScrollStack from './ScrollStack.svelte';
  
  const cardPages = ["PAGE 04", "PAGE 08", "PAGE 12", "PAGE 16", "PAGE 20"];

  let hoverStates = {};

  function handleMouseMove(e, index) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -1 to +1
    const rotX = -((y / rect.height) * 2 - 1) * 6;
    const rotY = ((x / rect.width) * 2 - 1) * 6;

    hoverStates[index] = { rotX, rotY, isHovered: true };
    hoverStates = hoverStates;
  }

  function handleMouseLeave(index) {
    hoverStates[index] = { rotX: 0, rotY: 0, isHovered: false };
    hoverStates = hoverStates;
  }
</script>

<section id="areas" class="mb-12 select-none max-w-4xl mx-auto px-2">
  <!-- Top Bar -->
  <div class="flex justify-between items-center font-mono text-[9px] md:text-xs uppercase border-b border-primary/40 pb-2 mb-4 tracking-widest text-primary/80">
    <span>★ CODE FORGE 2026 • SPECIAL FEATURE EDITION ★</span>
    <div class="border border-primary px-2 py-0.5 font-bold text-[9px] tracking-normal">EST. 2026</div>
  </div>

  <!-- Section Title Header Bar (Full UI Space) -->
  <div class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t-2 border-b-2 border-primary py-6 mb-3 text-center bg-primary/5">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <h3 class="font-headline text-3xl sm:text-4xl md:text-6xl uppercase font-black tracking-tight distressed-text mb-3 leading-none">
        FEATURE REPORT: APPLICATION AREAS
      </h3>
      <p class="font-serif-alt italic text-sm sm:text-base text-primary/80 max-w-2xl mx-auto leading-relaxed">
        Explore the primary domains where technical solutions are being engineered for this edition.
      </p>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-b-2 border-primary pb-3 mb-10 flex justify-center items-center">
    <span class="font-mono text-[9px] md:text-xs font-bold tracking-widest uppercase text-primary/80">
      ★ SCROLL DOWN TO STACK FEATURE DISPATCHES ★
    </span>
  </div>

  <!-- ScrollStack Container for Gazette Application Cards -->
  <ScrollStack itemDistance={60} itemScale={0.03} itemStackDistance={35} stackPosition="16%" useWindowScroll={true}>
    {#each applicationAreasData.areas as area, index}
      {@const state = hoverStates[index] || { rotX: 0, rotY: 0, isHovered: false }}
      <div 
        on:mousemove={(e) => handleMouseMove(e, index)}
        on:mouseleave={() => handleMouseLeave(index)}
        role="group"
        aria-label={area.title}
        style="transform: perspective(1000px) rotateX({state.rotX}deg) rotateY({state.rotY}deg) scale3d({state.isHovered ? 1.02 : 1}, {state.isHovered ? 1.02 : 1}, 1);"
        class="scroll-stack-card border-2 border-primary p-6 md:p-10 flex flex-col justify-between bg-[#F6F1E8] paper-texture hover:bg-[#FAF6EE] transition-all group duration-300 relative shadow-lg rounded-sm cursor-pointer min-h-[380px]"
      >
        <div>
          <!-- Feature Tag Line -->
          <div class="flex items-center justify-between border-b-2 border-primary/30 pb-3 mb-6 font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-primary">
            <span class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-burgundy"></span>
              {area.featureCode || `FEATURE 0${index + 1}`}
            </span>
            <span>VOL. 2026 // ISSUE {index + 1}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <!-- Hand-drawn Vintage Style SVG Icon -->
            <div class="md:col-span-4 flex justify-center">
              <div class="w-28 h-28 border-2 border-primary p-3 bg-white/70 flex items-center justify-center shadow-inner relative group-hover:border-burgundy group-hover:scale-105 transition-all duration-300">
                {#if index === 0}
                  <!-- Healthcare Kit -->
                  <svg viewBox="0 0 100 100" class="w-full h-full text-primary group-hover:text-burgundy transition-colors" fill="none" stroke="currentColor" stroke-width="1.8">
                    <line x1="15" y1="15" x2="35" y2="15" stroke-dasharray="2 2" />
                    <line x1="15" y1="20" x2="25" y2="20" stroke-dasharray="2 2" />
                    <rect x="20" y="30" width="60" height="50" rx="6" stroke-width="2" />
                    <path d="M38 30 V22 Q38 18 42 18 H58 Q62 18 62 22 V30" stroke-width="2" />
                    <rect x="42" y="45" width="16" height="16" fill="currentColor" fill-opacity="0.1" stroke-width="1.5" />
                    <path d="M50 49 V57 M46 53 H54" stroke-width="2.5" />
                    <circle cx="28" cy="38" r="2.5" fill="currentColor" />
                    <circle cx="72" cy="38" r="2.5" fill="currentColor" />
                  </svg>
                {:else if index === 1}
                  <!-- Skyscrapers -->
                  <svg viewBox="0 0 100 100" class="w-full h-full text-primary group-hover:text-burgundy transition-colors" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="22" y="38" width="22" height="46" stroke-width="2" />
                    <line x1="28" y1="44" x2="28" y2="78" stroke-dasharray="3 3" />
                    <line x1="38" y1="44" x2="38" y2="78" stroke-dasharray="3 3" />
                    <rect x="44" y="20" width="26" height="64" stroke-width="2.2" />
                    <line x1="50" y1="26" x2="50" y2="78" stroke-dasharray="4 4" />
                    <line x1="57" y1="26" x2="57" y2="78" stroke-dasharray="4 4" />
                    <line x1="64" y1="26" x2="64" y2="78" stroke-dasharray="4 4" />
                    <rect x="70" y="48" width="16" height="36" stroke-width="1.8" />
                    <line x1="78" y1="54" x2="78" y2="80" stroke-dasharray="2 2" />
                  </svg>
                {:else if index === 2}
                  <!-- Sustainability Leaf -->
                  <svg viewBox="0 0 100 100" class="w-full h-full text-primary group-hover:text-burgundy transition-colors" fill="none" stroke="currentColor" stroke-width="1.8">
                    <circle cx="50" cy="50" r="38" stroke-width="1.5" stroke-dasharray="1 1" />
                    <circle cx="50" cy="50" r="34" stroke-width="2" />
                    <path d="M32 68 C32 45 45 32 68 32 C68 55 55 68 32 68 Z" stroke-width="2.2" fill="currentColor" fill-opacity="0.08" />
                    <path d="M32 68 L60 40" stroke-width="2" />
                    <line x1="42" y1="58" x2="52" y2="58" stroke-width="1.5" />
                    <line x1="48" y1="52" x2="56" y2="48" stroke-width="1.5" />
                    <line x1="55" y1="45" x2="60" y2="38" stroke-width="1.5" />
                  </svg>
                {:else if index === 3}
                  <!-- Shield with Padlock -->
                  <svg viewBox="0 0 100 100" class="w-full h-full text-primary group-hover:text-burgundy transition-colors" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M25 25 H75 V45 C75 62 60 76 50 82 C40 76 25 62 25 45 Z" stroke-width="2.2" fill="currentColor" fill-opacity="0.08" />
                    <path d="M30 30 H70 V45 C70 58 58 70 50 75 C42 70 30 58 30 45 Z" stroke-width="1" stroke-dasharray="2 2" />
                    <rect x="40" y="48" width="20" height="15" rx="2" stroke-width="2" />
                    <path d="M44 48 V40 Q44 34 50 34 Q56 34 56 40 V48" stroke-width="2" />
                    <circle cx="50" cy="55" r="2.2" fill="currentColor" />
                  </svg>
                {:else}
                  <!-- Enterprise Productivity Chart -->
                  <svg viewBox="0 0 100 100" class="w-full h-full text-primary group-hover:text-burgundy transition-colors" fill="none" stroke="currentColor" stroke-width="1.8">
                    <line x1="20" y1="80" x2="80" y2="80" stroke-width="2" />
                    <rect x="25" y="65" width="8" height="15" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                    <rect x="38" y="55" width="8" height="25" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                    <rect x="51" y="42" width="8" height="38" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                    <rect x="64" y="28" width="8" height="52" stroke-width="2" fill="currentColor" fill-opacity="0.1" />
                    <path d="M22 72 Q45 50 76 24" stroke-width="2.2" stroke-linecap="round" />
                    <path d="M66 24 H76 V34" stroke-width="2" />
                  </svg>
                {/if}
              </div>
            </div>

            <!-- Content Area -->
            <div class="md:col-span-8 flex flex-col items-start text-left space-y-3">
              <h4 class="font-headline font-black uppercase text-2xl md:text-3xl leading-snug tracking-tight text-primary group-hover:text-burgundy transition-colors">
                {area.title}
              </h4>

              <div class="flex items-center gap-2 opacity-50">
                <div class="h-[1px] bg-primary w-12"></div>
                <span class="text-xs">❖</span>
                <div class="h-[1px] bg-primary w-12"></div>
              </div>

              <p class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95">
                {area.summary}
              </p>
            </div>
          </div>
        </div>

        <!-- Column Footer Mark -->
        <div class="mt-6 pt-4 border-t border-primary/40 flex justify-between items-center font-mono text-xs uppercase opacity-75">
          <span>{cardPages[index]}</span>
          <span class="opacity-45">│</span>
          <span>CODE FORGE GAZETTE EDITION</span>
        </div>
      </div>
    {/each}
  </ScrollStack>
</section>


