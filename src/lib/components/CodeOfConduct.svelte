<script>
  import { codeOfConductRules } from '../data/gazetteData.js';

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
</script>

<section class="mb-24 bg-primary/5 p-6 md:p-10 border-4 border-double border-primary">
  <h3 class="font-mono text-base md:text-lg font-black uppercase mb-6 text-center underline tracking-wider">
    OFFICIAL CODE OF CONDUCT
  </h3>
  <ul class="font-mono text-xs md:text-sm space-y-4 leading-relaxed">
    {#each codeOfConductRules as rule, i}
      <li class="flex items-start gap-3">
        <span class="font-bold text-primary min-w-[28px]">{romanNumerals[i] || `${i + 1}`}.</span>
        <span class="opacity-90">{rule}</span>
      </li>
    {/each}
  </ul>
</section>

