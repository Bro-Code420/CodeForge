<script>
  import { onMount } from 'svelte';
  import { cubicOut, quintOut } from 'svelte/easing';
  import { scheduleData } from '../data/gazetteData.js';

  let activeIndex = 0; // Default to Page 1
  let direction = 1;
  let copied = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // Custom directional page flip/slide transition
  function pageTransition(node, { direction = 1, duration = 380 }) {
    return {
      duration,
      css: (t) => {
        const eased = cubicOut(t);
        const invEased = 1 - eased;
        const xOffset = direction * 50 * invEased;
        const rotation = direction * 3 * invEased;
        const scale = 0.96 + 0.04 * eased;
        return `
          opacity: ${eased};
          transform: perspective(1200px) translate3d(${xOffset}px, 0, 0) rotateY(${rotation}deg) scale(${scale});
          transform-origin: ${direction > 0 ? 'right center' : 'left center'};
        `;
      }
    };
  }

  function setPage(index) {
    if (index === activeIndex) return;
    direction = index > activeIndex ? 1 : -1;
    activeIndex = index;
  }

  function nextPage() {
    if (activeIndex < scheduleData.events.length - 1) {
      direction = 1;
      activeIndex += 1;
    }
  }

  function prevPage() {
    if (activeIndex > 0) {
      direction = -1;
      activeIndex -= 1;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  }

  function handleTouchStart(e) {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
    }
  }

  function handleTouchEnd(e) {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (diff > 45) {
        nextPage();
      } else if (diff < -45) {
        prevPage();
      }
    }
  }

  function copySchedule() {
    const text = scheduleData.events
      .map((e, idx) => `[Page ${idx + 1 < 10 ? '0' : ''}${idx + 1}] ${e.time} — ${e.title}\n   ${e.details}`)
      .join('\n\n');
    navigator.clipboard.writeText(
      `CODE FORGE 2026 — OFFICIAL EVENT SCHEDULE\nDate: 25 August 2026 | Venue: G.H. Raisoni, Nagpur\n\n${text}`
    );
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }

  $: currentEvent = scheduleData.events[activeIndex];
  $: nextEvent = scheduleData.events[Math.min(activeIndex + 1, scheduleData.events.length - 1)];
  $: prevEvent = scheduleData.events[Math.max(activeIndex - 1, 0)];
  $: progressPercent = ((activeIndex + 1) / scheduleData.events.length) * 100;

  // Visual stamp badges per milestone phase
  const phaseStamps = [
    'CHECK-IN VERIFIED',
    'STATION SETUP',
    'OFFICIAL INAUGURAL',
    'CODE COMMENCEMENT',
    'SPRINT DEV PHASE 1',
    'PPT PITCH JURY',
    'ELIMINATION DISPATCH',
    'FINAL CODE AUDIT',
    'PODIUM CEREMONY',
    'WINNERS SHOWCASE',
    'VALEDICTORY CLOSE'
  ];
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="schedule" class="mb-20 select-none relative pt-2">
  <!-- Outer Dark Framing Canvas -->
  <div class="w-full bg-[#181816] p-3.5 sm:p-6 md:p-10 border-4 border-[#161616] shadow-2xl relative overflow-hidden rounded-sm">
    
    <!-- Ambient Subtle Grain Texture -->
    <div class="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

    <!-- MAIN MANILA FOLDER CONTAINER -->
    <div class="relative max-w-5xl mx-auto">
      
      <!-- Manila Folder Top Index Tabs (01 to 11) -->
      <div class="flex items-end pl-2 sm:pl-8 space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar relative z-0 -mb-[2px]">
        {#each scheduleData.events as item, idx}
          {@const tabNumber = idx < 9 ? `0${idx + 1}` : `${idx + 1}`}
          <button
            type="button"
            on:click={() => setPage(idx)}
            class="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-t-md transition-all duration-200 border-t border-x border-[#b59e74] shadow-sm flex items-center gap-1 cursor-pointer {activeIndex === idx
              ? 'bg-[#EBDAB6] text-[#161616] -translate-y-1.5 z-10 font-black shadow-md border-b-2 border-b-[#EBDAB6]'
              : 'bg-[#DFCDA3] text-[#554731] hover:bg-[#E5D4AC] hover:-translate-y-0.5'}"
            title="Page {tabNumber}: {item.title}"
          >
            <span>{tabNumber}</span>
            {#if item.isHighlight}
              <span class="text-[9px]">{item.customIcon}</span>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Manila Folder Body Backing -->
      <div class="bg-[#EBDAB6] p-3 sm:p-6 md:p-8 border border-[#b59e74] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md relative z-10">
        
        <!-- Stacked Paper Layer Realism -->
        <div class="absolute inset-2 sm:inset-3 bg-white/90 shadow-md transform -rotate-[0.6deg] rounded-xs pointer-events-none -z-10"></div>
        <div class="absolute inset-2 sm:inset-3 bg-[#FAF7F0] shadow-md transform rotate-[0.4deg] rounded-xs pointer-events-none -z-10"></div>

        <!-- TOP GRAPH PAPER SHEET (Main Page Canvas) -->
        <div
          on:touchstart={handleTouchStart}
          on:touchend={handleTouchEnd}
          class="relative bg-[#FCFBF7] border border-[#d6cfbe] p-4 sm:p-7 md:p-9 shadow-xl rounded-xs overflow-hidden"
          style="background-image: linear-gradient(to right, rgba(22, 22, 22, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22, 22, 22, 0.05) 1px, transparent 1px); background-size: 22px 22px;"
        >

          <!-- REALISTIC METAL PAPERCLIP (Top-Right) -->
          <div class="absolute -top-3 right-5 sm:right-10 z-30 pointer-events-none">
            <svg
              class="w-7 sm:w-9 h-18 sm:h-22 filter drop-shadow-md text-[#66686a]"
              viewBox="0 0 40 90"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 28 V70 C12 78 28 78 28 70 V15 C28 6 6 6 6 15 V65 C6 71 18 71 18 65 V28"
                stroke="#4a4c4e"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 28 V70 C12 78 28 78 28 70 V15 C28 6 6 6 6 15 V65 C6 71 18 71 18 65 V28"
                stroke="#d1d5db"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <!-- TOP HEADER: Document Code & Lowercase Title -->
          <div class="max-w-2xl mb-4 sm:mb-6">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#161616] text-[#FCFBF7]">
                DOC. FORGE-SCHED-2026
              </span>
              <span class="font-mono text-[9px] sm:text-[11px] font-bold text-[#161616]/60 uppercase tracking-wider">
                // 25 AUGUST 2026
              </span>
            </div>

            <h3 class="font-headline font-black text-3xl sm:text-4xl md:text-5xl text-[#161616] tracking-tight leading-none mb-2 lowercase">
              official schedule
            </h3>

            <p class="font-body text-xs sm:text-sm text-[#161616]/80 leading-relaxed max-w-xl">
              Next is the master itinerary, where we blended structured engineering execution with editorial clarity. Rooted in disciplined phases and punctuality:
            </p>
          </div>

          <!-- DEDICATED PAGE FLIP TRANSITION CARD (Grid Stage for Smooth Transitions) -->
          <div class="relative mb-5 min-h-[220px] sm:min-h-[200px] overflow-hidden">
            
            {#key activeIndex}
              <div
                in:pageTransition={{ direction, duration: 360 }}
                class="w-full"
              >
                <!-- Card Container with Ink Bleed & Newspaper Border Styling -->
                <div
                  class="relative p-5 sm:p-6 md:p-7 border-2 border-[#161616] rounded-xs transition-all duration-300 flex flex-col justify-between overflow-hidden {currentEvent.isHighlight
                    ? currentEvent.highlightType === 'launch'
                      ? 'bg-[#A0492E]/10 border-[#A0492E] shadow-[5px_5px_0px_#A0492E]'
                      : 'bg-[#D59B34]/15 border-[#D59B34] shadow-[5px_5px_0px_#D59B34]'
                    : 'bg-white/95 shadow-[4px_4px_0px_rgba(22,22,22,1)]'}"
                >
                  <!-- Background Vintage Rubber Stamp Watermark -->
                  <div class="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.06] select-none transform -rotate-12">
                    <div class="w-48 h-48 rounded-full border-4 border-dashed border-[#161616] flex items-center justify-center p-4 text-center font-mono font-black text-xs uppercase leading-tight">
                      <span>★ {phaseStamps[activeIndex]} ★ CODE FORGE OFFICIAL</span>
                    </div>
                  </div>

                  <!-- Card Header Bar -->
                  <div class="flex flex-wrap justify-between items-center gap-2 mb-3.5 font-mono pb-2.5 border-b border-[#161616]/20 relative z-10">
                    <div class="flex items-center gap-2">
                      <!-- Pill Time Badge -->
                      <span class="text-xs sm:text-sm font-black px-3 py-1 border border-[#161616] {currentEvent.isHighlight ? 'bg-[#161616] text-[#FCFBF7]' : 'bg-[#FAF6EE] text-[#161616]'} rounded-full tracking-tight shadow-xs">
                        {currentEvent.time}
                      </span>

                      <!-- Category Tag -->
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#161616]/5 border border-[#161616]/30 tracking-wider">
                        {currentEvent.category}
                      </span>
                    </div>

                    <!-- Page Indicator Badge -->
                    <div class="flex items-center gap-2">
                      {#if currentEvent.time === '10:00 AM'}
                        <span class="font-mono text-[9px] sm:text-[10px] font-black uppercase text-[#A0492E] bg-white px-2.5 py-0.5 border border-[#A0492E] shadow-xs">
                          Starts Sharp! 🦅
                        </span>
                      {:else if currentEvent.time === '5:00 PM'}
                        <span class="font-mono text-[9px] sm:text-[10px] font-black uppercase text-[#966b0a] bg-white px-2.5 py-0.5 border border-[#D59B34] shadow-xs">
                          Podium Reveal! 🏆
                        </span>
                      {:else if currentEvent.isHighlight}
                        <span class="font-mono text-[9px] sm:text-[10px] font-black uppercase text-[#A0492E] px-2 py-0.5 border border-[#A0492E] bg-white">
                          ★ CRITICAL MILESTONE
                        </span>
                      {/if}
                      <span class="text-xs font-mono font-bold bg-[#161616] text-[#FCFBF7] px-2.5 py-0.5 rounded-xs">
                        PAGE {activeIndex < 9 ? `0${activeIndex + 1}` : activeIndex + 1} / 11
                      </span>
                    </div>
                  </div>

                  <!-- Card Title & Details -->
                  <div class="my-1.5 relative z-10">
                    <h4 class="font-headline font-black text-xl sm:text-2xl md:text-3xl text-[#161616] uppercase leading-tight mb-2 flex items-center gap-2 {currentEvent.isHighlight ? 'text-[#A0492E]' : ''}">
                      {#if currentEvent.customIcon}
                        <span class="text-2xl inline-block transform hover:scale-110 transition-transform">{currentEvent.customIcon}</span>
                      {/if}
                      <span>{currentEvent.title}</span>
                    </h4>

                    <p class="font-serif-alt text-sm sm:text-base text-[#161616]/90 leading-relaxed max-w-3xl">
                      {currentEvent.details}
                    </p>
                  </div>

                  <!-- Card Navigation Footer -->
                  <div class="mt-5 pt-3.5 border-t border-[#161616]/20 flex items-center justify-between gap-3 relative z-10">
                    {#if activeIndex > 0}
                      <!-- Prev Button -->
                      <button
                        type="button"
                        on:click={prevPage}
                        class="font-mono text-[11px] font-bold uppercase px-3.5 py-1.5 border border-[#161616] bg-[#FAF6EE] hover:bg-[#161616] hover:text-[#FCFBF7] transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_rgba(22,22,22,0.15)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer group"
                      >
                        <span class="group-hover:-translate-x-0.5 transition-transform">←</span>
                        <span>PREVIOUS PHASE</span>
                        <span class="opacity-60 text-[9px] hidden sm:inline">({prevEvent.time})</span>
                      </button>
                    {:else}
                      <div></div>
                    {/if}

                    {#if activeIndex < scheduleData.events.length - 1}
                      <!-- Next Button -->
                      <button
                        type="button"
                        on:click={nextPage}
                        class="ml-auto font-mono text-[11px] font-bold uppercase px-3.5 py-1.5 border border-[#161616] bg-[#FAF6EE] hover:bg-[#161616] hover:text-[#FCFBF7] transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_rgba(22,22,22,0.15)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer group"
                      >
                        <span>NEXT PHASE</span>
                        <span class="opacity-60 text-[9px] hidden sm:inline">({nextEvent.time})</span>
                        <span class="group-hover:translate-x-0.5 transition-transform">→</span>
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
            {/key}

          </div>

          <!-- STATION ADVISORIES & DIRECTIVES (Constant on Every Page) -->
          <div class="border-2 border-[#161616] bg-[#F2EDE2] p-4 sm:p-5 mb-5 rounded-xs">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 border-b border-[#161616]/30 pb-2.5 mb-3">
              <span class="font-mono text-xs font-black uppercase tracking-widest text-[#161616] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-[#A0492E]">campaign</span>
                STATION ADVISORIES & DIRECTIVES
              </span>
              <span class="font-mono text-[10px] font-bold uppercase text-[#161616]/70">
                AUDITED BY CHIEF MARSHAL
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              {#each scheduleData.advisories as advisory, i}
                <div class="bg-white/80 p-3 border border-[#161616]/20">
                  <div class="font-bold text-[#A0492E] mb-1 text-[10px] sm:text-[11px] uppercase tracking-wider">
                    0{i + 1}. {advisory.title}
                  </div>
                  <p class="font-serif-alt text-xs text-[#161616]/85 leading-relaxed">
                    {advisory.text}
                  </p>
                </div>
              {/each}
            </div>
          </div>

          <!-- BOTTOM NOTICE FOOTER (Constant on Every Page) -->
          <div class="flex justify-center items-center pt-3 border-t border-[#161616]/30">
            <p class="font-mono text-[10px] sm:text-[11px] text-[#161616]/70 text-center">
              Code Forge 2026 • Official Department of Science & Technology Dispatch • Nagpur, India
            </p>
          </div>

          <!-- REALISTIC CELLO / SCOTCH TAPE STRIP (Bottom Center) -->
          <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div class="w-24 sm:w-32 h-6 bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs transform rotate-1 opacity-80"></div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
