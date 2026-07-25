<script>
  let isHovered = false;
  let cipherText = "ENCRYPTED_SHA256_FORGE_2026_DECRYPT_STATUS_LOCKED";

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$@!";
  let displayCipher = cipherText;
  let interval;

  function handleMouseEnter() {
    isHovered = true;
    let iteration = 0;
    clearInterval(interval);
    
    interval = setInterval(() => {
      displayCipher = cipherText
        .split("")
        .map((char, index) => {
          if (char === "_" || char === " ") return char;
          if (index < iteration) {
            return cipherText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= cipherText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  }

  function handleMouseLeave() {
    isHovered = false;
    clearInterval(interval);
    displayCipher = cipherText;
  }
</script>

<section class="mb-24 select-none" id="problem-statements">
  <!-- Header Title -->
  <div class="border-t-2 border-b-2 border-primary py-3 mb-10 text-center bg-primary/5">
    <h3 class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1">
      OFFICIAL DISPATCH: PROBLEM STATEMENTS
    </h3>
    <p class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto">
      Subject to release exactly 24 hours prior to coding commencement.
    </p>
  </div>

  <!-- Locked Content Box -->
  <div 
    class="border-2 border-primary p-8 md:p-12 bg-[#F6F1E8] paper-texture shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Problem Statements Encryption Protocol"
  >
    <!-- Decorative Corner Ornaments -->
    <div class="absolute top-2 left-2 font-mono text-xs opacity-40">§ SECURE</div>
    <div class="absolute top-2 right-2 font-mono text-xs opacity-40">REF: FORGE-LOCKED</div>
    
    <!-- Hand-drawn Vintage Style SVG Padlock -->
    <div class="mb-6 relative group-hover:scale-105 transition-transform duration-300">
      <svg viewBox="0 0 100 100" class="w-24 h-24 text-primary opacity-90 filter drop-shadow" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Shackle (the loop) -->
        <path d="M32 46 V32 Q32 18 50 18 Q68 18 68 32 V46" stroke-width="4.5" stroke-linecap="round" class="group-hover:-translate-y-1 transition-transform duration-300" />
        <!-- Shackle shadow shading -->
        <path d="M38 46 V32 Q38 24 50 24" stroke-width="1.5" stroke-dasharray="1 1" />
        <!-- Lock Body -->
        <rect x="22" y="44" width="56" height="42" rx="6" fill="#F6F1E8" stroke-width="3.5" />
        <!-- Inner border line -->
        <rect x="26" y="48" width="48" height="34" rx="4" stroke-width="1" stroke-dasharray="2 2" />
        <!-- Keyhole details -->
        <circle cx="50" cy="60" r="5" fill="currentColor" class="group-hover:fill-burgundy transition-colors" />
        <path d="M47 63 H53 L55 76 H45 Z" fill="currentColor" class="group-hover:fill-burgundy transition-colors" />
        <!-- Diagonal sketch lines on body corners -->
        <line x1="28" y1="52" x2="34" y2="52" stroke="currentColor" stroke-width="1" />
        <line x1="28" y1="78" x2="34" y2="78" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>

    <!-- Dispatch Content -->
    <h4 class="font-headline font-black uppercase text-xl md:text-2xl mb-2 leading-snug tracking-tight text-primary">
      TRANSMISSION DECRYPTION PENDING
    </h4>

    <!-- Animated Cipher Stream Badge -->
    <div class="font-mono text-xs text-burgundy font-bold bg-burgundy/5 px-3 py-1 border border-burgundy/20 mb-4 rounded-sm">
      {displayCipher}
    </div>
    
    <p class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95 max-w-2xl mb-8">
      The official problem statements are sealed under cryptographic security protocols. In accordance with event standards, they will be decrypted and made available for public download precisely 24 hours before the hackathon begins.
    </p>

    <!-- Locked Download Button -->
    <div class="relative group/btn">
      <!-- Background shadow blocks for vintage look -->
      <div class="absolute inset-0 bg-primary/20 translate-x-1 translate-y-1 rounded-sm"></div>
      
      <button 
        disabled
        class="relative bg-[#d3cbbd] text-primary/60 px-6 py-4 font-mono text-xs md:text-sm font-black uppercase border-2 border-primary/40 cursor-not-allowed flex items-center gap-3 transition-colors"
        title="Decrypting 24 hours prior to launch"
      >
        <span class="material-symbols-outlined text-base animate-pulse">lock</span>
        DOWNLOAD PROBLEM STATEMENTS (ENCRYPTED)
      </button>
    </div>

    <!-- Time Release Status -->
    <p class="font-mono text-[10px] font-bold mt-6 uppercase opacity-70 tracking-wider">
      ★ DECRYPTION KEY DISPATCH: AUGUST 20, 2026 // 10:00 AM ★
    </p>
  </div>
</section>

