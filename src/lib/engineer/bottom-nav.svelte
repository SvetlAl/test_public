<!-- src/lib/engineer/bottom-nav.svelte -->

<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import * as m from '../../paraglide/messages.js';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher<{ heightchange: { height: number } }>();

  let navibarRef: HTMLElement | undefined = undefined;


  // ───────────────────────────────────────────────
  // Send Height to Parent
  // ───────────────────────────────────────────────
  function sendHeight() {
    if (!navibarRef) return;

    const height = navibarRef.offsetHeight || navibarRef.getBoundingClientRect().height || 0;

    if (height > 0) {
      dispatch('heightchange', { height });
      console.log('[Navibar] dispatched height:', height);
    }
  }

  onMount(() => {
    if (!navibarRef) return;
    sendHeight();

    const delays = [50, 150, 300, 500];
    delays.forEach(delay => setTimeout(sendHeight, delay));

    const ro = new ResizeObserver(sendHeight);
    ro.observe(navibarRef);

    return () => {
      ro.disconnect();
    };
  });

  // ───────────────────────────────────────────────
  // List of pages
  // ───────────────────────────────────────────────

  const pages = [
    { path: '/engineer/base/main',           labelFn: () => m.main_header_main(),           icon: '/engineer/Navi/Base_Main.png' },
    { path: '/engineer/base/device_modes',   labelFn: () => m.main_header_modes(),          icon: '/engineer/Navi/Base_Device_Modes.png' },
    { path: '/engineer/base/select_model',   labelFn: () => m.main_header_vehicle_model(),  icon: '/engineer/Navi/Base_SelectModel.png' },
    { path: '/engineer/base/cal_speedometer',labelFn: () => m.main_header_speedometer(),    icon: '/engineer/Navi/Base_AdjustSpeedMlt.png' },
    { path: '/engineer/base/cal_odometer',   labelFn: () => m.main_header_odometer(),       icon: '/engineer/Navi/Base_AdjustOdoMlt.png' },
    { path: '/engineer/base/cal_crs',        labelFn: () => m.main_header_cruise_control(), icon: '/engineer/Navi/Base_AdjustCruiseMlt.png' },
    { path: '/engineer/base/cal_tyres',      labelFn: () => m.main_header_tpms(),           icon: '/engineer/Navi/Base_AdjustTyresThreshold.png' },
  ] as const;

  let currentIndex = $derived(
    pages.findIndex(p => p.path === page.url.pathname)
  );

  let isFirst = $derived(currentIndex === 0);
  let isLast  = $derived(currentIndex === pages.length - 1);

  let prevPath = $derived(isFirst ? null : pages[currentIndex - 1]?.path ?? null);
  let nextPath = $derived(isLast  ? null : pages[currentIndex + 1]?.path ?? null);

  let currentLabel = $derived(
    currentIndex >= 0 && currentIndex < pages.length
      ? pages[currentIndex].labelFn()
      : 'Undefined page'
  );

  let currentPage = $derived({
    path: pages[currentIndex]?.path ?? pages[0].path,
    label: currentLabel,
    icon: pages[currentIndex]?.icon ?? pages[0].icon
  });

  function goPrev() {
    if (prevPath) goto(prevPath);
  }

  function goNext() {
    if (nextPath) goto(nextPath);
  }
</script>

<!-- Bottom-container -->
<div class="bottom-container"  bind:this={navibarRef} data-tauri-drag-region>
  <!-- Current page label -->
  <div class="header-title">
    {currentPage.label}
  </div><!-- Current page label -->

  <!-- Lower frame -->
  <div class="bottom-frame">
    <!-- Slot 1 -->
    <button
      class="nav-arrow left"
      onclick={goPrev}
    >
      <img src="/engineer/Navi/navi_aleft.png" alt="Prev" />
    </button><!-- Slot 1 -->

    <!-- Slot 2 -->
    {#if isFirst}
      <div class="nav-icon unavailable">
        <img src="/engineer/Navi/Unavailable.png" alt="Unavailable" />
      </div>
    {:else}
      <div class="nav-icon prev">
        <img src={pages[currentIndex - 1].icon} alt="Previous" />
      </div>
    {/if}<!-- Slot 2 -->
    
    <!-- Slot 3 -->
    <div class="nav-icon current">
      <img src={currentPage.icon} alt="Current" />
    </div><!-- Slot 3 -->

    <!-- Slot 4 -->
    {#if isLast}
      <div class="nav-icon unavailable">
        <img src="/engineer/Navi/Unavailable.png" alt="Unavailable" />
      </div>
    {:else}
      <div class="nav-icon next">
        <img src={pages[currentIndex + 1].icon} alt="Next" />
      </div>
    {/if}<!-- Slot 4 -->

   
    <button
      class="nav-arrow right"
      onclick={goNext}>
      <img src="/engineer/Navi/navi_aright.png" alt="Next" />
    </button><!-- Slot 5 -->
  </div><!-- Lower frame -->
</div><!-- Bottom-container -->

<style>
  .bottom-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    z-index: 200;

    /* Убираем ВСЁ, что задаёт фон */
    /* background-image: ... */          /* ← закомментировать или удалить */
    /* background-position: ... */
    /* background-size: ... */
    
  }

  .header-title {
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.35rem;
    font-weight: 600;
    text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    pointer-events: all;
  }

  .bottom-frame {
    flex: 1;
    border: 2px solid #a0b0c8;
    border-radius: 16px 16px 0 0;
    margin: 0 12px 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.6);
    pointer-events: all;
    z-index: 100;
    background: #0d506f;
  }

  .nav-arrow {
    width: 56px;
    height: 56px;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    touch-action: manipulation;
  }

  .nav-arrow img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.18s ease;
    opacity: 0.75;
    filter: none;
  }

  .nav-arrow:hover img {
    opacity: 0.75;
    transform: scale(1.20);
  }

  .nav-arrow:active img {
    opacity: 1.0;
    transform: scale(1.50);
  }

  .nav-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.18s ease;
    filter: brightness(0) invert(1);
  }

  .nav-icon.prev img,
  .nav-icon.next img,
  .nav-icon.unavailable img {
    opacity: 0.7;
  }

  .nav-icon.current {
    width: 72px;
    height: 72px;
    margin: -12px 0;
    z-index: 2;
  }

  .nav-icon.current img {
    opacity: 1;
  }

  .nav-icon.unavailable img {
    opacity: 0.4;
  }
</style>