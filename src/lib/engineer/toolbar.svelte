<!-- src/lib/engineer/toolbar.svelte -->
<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { createEventDispatcher, onMount } from 'svelte';

  import * as m from '../../paraglide/messages.js';
  import { getLocale } from '../../paraglide/runtime.js';

  const dispatch = createEventDispatcher<{ heightchange: { height: number } }>();

  let toolbarRef: HTMLElement | undefined = undefined;

  let {
    drawerOpen = false,
    inSettings = false,
    onToggle  = () => {},
    onGoToSettings = () => {},
    onGoToUserProfile = () => {},
    onGoToView = () => {},
    onGoToLanguage = () => {},
    onGoToDebug = () => {},
    onGoToHelp = () => {},
    onGoToAbout = () => {},
    onGoBack = () => {}
  } = $props<{
    drawerOpen?: boolean;
    inSettings?: boolean;
    onToggle?: () => void;
    onGoToSettings?: () => void;
    onGoToUserProfile?: () => void;
    onGoToView?: () => void;
    onGoToLanguage?: () => void;
    onGoToDebug?: () => void;
    onGoToHelp?: () => void;
    onGoToAbout?: () => void;
    onGoBack?: () => void;
  }>();

  // ───────────────────────────────────────────────
  // Send Height to Parent
  // ───────────────────────────────────────────────
  function sendHeight() {
    if (!toolbarRef) return;

    const height = toolbarRef.offsetHeight || toolbarRef.getBoundingClientRect().height || 0;

    if (height > 0) {
      dispatch('heightchange', { height });
      console.log('[Toolbar] dispatched height:', height);
    }
  }

  onMount(() => {
    if (!toolbarRef) return;

    sendHeight();

    const delays = [50, 150, 300, 500];
    delays.forEach(delay => setTimeout(sendHeight, delay));

    const ro = new ResizeObserver(sendHeight);
    ro.observe(toolbarRef);

    return () => {
      ro.disconnect();
    };
  });
</script>



<!-- Toolbar -->
<div class="toolbar" bind:this={toolbarRef} data-tauri-drag-region>
  <div class="toolbar-content">
    <button
      class="menu-btn"
      onclick={onToggle}
      aria-label={inSettings || drawerOpen ? 'Back' : 'Menu'}
    >
      {#if inSettings || drawerOpen}
        <img src="/engineer/navi_back.png" alt="Back" width="28" height="28" />
      {:else}
        <img src="/engineer/navi_hamburger.png" alt="Menu" width="28" height="28" />
      {/if}
    </button>

    <div class="title">
      {inSettings || drawerOpen ? 'Назад' : 'Меню'}
    </div>

    <div style="margin-left: auto;">
      <!-- кнопки справа -->
    </div>
  </div>
</div>

<!-- Drawer -->
{#if drawerOpen}
  <div class="drawer-overlay" transition:fade={{ duration: 200 }}>
    <div
      class="drawer"
      transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
    >
      <div class="drawer-top-border"></div>

      <div class="drawer-header">
        <h2>Menu</h2>
      </div>

      <nav class="drawer-nav">
        <button class="drawer-btn" onclick={onGoToSettings}>
          <img src="/engineer/drawer/DrawerItem_Settings.png" alt="Settings" />
          {m.settings_settings_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToUserProfile}>
          <img src="/engineer/drawer/DrawerItem_UserProfile.png" alt="UserProfile" />
          {m.settings_user_profile_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToView}>
          <img src="/engineer/drawer/DrawerItem_View.png" alt="View" />
          {m.settings_view_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToLanguage}>
          <img src="/engineer/drawer/DrawerItem_Language.png" alt="Language" />
          {m.settings_language_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToDebug}>
          <img src="/engineer/drawer/DrawerItem_Debug.png" alt="Debug" />
          {m.settings_debug_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToHelp}>
          <img src="/engineer/drawer/DrawerItem_Help.png" alt="Help" />
          {m.settings_help_header()}
        </button>

        <button class="drawer-btn" onclick={onGoToAbout}>
          <img src="/engineer/drawer/DrawerItem_About.png" alt="About" />
          {m.settings_about_header()}
        </button>
      </nav>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    width: 100%;
    height: clamp(45px, 5vh, 55px);
    background: linear-gradient(to bottom, rgb(4, 87, 139), rgb(3, 65, 105));
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    z-index: 1000;
    -webkit-app-region: drag;
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .toolbar-content {
    -webkit-app-region: no-drag;
    height: 100%;
    padding: 0 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .menu-btn {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background 0.15s;
    color: white;
  }

  .menu-btn:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  .menu-btn img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  .drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(240, 241, 250, 0.5);
  }

  .drawer {
    position: relative;
    width: 280px;
    max-width: 85vw;
    height: 100%;
    background: #e8ecf8;
    border-right: 1px solid #1e2a44;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
    color: rgb(2, 0, 14);
    overflow-y: auto;
  }

  .drawer-top-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #1e2a44;
    z-index: 2;
  }

  .drawer-header {
    padding: 62px 16px 12px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .drawer-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .drawer-nav {
    display: flex;
    flex-direction: column;
    padding: 4px 12px 16px;
  }

  .drawer-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.10);
    border: 2px solid transparent;
    border-radius: 12px;
    color: rgb(31, 31, 31);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 8px;
  }

  .drawer-btn:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .drawer-btn img {
    --icon-width: 32px;
    --icon-height: 24px;
    width: var(--icon-width);
    height: var(--icon-height);
    object-fit: contain;
    border-radius: 4px;
  }
</style>