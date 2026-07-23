<script>
  import { headerData } from '../data/gazetteData.js';
</script>

<header class="w-full flex flex-col border-b-2 border-primary">
  <div class="flex justify-between px-6 md:px-12 py-2 font-mono text-[10px] md:text-xs uppercase border-b border-primary">
    <span>{headerData.vol}</span>
    <span>{headerData.date}</span>
    <span>{headerData.location}</span>
  </div>
  
  <div class="px-6 md:px-12 py-10 md:py-20 text-center">
    <h1 class="font-masthead text-7xl md:text-[160px] font-black uppercase tracking-tighter leading-none mb-2">
      {headerData.title}
    </h1>
    <p class="font-serif-alt text-2xl md:text-4xl italic tracking-wide">{headerData.motto}</p>
  </div>
  
  <div class="breaking-news">
    <div class="scroll-text font-mono text-xs uppercase tracking-widest">
      {headerData.breakingTicker}
    </div>
  </div>
  
  <nav class="flex justify-center items-center py-4 border-t border-primary gap-4 md:gap-12 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest overflow-x-auto no-scrollbar px-6">
    {#each headerData.navLinks as link, index}
      <a class="hover:italic transition-all" href={link.href}>{link.label}</a>
      {#if index < headerData.navLinks.length - 1}
        <span class="opacity-30">/</span>
      {/if}
    {/each}
  </nav>
</header>
