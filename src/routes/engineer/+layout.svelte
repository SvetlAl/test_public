<!-- src/routes/(engineer)/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import { goto, afterNavigate } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  import Toolbar from '$lib/engineer/toolbar.svelte';
  import BottomNav from '$lib/engineer/bottom-nav.svelte';

  let { children }: { children: Snippet } = $props();

  // ───────────────────────────────────────────────
  // Tool/Navi bars Height
  // ───────────────────────────────────────────────
  export const toolbarHeight = writable<number>(0);
  export const navibarHeight = writable<number>(0);

  setContext('toolbarHeight', toolbarHeight);
  setContext('navibarHeight', navibarHeight);

  // ───────────────────────────────────────────────
  // Resize handler
  // ───────────────────────────────────────────────
  function handleToolbarHeight(e: CustomEvent<{ height: number }>) {
    const h = e.detail.height;
    console.log('[Layout] Toolbar height received:', h);
    if (h > 0) toolbarHeight.set(h);
  }

  function handleNavibarHeight(e: CustomEvent<{ height: number }>) {
    const h = e.detail.height;
    console.log('[Layout] Navibar height received:', h);
    if (h > 0) navibarHeight.set(h);
  }

  // ───────────────────────────────────────────────
  // Toolbar states
  // ───────────────────────────────────────────────
  let inSettings = $derived(
    page.url.pathname === '/engineer/settings/settings' ||
    page.url.pathname === '/engineer/settings/user_profile' ||
    page.url.pathname === '/engineer/settings/view' ||
    page.url.pathname === '/engineer/settings/language' ||
    page.url.pathname === '/engineer/settings/debug' ||
    page.url.pathname === '/engineer/settings/help' ||
    page.url.pathname === '/engineer/settings/about'
  );

  const hideBottomNav = $derived(inSettings);

  let drawerOpen   = $state(false);
  let previousPath = $state('/engineer/base/main');
  let activeTab    = $state('main');

  // ───────────────────────────────────────────────
  // Navigation logic
  // ───────────────────────────────────────────────
  afterNavigate(({ from }) => {
    if (
      from?.url?.pathname &&
      !inSettings &&
      from.url.pathname !== '/engineer/settings/language'
    ) {
      previousPath = from.url.pathname;
    }
    drawerOpen = false;
  });

  function toggleDrawer() {
    if (inSettings || drawerOpen) {
      drawerOpen = false;
      if (inSettings) goBackFromSettings();
    } else {
      drawerOpen = true;
    }
  }

  function goBackFromSettings() {
    if (previousPath === '/engineer/settings/language') {
      goto('/engineer/base/main');
    } else if (previousPath && previousPath !== '/') {
      goto(previousPath);
    } else {
      goto('/engineer/base/main');
    }
  }

  function goToSettings()     { drawerOpen = false; goto('/engineer/settings/settings');     }
  function goToUserProfile()  { drawerOpen = false; goto('/engineer/settings/user_profile');  }
  function goToView()         { drawerOpen = false; goto('/engineer/settings/view');         }
  function goToLanguage()     { drawerOpen = false; goto('/engineer/settings/language');     }
  function goToDebug()        { drawerOpen = false; goto('/engineer/settings/debug');        }
  function goToHelp()         { drawerOpen = false; goto('/engineer/settings/help');         }
  function goToAbout()        { drawerOpen = false; goto('/engineer/settings/about');        }
</script>

<div class="app-layout">
  <!-- Toolbar -->
  <Toolbar
    drawerOpen={drawerOpen}
    inSettings={inSettings}
    onToggle={toggleDrawer}
    onGoToSettings={goToSettings}
    onGoToUserProfile={goToUserProfile}
    onGoToView={goToView}
    onGoToLanguage={goToLanguage}
    onGoToDebug={goToDebug}
    onGoToHelp={goToHelp}
    onGoToAbout={goToAbout}
    onGoBack={goBackFromSettings}
    on:heightchange={handleToolbarHeight}
  />

  <!-- Основной контент -->
  <main class="page-content">
    {@render children()}
  </main>

  <!-- BottomNav — только если не скрыт -->
  {#if !hideBottomNav}
    <BottomNav on:heightchange={handleNavibarHeight} />
  {:else}
    <!-- Если скрыт — обнуляем высоту навбара -->
    {@const _ = navibarHeight.set(0)}
  {/if}
</div>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background: #0d1425;
    background: url('/engineer/engineer_background.png') center / cover no-repeat;
  }

  .app-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .page-content {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    background: inherit;
  }
</style>