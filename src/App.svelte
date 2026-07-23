<script>
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
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
</script>

<Header />

<main class="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
  <Hero />
  <hr class="border-primary border-t-2 mb-24" />
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
