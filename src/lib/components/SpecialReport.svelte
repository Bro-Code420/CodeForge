<script>
  import { themeData } from '../data/gazetteData.js';
</script>

<section class="mb-24 bg-primary text-background p-8 md:p-12 relative overflow-hidden" id="theme">
  <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
    <div class="lg:col-span-7">
      <span class="font-mono text-xs font-bold border border-background px-3 py-1 uppercase tracking-widest">
        {themeData.badge}
      </span>
      
      <h3 class="font-headline text-4xl md:text-6xl font-black mt-6 mb-2 uppercase leading-none">
        {themeData.title}
      </h3>
      
      {#if themeData.tagline}
        <p class="font-mono text-xs md:text-sm uppercase tracking-widest text-background/80 mb-8 border-b border-background/20 pb-4">
          {themeData.tagline}
        </p>
      {/if}

      <div class="space-y-6 font-body text-sm md:text-base opacity-95 leading-relaxed">
        <!-- ✦ The Challenge -->
        <div>
          <strong class="font-headline text-xl block text-background mb-1.5">{themeData.challengeTitle}</strong>
          <p class="font-serif-alt text-sm md:text-base leading-relaxed text-background/95">{themeData.challengeText}</p>
        </div>

        <!-- ⚙ Technology Freedom -->
        <div>
          <strong class="font-headline text-xl block text-background mb-1.5">{themeData.techTitle}</strong>
          <p class="font-serif-alt text-sm md:text-base leading-relaxed text-background/95">{themeData.techText}</p>
        </div>
        
        <!-- 📜 Competition Rules -->
        <div>
          <strong class="font-headline text-xl block text-background mb-2.5">{themeData.rulesTitle}</strong>
          <ul class="space-y-2 font-mono text-xs md:text-sm text-background/90 pl-1">
            {#each themeData.rules as rule}
              <li class="leading-snug">{rule}</li>
            {/each}
          </ul>
        </div>
        

      </div>
    </div>

    <div class="lg:col-span-5 flex flex-col justify-center sticky top-8">
      <div class="border-2 border-background/40 p-1.5 bg-primary">
        <img
          alt={themeData.figureCaption}
          class="w-full grayscale contrast-125 opacity-85 block object-cover max-h-[500px]"
          src={themeData.figureImg}
        />
      </div>
      <p class="font-mono text-[10px] font-bold mt-3 uppercase text-center opacity-75 tracking-wider">
        {themeData.figureCaption}
      </p>
    </div>
  </div>
</section>

