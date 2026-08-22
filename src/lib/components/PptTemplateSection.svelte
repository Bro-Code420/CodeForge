<script>
  import { pptTemplateData } from '../data/gazetteData.js';

  let isHovered = false;
  let copied = false;

  let cipherText = pptTemplateData.cipherTag || "PPT_TEMPLATE_FORMAT_V2.0_STANDARDIZED";
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
          if (char === "_" || char === " " || char === ".") return char;
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

  function copyTemplateLink() {
    navigator.clipboard.writeText(pptTemplateData.downloadUrl);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2500);
  }
</script>

<section class="mb-24 select-none" id="ppt-template">
  <!-- Header Title (Full UI Space) -->
  <div
    class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t-2 border-b-2 border-primary py-4 mb-10 text-center bg-primary/5"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <h3
        class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1"
      >
        {pptTemplateData.sectionRef}
      </h3>
      <p
        class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto"
      >
        {pptTemplateData.subtitle}
      </p>
    </div>
  </div>

  <!-- Main Editorial Box -->
  <div
    class="border-2 border-primary p-8 md:p-12 bg-[#F6F1E8] paper-texture shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Official Presentation Template Download"
  >
    <!-- Decorative Corner Ornaments -->
    <div class="absolute top-2 left-2 font-mono text-xs opacity-40">
      § SPECIFICATION
    </div>
    <div class="absolute top-2 right-2 font-mono text-xs opacity-40">
      REF: {pptTemplateData.docRef}
    </div>

    <!-- Vintage Slide Projector / Presentation SVG Icon -->
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
        <!-- Stand / Tripod -->
        <line x1="50" y1="68" x2="50" y2="86" stroke-width="3" stroke-linecap="round" />
        <line x1="50" y1="86" x2="32" y2="94" stroke-width="2.5" stroke-linecap="round" />
        <line x1="50" y1="86" x2="68" y2="94" stroke-width="2.5" stroke-linecap="round" />

        <!-- Screen Roller Frame -->
        <rect
          x="16"
          y="18"
          width="68"
          height="50"
          rx="2"
          fill="#F6F1E8"
          stroke-width="3.5"
        />
        <rect
          x="20"
          y="22"
          width="60"
          height="42"
          rx="1"
          stroke-width="1"
          stroke-dasharray="2 2"
        />

        <!-- Slide Content: Header Bar & Layout lines -->
        <rect x="25" y="27" width="22" height="4" fill="currentColor" opacity="0.8" />
        <line x1="25" y1="36" x2="52" y2="36" stroke-width="1.5" />
        <line x1="25" y1="41" x2="48" y2="41" stroke-width="1.5" />
        <line x1="25" y1="46" x2="44" y2="46" stroke-width="1.5" />

        <!-- Mini Architecture Diagram Mockup inside Slide -->
        <rect x="58" y="32" width="16" height="12" fill="#FAF6EE" stroke-width="1.5" />
        <line x1="66" y1="44" x2="66" y2="52" stroke-width="1.5" stroke-linecap="round" />
        <rect x="54" y="52" width="24" height="6" fill="#FAF6EE" stroke-width="1.5" />

        <!-- Top Mount Loop -->
        <circle cx="50" cy="14" r="3" stroke-width="2" />
        <line x1="50" y1="17" x2="50" y2="18" stroke-width="2" />
      </svg>
    </div>

    <!-- Dispatch Content -->
    <h4
      class="font-headline font-black uppercase text-xl md:text-2xl mb-2 leading-snug tracking-tight text-primary"
    >
      {pptTemplateData.title}
    </h4>

    <!-- Animated Cipher Stream Badge -->
    <div
      class="font-mono text-xs text-burgundy font-bold bg-burgundy/5 px-3 py-1 border border-burgundy/20 mb-4 rounded-sm"
    >
      {displayCipher}
    </div>

    <p
      class="font-serif-alt text-sm md:text-base leading-relaxed text-primary/95 max-w-2xl mb-8"
    >
      {pptTemplateData.description}
    </p>

    <!-- Download Action Button -->
    <div class="flex items-center justify-center relative z-10">
      <!-- Primary Download Button -->
      <div class="relative group/btn">
        <div
          class="absolute inset-0 bg-primary/20 translate-x-1 translate-y-1 rounded-sm"
        ></div>

        <a
          href={pptTemplateData.downloadUrl}
          download="CodeForge_PPT_Template.pptx"
          class="relative bg-primary text-[#F6F1E8] hover:bg-primary/90 px-6 py-3.5 font-mono text-xs md:text-sm font-black uppercase border-2 border-primary flex items-center gap-2.5 transition-all transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <span class="material-symbols-outlined text-base">download</span>
          DOWNLOAD PPT TEMPLATE (.PPTX)
        </a>
      </div>
    </div>

    <!-- Status Subtitle / Directive -->
    <p
      class="font-mono text-[10px] font-bold mt-6 uppercase opacity-70 tracking-wider"
    >
      ★ ROUND 1 COMMENCES AT 12:00 PM SHARP • AUDITED BY BOARD OF INQUIRY ★
    </p>
  </div>
</section>
