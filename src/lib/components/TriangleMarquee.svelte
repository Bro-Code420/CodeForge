<script>
  export let speed = "0.75s"; // Animation speed cycle
  export let reverse = false; // Scroll left or right
  export let height = "h-5"; // Height of SVG track
  export let className = ""; // Additional classes
</script>

<div class="w-full overflow-hidden border-t-2 border-b-2 border-primary py-1 relative select-none {className}">
  <div 
    class="w-[calc(100%+48px)] -ml-3 flex shrink-0"
    style="animation: sawtooth-marquee {speed} linear infinite {reverse ? 'reverse' : ''};"
  >
    <svg class="w-full {height}" width="100%" height="20">
      <defs>
        <pattern id="sawtooth-marquee-pattern" width="24" height="20" patternUnits="userSpaceOnUse">
          <polygon points="0,0 24,0 12,18" class="fill-primary" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill="url(#sawtooth-marquee-pattern)" />
    </svg>
  </div>
</div>

<style>
  @keyframes sawtooth-marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-24px);
    }
  }
</style>
