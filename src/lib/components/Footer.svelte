<script>
  import TriangleMarquee from './TriangleMarquee.svelte';
</script>

<footer class="bg-[#FAF6EE] pt-8 pb-8 mt-6 border-t-8 border-double border-primary select-none w-full">
  <!-- Top Geometric Border Pattern (Full UI Width Edge-to-Edge) -->
  <TriangleMarquee className="w-full mb-6 opacity-80" speed="1s" reverse={true} />

  <div class="w-full px-4 md:px-8 flex flex-col items-center text-center">
    <!-- Newspaper Logo Head -->
    <h5 class="font-masthead text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-primary w-full">
      CODE FORGE 2026
    </h5>
    
    <!-- 2-Column Editorial Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-6 font-mono text-xs uppercase tracking-widest border-t-2 border-b-2 border-primary py-6">
      <!-- Affiliations -->
      <div class="flex flex-col items-center border-b md:border-b-0 md:border-r border-primary/30 pb-6 md:pb-0">
        <p class="font-bold text-sm mb-4 underline decoration-double decoration-primary decoration-2 underline-offset-8 text-primary">
          Affiliations
        </p>
        <ul class="space-y-2 text-primary/80 font-bold text-[11px]">
          <li>G.H. RAISONI COLLEGE</li>
          <li>SCIENCE & TECHNOLOGY DEPT.</li>
          <li>NAGPUR INNOVATION HUB</li>
        </ul>
      </div>
      
      <!-- Social Media Connections -->
      <div class="flex flex-col items-center pt-2 md:pt-0">
        <p class="font-bold text-sm mb-4 underline decoration-double decoration-primary decoration-2 underline-offset-8 text-primary">
          Social Media
        </p>
        <div class="flex flex-col items-center gap-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background font-bold tracking-widest transition-all rounded-sm group shadow-[2px_2px_0px_0px_rgba(43,43,42,1)]"
            title="Follow us on Instagram"
          >
            <svg class="w-4 h-4 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>INSTAGRAM</span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Redesigned Editorial Colophon Badge Certificate -->
    <div class="w-full border-4 border-double border-primary p-6 bg-[#FAF6EE] text-primary shadow-[4px_4px_0px_rgba(43,43,42,0.15)] rounded-sm my-2 font-mono relative">
      <!-- Vintage Corner Ornaments -->
      <div class="absolute top-2 left-2 text-[10px] opacity-40">❖ CERTIFIED</div>
      <div class="absolute top-2 right-2 text-[10px] opacity-40">PRESS NO. 901</div>
      
      <p class="text-[11px] md:text-xs font-bold uppercase tracking-widest mb-3 border-b border-primary/40 pb-2 mt-1">
        VOL. I // ISSUE NO. 01 // 21 AUGUST 2026 // NAGPUR, INDIA
      </p>

      <div class="flex flex-col items-center gap-3 my-4">
        <span class="text-[11px] font-bold tracking-widest text-primary/75">© 2026 CODE FORGE PRESS • DESIGNED & DEVELOPED BY</span>
        
        <div class="flex flex-wrap items-center justify-center gap-3">
          <!-- Devansh LinkedIn Button -->
          <a 
            href="https://www.linkedin.com/in/devansh-thaware/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-background font-bold tracking-wider hover:bg-burgundy hover:text-white transition-all shadow-md rounded-sm group hover:-translate-y-0.5 border border-primary"
          >
            <svg class="w-4 h-4 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            DEVANSH THAWARE
          </a>
        </div>
      </div>

      <!-- Footer Motto -->
      <p class="text-[10px] uppercase tracking-widest text-primary font-bold border-t border-primary/40 pt-3 mt-3">
        ★ PRINTED IN THE TERMINAL. NO ELECTRONS WERE HARMED IN THE MAKING OF THIS MANIFESTO. ★
      </p>
    </div>
  </div>
</footer>
