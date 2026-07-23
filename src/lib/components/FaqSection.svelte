<script>
  import { faqList } from '../data/gazetteData.js';
</script>

<section class="mb-24">
  <h3 class="font-headline text-3xl font-bold uppercase mb-10">Frequently Asked Questions</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
    {#each faqList as faq}
      <div class="border border-primary p-6 hover:bg-white/50 transition-colors">
        <h5 class="font-bold mb-2">{faq.q}</h5>
        <p class="text-sm opacity-80">{faq.a}</p>
      </div>
    {/each}
  </div>
</section>
