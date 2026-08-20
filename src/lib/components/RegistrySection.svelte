<script>
  import { contactDetails } from '../data/gazetteData.js';
</script>

<section class="text-center py-20 bg-primary/5 border-t-4 border-b-4 border-double border-primary" id="registry">
  <h2 class="font-headline text-5xl md:text-7xl font-black uppercase mb-6">
    READY TO BUILD THE FUTURE?
  </h2>

  <p class="font-body text-base md:text-lg max-w-3xl mx-auto mb-8 opacity-90 leading-relaxed px-4">
    Registrations for CODE FORGE 2026 are now open. Form a team of 2–4 members, compete for a ₹25,000 Prize Pool, and showcase your innovation, technical skills, and creativity in an exciting one-day hackathon.
  </p>

  <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScIqUcQI_jO5ibbkqkskaU0V4VvyHvb1WGR0U_l6GuKS8tXEg/viewform?usp=publish-editor"
      target="_blank"
      rel="noopener noreferrer"
      class="bg-burgundy text-background px-16 py-6 font-mono text-lg font-bold uppercase border-2 border-primary hover:bg-transparent hover:text-primary transition-all hover:cursor-pointer inline-block text-center"
    >
      REGISTER NOW
    </a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-[10px] uppercase opacity-70 border-t border-primary/20 pt-12">
    <div>
      <p class="font-bold text-primary mb-2">Host Institution</p>
      <p>{contactDetails.hostInstitution}</p>
    </div>
    <div>
      <p class="font-bold text-primary mb-2">Organizing Department</p>
      <p>{contactDetails.department}</p>
    </div>
    <div>
      <p class="font-bold text-primary mb-2">Organized By</p>
      <p>{contactDetails.editorialCrew}</p>
    </div>
  </div>
</section>
