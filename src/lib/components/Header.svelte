<script>
  import { headerData } from '../data/gazetteData.js';
  import Hero from './Hero.svelte';
</script>

<header class="w-full border-b-2 border-primary bg-[#F6F1E8]">

  
  <!-- New Retro Hero Section Replacing Old Masthead -->
  <div class="w-full">
    <Hero />
  </div>

  <!-- Breaking News Marquee Ticker (UNCHANGED) -->
  <div>
    <div class="breaking-news">
      <div class="scroll-text font-mono text-xs uppercase tracking-widest">
        {headerData.breakingTicker}
      </div>
    </div>
    
    <!-- Navigation Links -->
    <nav class="flex justify-center items-center py-4 border-t border-primary gap-4 md:gap-12 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest overflow-x-auto no-scrollbar px-6">
      {#each headerData.navLinks as link, index}
        <a class="hover:italic transition-all" href={link.href}>{link.label}</a>
        {#if index < headerData.navLinks.length - 1}
          <span class="opacity-30">/</span>
        {/if}
      {/each}
    </nav>
  </div>
</header>
