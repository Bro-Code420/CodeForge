<script>
  import { contactDetails } from '../data/gazetteData.js';
</script>

<section class="mt-12 border-t-2 border-primary pt-12" id="contact">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
    <!-- Left Side: CONTACT & INFORMATION -->
    <div class="border-2 border-primary p-6 md:p-8 bg-white/90 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h4 class="font-headline text-2xl md:text-3xl font-black uppercase mb-6 border-b-2 border-primary pb-3 tracking-tight">
          {contactDetails.title}
        </h4>
        
        <div class="font-mono text-xs md:text-sm space-y-5">
          <div>
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Venue & Address:</p>
            <p class="font-bold text-sm leading-snug">{contactDetails.venue}</p>
            <p class="opacity-80 text-xs mt-1 leading-relaxed">{contactDetails.address}</p>
          </div>

          <div class="border-t border-dotted border-primary/40 pt-4">
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Faculty Coordinator:</p>
            <p class="font-bold text-sm">{contactDetails.facultyCoordName}</p>
            <p class="opacity-80 text-xs mt-0.5">📞 Phone: {contactDetails.facultyCoordPhone}</p>
          </div>

          <div class="border-t border-dotted border-primary/40 pt-4">
            <p class="font-bold text-primary uppercase text-[11px] tracking-wider mb-1">Student Coordinator:</p>
            <p class="font-bold text-sm">{contactDetails.studentCoordName}</p>
            <p class="opacity-80 text-xs mt-0.5">📞 Phone: {contactDetails.studentCoordPhone}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: CAMPUS NAVIGATION MAP -->
    <div class="border-2 border-primary bg-primary text-background p-6 md:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-background/30 pb-3 mb-4 gap-3 font-mono">
          <div>
            <h5 class="font-headline text-lg md:text-xl font-black uppercase tracking-tight text-background flex items-center gap-2">
              <span>CAMPUS NAVIGATION MAP</span>
            </h5>
            <p class="text-[11px] md:text-xs opacity-80 mt-0.5 text-background/80">
              {contactDetails.address}
            </p>
          </div>
          <a 
            href="https://maps.google.com/?q=G+H+Raisoni+College+of+Engineering+and+Management+Shradha+Park+Wadi+Link+Road+MIDC+Hingna+Nagpur" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bg-background text-primary px-3 py-1.5 text-xs font-bold font-mono uppercase border border-background hover:bg-burgundy hover:text-background transition-all shrink-0 inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>GET DIRECTIONS</span> ↗
          </a>
        </div>
      </div>

      <!-- Embedded Google Map Frame -->
      <div class="w-full flex-grow min-h-[260px] border-2 border-background/40 relative overflow-hidden bg-black shadow-inner">
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
  </div>
</section>

