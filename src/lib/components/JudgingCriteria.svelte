<script>
  import { scoreSheet, boardPanel } from '../data/gazetteData.js';

  $: totalMarks = scoreSheet.reduce((sum, item) => sum + item.marks, 0);
</script>

<section class="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12">
  <div class="md:col-span-5">
    <div class="border border-primary p-6 bg-white shadow-inner">
      <h3 class="font-mono text-sm font-bold uppercase mb-6 text-center border-b border-primary pb-2">
        OFFICIAL SCORE SHEET
      </h3>
      <div class="space-y-4 font-mono text-xs">
        {#each scoreSheet as item}
          <div class="flex justify-between border-b border-dotted border-primary/40 pb-1">
            <span>{item.criterion}</span>
            <span>{item.marks}</span>
          </div>
        {/each}
        <div class="flex justify-between font-bold border-none pt-4 text-sm">
          <span>TOTAL MARKS</span>
          <span>{totalMarks}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="md:col-span-7 flex flex-col justify-center">
    <h3 class="font-headline text-4xl font-black uppercase mb-6">Board of Inquiry</h3>
    <p class="mb-8 opacity-80">{boardPanel.description}</p>
    <div class="border border-primary p-2">
      <img
        alt="The Board"
        class="w-full grayscale contrast-125 ink-bleed"
        src={boardPanel.figureImg}
      />
    </div>
  </div>
</section>
