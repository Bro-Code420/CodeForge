<script>
  import { contactDetails } from '../data/gazetteData.js';

  let messageSent = false;
  let showModal = false;
  let message = "";
  let senderEmail = "";

  function sendMessage() {
    if (message.trim()) {
      messageSent = true;
      showModal = false;
      message = "";
    }
  }
</script>

<section class="mt-12 border-t-2 border-primary pt-12 space-y-8" id="contact">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
    <!-- Left Side: CONTACT & INFORMATION -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between">
      <div>
        <h4 class="font-headline text-2xl md:text-3xl font-black uppercase mb-6 border-b-2 border-primary pb-3 tracking-tight">
          {contactDetails.title}
        </h4>
        
        <div class="font-mono text-xs md:text-sm space-y-4">
          <div>
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Venue & Address:</p>
            <p class="font-bold text-sm leading-snug">{contactDetails.venue}</p>
            <p class="opacity-80 text-xs mt-1 leading-relaxed">{contactDetails.address}</p>
          </div>

          <div class="border-t border-dotted border-primary/40 pt-3">
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Faculty Coordinator:</p>
            <p class="font-bold text-sm">{contactDetails.facultyCoordName}</p>
            <p class="opacity-80 text-xs mt-0.5">📞 Phone: {contactDetails.facultyCoordPhone}</p>
          </div>

          <div class="border-t border-dotted border-primary/40 pt-3">
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Student Coordinator:</p>
            <p class="font-bold text-sm">{contactDetails.studentCoordName}</p>
            <p class="opacity-80 text-xs mt-0.5">📞 Phone: {contactDetails.studentCoordPhone}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: OFFICIAL HELP DESK -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between items-center text-center">
      <div class="w-full">
        <div class="flex justify-center mb-4">
          <span class="material-symbols-outlined text-5xl p-3 bg-primary text-background">mail</span>
        </div>

        <h4 class="font-headline text-2xl md:text-3xl font-black uppercase mb-4 tracking-tight">
          {contactDetails.helpDeskTitle}
        </h4>

        <p class="font-body text-xs md:text-sm leading-relaxed opacity-90 max-w-md mx-auto mb-6">
          {contactDetails.helpDeskDesc}
        </p>
      </div>

      <div class="w-full pt-4 border-t border-primary/30">
        {#if messageSent}
          <div class="font-mono text-xs md:text-sm font-bold text-burgundy uppercase p-3 bg-primary/5 border border-primary/30">
            ✓ Message Received by Organizing Staff
          </div>
        {:else}
          <button
            on:click={() => (showModal = true)}
            class="w-full py-4 bg-primary text-background font-mono text-sm font-bold uppercase tracking-wider border-2 border-primary hover:bg-burgundy transition-all hover:cursor-pointer shadow-sm"
          >
            {contactDetails.helpDeskButton}
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Interactive Google Map Section (Dark Black Theme) -->
  <div class="border-2 border-primary bg-primary text-background p-4 md:p-6 shadow-sm">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-background/30 pb-3 mb-4 gap-3 font-mono">
      <div>
        <h5 class="font-headline text-lg md:text-xl font-black uppercase tracking-tight text-background flex items-center gap-2">
          <span> CAMPUS NAVIGATION MAP</span>
        </h5>
        <p class="text-[11px] md:text-xs opacity-80 mt-0.5 text-background/80">
          {contactDetails.address}
        </p>
      </div>
      <a 
        href="https://maps.google.com/?q=G+H+Raisoni+College+of+Engineering+and+Management+Shradha+Park+Wadi+Link+Road+MIDC+Hingna+Nagpur" 
        target="_blank" 
        rel="noopener noreferrer"
        class="bg-background text-primary px-4 py-2 text-xs font-bold font-mono uppercase border border-background hover:bg-burgundy hover:text-background transition-all shrink-0 inline-flex items-center gap-1.5 shadow-sm"
      >
        <span>GET DIRECTIONS</span> ↗
      </a>
    </div>

    <!-- Responsive Embedded Google Map Frame with Dark Theme Filter -->
    <div class="w-full h-[350px] md:h-[420px] border-2 border-background/40 relative overflow-hidden bg-black shadow-inner">
      <iframe
        title="G H Raisoni College of Engineering and Management Google Map Location"
        width="100%"
        height="100%"
        style="border:0; filter: invert(90%) hue-rotate(180deg) contrast(120%) brightness(90%);"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=G+H+Raisoni+College+of+Engineering+and+Management,+Shradha+Park,+B-37-39/1,+Wadi+Link+Road,+MIDC,+Hingna,+Nagpur,+Maharashtra+441110&t=&z=15&ie=UTF8&iwloc=&output=embed"
      ></iframe>
    </div>
  </div>
</section>

{#if showModal}
  <div class="fixed inset-0 bg-primary/80 flex items-center justify-center p-4 z-50">
    <div class="bg-background border-2 border-primary p-8 max-w-lg w-full font-mono shadow-xl">
      <div class="flex justify-between items-center mb-6 border-b-2 border-primary pb-3">
        <h4 class="font-bold text-sm uppercase">OFFICIAL HELP DESK — SEND MESSAGE</h4>
        <button on:click={() => (showModal = false)} class="font-bold text-lg hover:text-burgundy">✕</button>
      </div>

      <div class="space-y-4 mb-6">
        <div>
          <label for="contact-input" class="block text-[11px] font-bold uppercase mb-1">Your Contact Email / Phone:</label>
          <input
            id="contact-input"
            type="text"
            bind:value={senderEmail}
            placeholder="e.g. participant@gmail.com or +91..."
            class="w-full p-2.5 bg-white border border-primary text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label for="message-input" class="block text-[11px] font-bold uppercase mb-1">Your Query / Message:</label>
          <textarea
            id="message-input"
            bind:value={message}
            placeholder="Send us your questions regarding registration, payments, event schedule, or technical support..."
            class="w-full h-32 p-3 bg-white border border-primary text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-4 border-t border-primary/30 pt-4">
        <button
          on:click={() => (showModal = false)}
          class="px-4 py-2 border border-primary text-xs uppercase font-bold hover:bg-primary/10"
        >
          Cancel
        </button>
        <button
          on:click={sendMessage}
          class="px-6 py-2 bg-primary text-background text-xs uppercase font-bold hover:bg-burgundy transition-colors"
        >
          Send Message
        </button>
      </div>
    </div>
  </div>
{/if}

