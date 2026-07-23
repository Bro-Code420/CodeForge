<script>
  import { codeOfConductRules } from '../data/gazetteData.js';

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
</script>

<section class="mb-24 bg-primary/5 p-8 border-4 border-double border-primary">
  <h3 class="font-mono text-sm font-black uppercase mb-6 text-center underline">
    OFFICIAL CODE OF CONDUCT
  </h3>
  <ul class="font-mono text-[11px] space-y-3 leading-relaxed">
    {#each codeOfConductRules as rule, i}
      <li>{romanNumerals[i] || `${i + 1}`}. {rule}</li>
    {/each}
  </ul>
</section>
