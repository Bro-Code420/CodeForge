<script>
  import { onMount } from 'svelte';
  import { themeData } from '../data/gazetteData.js';
  import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

  let containerWidth = 0;
  let lines = [];
  let prepared;

  onMount(() => {
    try {
      prepared = prepareWithSegments(themeData.themeText, '15px Garamond, Georgia, serif');
      updateLayout();
    } catch (e) {
      console.warn("Pretext layout prep failed, using default fallback:", e);
    }

    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  });

  function updateLayout() {
    if (!prepared || containerWidth <= 0) return;
    try {
      const result = layoutWithLines(prepared, containerWidth, 22);
      lines = result.lines.map(l => l.text);
    } catch (e) {
      lines = [themeData.themeText];
    }
  }

  $: if (containerWidth) {
    updateLayout();
  }
</script>

<section class="mb-24 bg-primary text-background p-8 md:p-12 relative overflow-hidden" id="theme">
  <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div>
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

      <div class="space-y-5 font-body text-sm md:text-base opacity-95 leading-relaxed">
        <div bind:clientWidth={containerWidth}>
          <strong class="font-headline text-lg block text-background mb-1">The Theme:</strong>
          {#if lines.length > 0}
            <div class="space-y-1 font-serif-alt">
              {#each lines as line}
                <div class="text-justify leading-relaxed text-background/90">{line}</div>
              {/each}
            </div>
          {:else}
            <p class="font-serif-alt leading-relaxed text-background/90">{themeData.themeText}</p>
          {/if}
        </div>
        
        {#if themeData.objectives}
          <div>
            <strong class="font-headline text-lg block text-background mb-1.5">Objectives:</strong>
            <ul class="list-disc list-inside space-y-1 pl-1 font-mono text-xs md:text-sm">
              {#each themeData.objectives as obj}
                <li>{obj}</li>
              {/each}
            </ul>
          </div>
        {/if}
        
        <p>
          <strong class="font-headline text-lg block text-background mb-1">Technology Scope:</strong>
          <span class="font-mono text-xs md:text-sm leading-relaxed block text-background/90">{themeData.scopeText}</span>
        </p>
      </div>
    </div>

    <div class="flex flex-col justify-center">
      <div class="border-2 border-background/40 p-1.5 bg-primary">
        <img
          alt={themeData.figureCaption}
          class="w-full grayscale contrast-125 opacity-85 block"
          src={themeData.figureImg}
        />
      </div>
      <p class="font-mono text-[10px] font-bold mt-3 uppercase text-center opacity-75 tracking-wider">
        {themeData.figureCaption}
      </p>
    </div>
  </div>
</section>

