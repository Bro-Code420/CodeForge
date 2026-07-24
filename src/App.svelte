<script>
  import Preloader from './lib/components/Preloader.svelte';
  import Header from './lib/components/Header.svelte';
  import EditorialVision from './lib/components/EditorialVision.svelte';
  import SpecialReport from './lib/components/SpecialReport.svelte';
  import IndustryVerticals from './lib/components/IndustryVerticals.svelte';
  import ValueAndHighlights from './lib/components/ValueAndHighlights.svelte';
  import GrantsAllocation from './lib/components/GrantsAllocation.svelte';
  import JudgingCriteria from './lib/components/JudgingCriteria.svelte';
  import Timeline from './lib/components/Timeline.svelte';
  import CodeOfConduct from './lib/components/CodeOfConduct.svelte';
  import FaqSection from './lib/components/FaqSection.svelte';
  import RegistrySection from './lib/components/RegistrySection.svelte';
  import ContactSection from './lib/components/ContactSection.svelte';
  import Footer from './lib/components/Footer.svelte';

  let showPreloader = true;
  let isAppRevealing = false;
</script>

{#if showPreloader}
  <Preloader
    on:engageStart={() => (isAppRevealing = true)}
    on:complete={() => {
      showPreloader = false;
      isAppRevealing = true;
    }}
  />
{/if}

<div class="w-full min-h-screen flex flex-col transition-all duration-1000 ease-out origin-center {isAppRevealing ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-90'}">
  <Header />

  <main class="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
    <EditorialVision />
    <SpecialReport />
    <IndustryVerticals />
    <ValueAndHighlights />
    <GrantsAllocation />
    <JudgingCriteria />
    <Timeline />
    <CodeOfConduct />
    <FaqSection />
    <RegistrySection />
    <ContactSection />
  </main>

  <Footer />
</div>
