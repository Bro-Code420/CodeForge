
<script>
  // Code Forge 2026 Gazette Release Build
  import Preloader from './lib/components/Preloader.svelte';
  import Header from './lib/components/Header.svelte';
  import EditorialVision from './lib/components/EditorialVision.svelte';
  import SpecialReport from './lib/components/SpecialReport.svelte';
  import ValueAndHighlights from './lib/components/ValueAndHighlights.svelte';
  import JudgingCriteria from './lib/components/JudgingCriteria.svelte';
  import ScheduleSection from './lib/components/ScheduleSection.svelte';

  import ScrollVelocity from './lib/components/ScrollVelocity.svelte';
  import ProblemStatements from './lib/components/ProblemStatements.svelte';
  import PptTemplateSection from './lib/components/PptTemplateSection.svelte';
  import ContactSection from './lib/components/ContactSection.svelte';
  import Footer from './lib/components/Footer.svelte';
  import SpotlightTorch from './lib/components/SpotlightTorch.svelte';
  import DesktopNoticeModal from './lib/components/DesktopNoticeModal.svelte';
  import { TORCH_DISABLED } from './lib/config.js';

  let showPreloader = true;
  let isAppRevealing = false;
  let showDesktopNotice = false;

  // Torch system toggle — controlled via src/lib/config.js (committed to git)
  const isTorchDisabled = TORCH_DISABLED;

  function isMobileDevice() {
    if (typeof window === 'undefined') return false;
    return (
      window.innerWidth < 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }
</script>

{#if !isTorchDisabled}
  <SpotlightTorch />
{/if}
{#if !isTorchDisabled}
  <DesktopNoticeModal isOpen={showDesktopNotice} on:close={() => (showDesktopNotice = false)} />
{/if}

{#if showPreloader}
  <Preloader
    on:engageStart={() => (isAppRevealing = true)}
    on:complete={() => {
      showPreloader = false;
      isAppRevealing = true;
      // Triggers advisory modal ONLY on mobile devices after preloader loading finishes
      // Skipped entirely when VITE_DISABLE_TORCH=true (torch system disabled)
      if (!isTorchDisabled) {
        setTimeout(() => {
          if (isMobileDevice()) {
            showDesktopNotice = true;
          }
        }, 400);
      }
    }}
  />
{/if}

<div class="w-full min-h-screen flex flex-col overflow-x-hidden transition-all duration-1000 ease-out origin-center {isAppRevealing ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-90'}">
  <Header />

  <main class="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-2">
    <EditorialVision />
    <ValueAndHighlights />
  </main>

  <!-- React Bits ScrollVelocity Marquee Component (Full UI Space) -->
  <ScrollVelocity
    texts={[
      'CODE FORGE 2026 ✦ THE EDITORIAL GAZETTE',
      'INNOVATION IN MOTION ✦ BUILD FOR IMPACT'
    ]}
    velocity={90}
    className="font-headline text-primary font-black uppercase tracking-wider distressed-text"
  />

  <div class="w-full max-w-7xl mx-auto px-6 md:px-12 pb-2">
    <SpecialReport />
    <JudgingCriteria />
    <ScheduleSection />
    <ProblemStatements />
    <PptTemplateSection />
    <ContactSection />
  </div>

  <Footer />
</div>
