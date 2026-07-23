<script>
  import { contactDetails } from '../data/gazetteData.js';

  let dispatchSent = false;
  let showModal = false;
  let message = "";

  function sendDispatch() {
    if (message.trim()) {
      dispatchSent = true;
      showModal = false;
      message = "";
    }
  }
</script>

<section class="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-primary pt-12">
  <div>
    <h4 class="font-headline text-2xl font-bold uppercase mb-6 italic">Editorial Office</h4>
    <div class="font-mono text-xs space-y-4">
      <p><strong class="text-primary">Venue:</strong> {contactDetails.venue}</p>
      <p><strong class="text-primary">Faculty Coord:</strong> {contactDetails.facultyCoord}</p>
      <p><strong class="text-primary">Student Coord:</strong> {contactDetails.studentCoord}</p>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center p-8 bg-white border border-primary">
    <span class="material-symbols-outlined text-6xl mb-4">mail</span>
    <p class="font-mono text-[10px] uppercase text-center mb-4">
      All official inquiries should be directed to the registrar's office via the digital portal.
    </p>

    {#if dispatchSent}
      <div class="font-mono text-xs font-bold text-burgundy uppercase">
        ✓ Dispatch Received by Editorial Staff
      </div>
    {:else}
      <button
        on:click={() => (showModal = true)}
        class="font-mono text-xs font-bold underline uppercase hover:text-burgundy transition-colors hover:cursor-pointer"
      >
        Send Dispatch
      </button>
    {/if}
  </div>
</section>

{#if showModal}
  <div class="fixed inset-0 bg-primary/80 flex items-center justify-center p-4 z-50">
    <div class="bg-background border-2 border-primary p-8 max-w-lg w-full font-mono">
      <div class="flex justify-between items-center mb-6 border-b border-primary pb-2">
        <h4 class="font-bold text-sm uppercase">TRANSMIT DISPATCH TO EDITORIAL OFFICE</h4>
        <button on:click={() => (showModal = false)} class="font-bold hover:text-burgundy">✕</button>
      </div>

      <textarea
        bind:value={message}
        placeholder="Type your inquiry or message here..."
        class="w-full h-32 p-3 bg-white border border-primary text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary mb-4"
      ></textarea>

      <div class="flex justify-end gap-4">
        <button
          on:click={() => (showModal = false)}
          class="px-4 py-2 border border-primary text-xs uppercase font-bold hover:bg-primary/10"
        >
          Cancel
        </button>
        <button
          on:click={sendDispatch}
          class="px-6 py-2 bg-primary text-background text-xs uppercase font-bold hover:bg-burgundy transition-colors"
        >
          Transmit
        </button>
      </div>
    </div>
  </div>
{/if}
