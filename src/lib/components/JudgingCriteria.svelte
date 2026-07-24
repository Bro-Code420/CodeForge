<script>
  import { scoreSheet, boardPanel } from '../data/gazetteData.js';

  $: totalMarks = scoreSheet.reduce((sum, item) => sum + item.marks, 0);
</script>

<section id="evaluation" class="mb-24">
  <!-- Section Title Header Bar -->
  <div class="border-t-2 border-b-2 border-primary py-3 mb-10 flex flex-col sm:flex-row justify-between items-center font-mono text-xs md:text-sm font-bold tracking-widest uppercase gap-2 bg-primary/5">
    <span>SECTION IV // EVALUATION & ADJUDICATION</span>
    <span>GAZETTE STANDARDS 2026</span>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
    
    <!-- PAGE 1: OFFICIAL SCORE SHEET -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between h-full relative">
      <div>
        <!-- Gazette Header -->
        <div class="flex justify-between items-center border-b-2 border-primary pb-3 mb-6 font-mono text-xs font-bold uppercase tracking-wider">
          <span>DOC. REF: FORGE-EVAL-2026</span>
          <span class="bg-primary text-background px-2 py-0.5">FORM 04-A</span>
        </div>

        <h3 class="font-headline text-3xl md:text-4xl font-black uppercase text-center mb-2 tracking-tight">
          OFFICIAL SCORE SHEET
        </h3>
        <p class="font-serif-alt italic text-sm text-center opacity-80 mb-6 border-b border-primary/20 pb-4">
          Standardized Criteria & Weightage Matrix
        </p>

        <!-- Table Header Row -->
        <div class="flex justify-between font-mono text-xs font-bold uppercase border-b-2 border-primary pb-2 mb-4 bg-primary/10 px-3 py-1.5">
          <span>EVALUATION DOMAIN</span>
          <span>MARKS</span>
        </div>

        <!-- Criteria Item List with Dotted Leaders -->
        <div class="space-y-3.5 font-mono text-xs md:text-sm">
          {#each scoreSheet as item}
            <div class="flex items-center justify-between py-1 border-b border-dotted border-primary/40">
              <span class="font-bold text-primary">{item.criterion}</span>
              <span class="flex-grow mx-2 border-b border-dotted border-primary/50 opacity-40"></span>
              <span class="font-bold font-mono px-2 py-0.5 bg-primary/5 border border-primary/30">
                {item.marks}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Total & Footer Seal -->
      <div class="mt-8 pt-4 border-t-2 border-primary">
        <div class="flex justify-between items-center bg-primary text-background p-4 font-mono font-bold text-sm md:text-base">
          <span>TOTAL AGGREGATE MARKS</span>
          <span class="text-lg">{totalMarks}</span>
        </div>
        <p class="font-mono text-[10px] uppercase text-center font-bold tracking-wider opacity-70 mt-3">
          ★ CERTIFIED EVALUATION MATRIX — ALL SCORES AUDITED BY BOARD OF INQUIRY
        </p>
      </div>
    </div>

    <!-- PAGE 2: BOARD OF INQUIRY -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between h-full relative">
      <div>
        <!-- Gazette Header -->
        <div class="flex justify-between items-center border-b-2 border-primary pb-3 mb-6 font-mono text-xs font-bold uppercase tracking-wider">
          <span>PANEL OF ADJUDICATORS</span>
          <span class="bg-primary text-background px-2 py-0.5">DISPATCH 04-B</span>
        </div>

        <h3 class="font-headline text-3xl md:text-4xl font-black uppercase text-center mb-2 tracking-tight">
          BOARD OF INQUIRY
        </h3>
        <p class="font-body text-xs md:text-sm text-center leading-relaxed opacity-85 mb-6 border-b border-primary/20 pb-4 max-w-lg mx-auto">
          {boardPanel.description}
        </p>

        <!-- Framed Press Image (Hidden for now - can be restored later) -->
        <!--
        <div class="border-2 border-primary p-2 bg-white">
          <img
            alt="Fig 04: The Board of Inquiry"
            class="w-full grayscale contrast-125 ink-bleed object-cover block"
            src={boardPanel.figureImg}
          />
        </div>
        -->

        <!-- Placeholder card while photos/names are hidden -->
        <div class="border-2 border-dashed border-primary/40 p-8 text-center bg-primary/5 my-4 font-mono">
          <span class="material-symbols-outlined text-3xl opacity-60 mb-2 block">person_search</span>
          <p class="text-xs font-bold uppercase tracking-wider text-primary opacity-80">
            adjudicator panel details & photos coming soon
          </p>
        </div>
      </div>

      <div class="mt-6 pt-3 border-t-2 border-primary">
        <p class="font-mono text-[11px] uppercase text-center font-bold tracking-wider text-primary opacity-70">
          Fig 04: The Board of Inquiry — Official Adjudication Panel
        </p>
      </div>
    </div>

  </div>
</section>

