<script>
  import { contactDetails } from '../data/gazetteData.js';

  let registered = false;

  function handleRegister() {
    registered = true;
  }
</script>

<section class="text-center py-20 bg-primary/5 border-t-4 border-b-4 border-double border-primary" id="registry">
  <h2 class="font-headline text-5xl md:text-7xl font-black uppercase mb-8">
    THE PRESS IS READY. ARE YOU?
  </h2>
  <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
    {#if !registered}
      <button
        on:click={handleRegister}
        class="bg-burgundy text-background px-16 py-6 font-mono text-lg font-bold uppercase border-2 border-primary hover:bg-transparent hover:text-primary transition-all hover:cursor-pointer"
      >
        SECURE STATION
      </button>
    {:else}
      <div class="bg-primary text-background px-12 py-6 font-mono text-lg font-bold uppercase border-2 border-primary">
        ✓ STATION RESERVED — DISPATCH ACKNOWLEDGED
      </div>
    {/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-[10px] uppercase opacity-70 border-t border-primary/20 pt-12">
    <div>
      <p class="font-bold text-primary mb-2">Host Institution</p>
      <p>{contactDetails.hostInstitution}</p>
    </div>
    <div>
      <p class="font-bold text-primary mb-2">Department</p>
      <p>{contactDetails.department}</p>
    </div>
    <div>
      <p class="font-bold text-primary mb-2">Editorial Crew</p>
      <p>{contactDetails.editorialCrew}</p>
    </div>
  </div>
</section>
