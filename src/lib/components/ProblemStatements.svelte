<script>
  let isHovered = false;
  let cipherText = "FORGE_2026_DECRYPT_STATUS_UNLOCKED_OFFICIAL_RELEASE";

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
  <!-- Header Title (Full UI Space) -->
  <div
    class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t-2 border-b-2 border-primary py-4 mb-10 text-center bg-primary/5"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <h3
        class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1"
      >
        OFFICIAL DISPATCH: PROBLEM STATEMENTS
      </h3>
      <p
        class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto"
      >
        Officially decrypted and released for all registered participants.
      </p>
    </div>
  </div>

  <!-- Unlocked Content Box -->
  <div
    class="border-2 border-primary p-8 md:p-12 bg-[#F6F1E8] paper-texture shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Official Problem Statements Download"
  >
    <!-- Decorative Corner Ornaments -->
    <div class="absolute top-2 left-2 font-mono text-xs opacity-40">
      § OFFICIAL RELEASE
    </div>
    <div class="absolute top-2 right-2 font-mono text-xs opacity-40">
      REF: FORGE-UNLOCKED
    </div>

    <!-- Hand-drawn Vintage Style SVG Unlocked Padlock -->
    <div
      class="mb-6 relative group-hover:scale-105 transition-transform duration-300"
    >
      <svg
        viewBox="0 0 100 100"
        class="w-24 h-24 text-primary opacity-90 filter drop-shadow"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <!-- Shackle (Unlocked open position) -->
        <path
          d="M32 44 V26 Q32 12 50 12 Q68 12 68 26 V32"
          stroke-width="4.5"
          stroke-linecap="round"
          class="group-hover:-translate-y-1 transition-transform duration-300"
        />
        <!-- Shackle shadow shading -->
        <path
          d="M38 44 V26 Q38 18 50 18"
          stroke-width="1.5"
          stroke-dasharray="1 1"
        />
        <!-- Lock Body -->
        <rect
          x="22"
          y="44"
          width="56"
          height="42"
          rx="6"
          fill="#F6F1E8"
          stroke-width="3.5"
        />
        <!-- Inner border line -->
        <rect
          x="26"
          y="48"
          width="48"
          height="34"
          rx="4"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
        <!-- Keyhole details -->
        <circle
          cx="50"
          cy="60"
          r="5"
          fill="currentColor"
          class="group-hover:fill-burgundy transition-colors"
        />
        <path
          d="M47 63 H53 L55 76 H45 Z"
          fill="currentColor"
          class="group-hover:fill-burgundy transition-colors"
        />
        <!-- Diagonal sketch lines on body corners -->
        <line
          x1="28"
          y1="52"
          x2="34"
          y2="52"
          stroke="currentColor"
          stroke-width="1"
        />
        <line
          x1="28"
          y1="78"
          x2="34"
          y2="78"
          stroke="currentColor"
          stroke-width="1"
        />
      </svg>
    </div>

    <!-- Dispatch Content -->
    <h4
      class="font-headline font-black uppercase text-xl md:text-2xl mb-2 leading-snug tracking-tight text-primary"
    >
      TRANSMISSION DECRYPTED // OFFICIAL RELEASE
    </h4>

    <!-- Animated Cipher Stream Badge -->
    <div
      class="font-mono text-xs text-burgundy font-bold bg-burgundy/5 px-3 py-1 border border-burgundy/20 mb-4 rounded-sm max-w-full overflow-x-auto whitespace-nowrap"
    >
      {displayCipher}
    </div>

    <p
      class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95 max-w-2xl mb-8"
    >
      The official problem statements have been decrypted under cryptographic security
      protocols. Participants may now download the complete official problem statements
      dossier to review challenges, tracks, and requirements.
    </p>

    <!-- Active Download Button -->
    <div class="relative group/btn z-10">
      <!-- Background shadow blocks for vintage look -->
      <div
        class="absolute inset-0 bg-primary/20 translate-x-1 translate-y-1 rounded-sm"
      ></div>

      <a
        href="/Problem_Statements.pdf"
        download="Problem_Statements.pdf"
        class="relative bg-primary text-[#F6F1E8] hover:bg-primary/90 px-6 py-4 font-mono text-xs md:text-sm font-black uppercase border-2 border-primary flex items-center gap-3 transition-all transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shadow-sm"
        title="Download Problem Statements PDF"
      >
        <span class="material-symbols-outlined text-base">download</span>
        DOWNLOAD PROBLEM STATEMENTS (.PDF)
      </a>
    </div>

    <!-- Time Release Status -->
    <p
      class="font-mono text-[10px] font-bold mt-6 uppercase opacity-70 tracking-wider"
    >
      ★ OFFICIAL DISPATCH: AUGUST 22, 2026 // 10:00 PM • DECRYPTED & AUDITED ★
    </p>
  </div>
</section>

