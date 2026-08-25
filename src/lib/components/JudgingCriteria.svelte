<script>
  import { scoreSheet, boardPanel, evaluationFramework } from '../data/gazetteData.js';

  $: baseScoreSheet = scoreSheet.filter(item => !item.isBonus);
  $: bonusScoreSheet = scoreSheet.filter(item => item.isBonus);
  $: baseTotalMarks = baseScoreSheet.reduce((sum, item) => sum + item.marks, 0);
</script>

<section id="evaluation" class="mb-24">
  <!-- Section Title Header Bar (Full UI Space) -->
  <div class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t-2 border-b-2 border-primary py-3 mb-10 bg-primary/5">
    <div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center font-mono text-xs md:text-sm font-bold tracking-widest uppercase gap-2">
      <span>SECTION IV // EVALUATION & ADJUDICATION</span>
      <span>OFFICIAL 100-MARK FRAMEWORK • {evaluationFramework?.docRef || 'FORGE-EVAL-2026'}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
    
    <!-- PAGE 1: OFFICIAL SCORE SHEET -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between h-full relative">
      <div>
        <!-- Gazette Header -->
        <div class="flex justify-between items-center border-b-2 border-primary pb-3 mb-6 font-mono text-xs font-bold uppercase tracking-wider">
          <span>DOC. REF: {evaluationFramework?.docRef || 'FORGE-EVAL-2026'}</span>
          <span class="bg-primary text-background px-2 py-0.5">FORM 04-A</span>
        </div>

        <h3 class="font-headline text-3xl md:text-4xl font-black uppercase text-center mb-2 tracking-tight">
          OFFICIAL SCORE SHEET
        </h3>
        <p class="font-serif-alt italic text-sm text-center opacity-80 mb-6 border-b border-primary/20 pb-4">
          Standardized Criteria & Weightage Matrix (100 Marks Base)
        </p>

        <!-- Table Header Row -->
        <div class="flex justify-between font-mono text-xs font-bold uppercase border-b-2 border-primary pb-2 mb-4 bg-primary/10 px-3 py-1.5">
          <span>EVALUATION DOMAIN</span>
          <span>MARKS</span>
        </div>

        <!-- Criteria Item List with Dotted Leaders -->
        <div class="space-y-2.5 font-mono text-xs md:text-sm">
          {#each baseScoreSheet as item}
            <div class="flex items-baseline justify-between py-1 border-b border-dotted border-primary/30 group hover:bg-primary/5 transition-colors px-1">
              <div class="flex flex-col pr-2">
                <span class="font-bold text-primary">{item.criterion}</span>
                {#if item.focus}
                  <span class="font-serif-alt italic text-[11px] text-primary/70 leading-tight mt-0.5">
                    {item.focus}
                  </span>
                {/if}
              </div>
              <span class="flex-grow mx-2 border-b border-dotted border-primary/40 opacity-40 self-center"></span>
              <span class="font-bold font-mono px-2 py-0.5 bg-primary/5 border border-primary/30 self-center whitespace-nowrap">
                {item.marks}
              </span>
            </div>
          {/each}

          {#if bonusScoreSheet.length > 0}
            <div class="pt-3 mt-3 border-t-2 border-dashed border-primary/30">
              <p class="font-mono text-[11px] font-bold uppercase tracking-wider text-burgundy mb-2">
                ★ EXTRA / BONUS CRITERIA
              </p>
              {#each bonusScoreSheet as item}
                <div class="flex items-center justify-between py-1.5 px-2.5 bg-burgundy/5 border border-burgundy/30">
                  <span class="font-bold text-burgundy">{item.criterion}</span>
                  <span class="flex-grow mx-2 border-b border-dotted border-burgundy/40 opacity-40"></span>
                  <span class="font-bold font-mono px-2 py-0.5 bg-burgundy text-background text-xs">
                    +{item.marks} EXTRA
                  </span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Total & Footer Seal -->
      <div class="mt-8 pt-4 border-t-2 border-primary">
        <div class="flex justify-between items-center bg-primary text-background p-4 font-mono font-bold text-sm md:text-base">
          <span>TOTAL MARKS</span>
          <span class="text-lg tracking-wider">{baseTotalMarks} / 100</span>
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

        <!-- Official Adjudicator Panel List -->
        <div class="space-y-4 my-4">
          {#if boardPanel.judges && boardPanel.judges.length > 0}
            {#each boardPanel.judges as judge}
              <div class="border border-primary/40 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors p-4 md:p-5 relative group">
                <!-- Top Badge Row -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-dashed border-primary/30">
                  <div class="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase text-primary">
                    <span class="material-symbols-outlined text-sm">{judge.icon || 'verified'}</span>
                    <span class="bg-primary text-background px-1.5 py-0.5 text-[10px]">{judge.id}</span>
                    <span class="text-primary/70">{judge.domain}</span>
                  </div>
                  <span class="font-mono text-[10px] uppercase font-bold tracking-widest text-burgundy bg-burgundy/10 px-2 py-0.5 border border-burgundy/30">
                    ADJUDICATOR
                  </span>
                </div>

                <!-- Judge Identity -->
                <div class="mb-2">
                  <h4 class="font-headline text-xl md:text-2xl font-black uppercase tracking-tight text-primary">
                    {judge.name}
                  </h4>
                  <p class="font-mono text-xs font-bold text-primary/90 mt-0.5">
                    {judge.title}
                  </p>
                  <p class="font-serif-alt italic text-xs text-primary/75 mt-0.5">
                    {judge.qualifications}
                  </p>
                </div>

                <!-- Short Overview -->
                <p class="font-body text-xs leading-relaxed opacity-85 text-primary/90 mb-3">
                  {judge.summary}
                </p>

                <!-- Tags / Competency Badges -->
                {#if judge.tags}
                  <div class="flex flex-wrap gap-1.5 pt-2 border-t border-dotted border-primary/20">
                    {#each judge.tags as tag}
                      <span class="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 bg-primary/5 border border-primary/30 text-primary/80">
                        {tag}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          {:else}
            <!-- Placeholder fallback -->
            <div class="border-2 border-dashed border-primary/40 p-8 text-center bg-primary/5 my-4 font-mono">
              <span class="material-symbols-outlined text-3xl opacity-60 mb-2 block">person_search</span>
              <p class="text-xs font-bold uppercase tracking-wider text-primary opacity-80">
                adjudicator panel details & photos coming soon
              </p>
            </div>
          {/if}
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

