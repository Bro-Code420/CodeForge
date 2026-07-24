<script>
  import { faqList } from '../data/gazetteData.js';
</script>

<section class="mb-24 select-none" id="faq">
  <!-- Section Title -->
  <div class="border-t-2 border-b-2 border-primary py-3 mb-12 text-center bg-primary/5">
    <h3 class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1">
      READER CORRESPONDENCE: INQUIRIES & ANSWERS
    </h3>
    <p class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto">
      Resolving common questions regarding regulations, schedules, and registry.
    </p>
  </div>

  <!-- Vintage Newspaper Column Layout -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each faqList as faq, index}
      <div class="relative bg-[#F4EFE6] border-2 border-double border-primary/80 p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_rgba(43,43,42,0.15)] hover:shadow-[6px_6px_0px_rgba(43,43,42,0.2)] hover:bg-[#FAF6EE] transition-all duration-300 flex flex-col justify-between group">
        
        <!-- Postmark Stamp in Background of Card -->
        <div class="absolute top-4 right-4 w-16 h-16 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity pointer-events-none text-primary">
          <svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current" stroke-width="2">
            <circle cx="50" cy="50" r="45" stroke-dasharray="2 2" />
            <circle cx="50" cy="50" r="40" />
            <path d="M 25 50 L 75 50" />
            <text x="50" y="42" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">FORGE</text>
            <text x="50" y="62" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" fill="currentColor" stroke="none">2026</text>
          </svg>
        </div>

        <div>
          <!-- Question Header Block -->
          <div class="flex gap-4 items-start mb-4">
            <!-- Vintage Q dropcap badge -->
            <div class="flex-shrink-0 w-10 h-10 bg-burgundy border border-primary text-background font-headline font-black text-xl flex items-center justify-center rounded-sm shadow-[2px_2px_0px_0px_rgba(43,43,42,1)]">
              Q
            </div>
            
            <h5 class="font-headline font-black text-lg md:text-xl text-primary leading-tight pt-1">
              {faq.q}
            </h5>
          </div>

          <!-- Divider line with diamond center -->
          <div class="flex items-center gap-2 my-4 opacity-40">
            <div class="h-[1px] bg-primary flex-grow"></div>
            <span class="text-[9px]">✦</span>
            <div class="h-[1px] bg-primary flex-grow"></div>
          </div>

          <!-- Answer block with letterpress A -->
          <div class="flex gap-4 items-start">
            <!-- Vintage A dropcap badge -->
            <div class="flex-shrink-0 w-10 h-10 bg-primary border border-primary text-background font-headline font-black text-xl flex items-center justify-center rounded-sm shadow-[2px_2px_0px_0px_rgba(43,43,42,0.4)]">
              A
            </div>
            
            <p class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95 text-justify pt-1">
              {faq.a}
            </p>
          </div>
        </div>

        <!-- Card Footer Dispatch Note -->
        <div class="mt-6 pt-3 border-t border-primary/20 flex justify-between items-center font-mono text-[8px] uppercase tracking-wider opacity-60">
          <span>INQUIRY DESPATCH #{index + 1}</span>
          <span>RESPONSE CONFIRMED</span>
        </div>
      </div>
    {/each}
  </div>
</section>
