<!-- src/routes/engineer/settings/language/+page.svelte -->

<script lang="ts">
  import * as m from '../../../../paraglide/messages.js';
  import { getLocale, setLocale } from '../../../../paraglide/runtime.js';

  let locale = $derived(getLocale());

  const iconSize = 64;

  function switchLanguage(lang: 'en' | 'ru') {
    setLocale(lang);
    localStorage.setItem('preferredLocale', lang);
  }
</script>

<div class="page-with-custom-header">

  <header class="custom-page-header">
    <img
      src="/engineer/drawer/DrawerItem_Language.png"
      alt="DrawerItem_Language"
      class="header-icon"
      width={iconSize}
      height={iconSize}
    />

    <div class="header-content">
      {m.settings_language_header()}
    </div>
  </header>

  <!-- main-content -->
  <div class="page-main-content">
    <div class="content-area">
      <div class="language-selector">
        <button
          class="lang-btn"
          class:active={locale === 'ru'}
          onclick={() => switchLanguage('ru')}
        >
          <img src="/flags/Russian.png" alt="Russian flag" width="32" height="24" />
          Russian
        </button>

        <button
          class="lang-btn"
          class:active={locale === 'en'}
          onclick={() => switchLanguage('en')}
        >
          <img src="/flags/English.png" alt="English flag" width="32" height="24" />
          English
        </button>
      </div>
    </div>
  </div>

</div>

<style>
  .page-with-custom-header {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .custom-page-header {
    height: 110px;
    background: rgb(5, 104, 167);
    color: white;
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  }

.header-icon {
  position: absolute;
  left: 20px;
  top: 70%;
  transform: translateY(-50%);
  filter: brightness(0) invert(1);
  object-fit: contain;
}


  .header-content {
    padding-left: var(--title-padding-left, 00px);
    transform: translateY(var(--title-offset-y, 20px));
  }

  .page-main-content {
    flex: 1 1 auto;
    overflow: hidden;
    background: url('/engineer/engineer_background.png') center / cover no-repeat #0d1425;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .content-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    min-height: 0;
  }

  .language-selector {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 400px;
    width: 100%;
  }

  .lang-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.08);
    border: 2px solid transparent;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lang-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .lang-btn.active {
    background: rgba(4, 87, 139, 0.4);
    border-color: rgb(4, 87, 139);
    font-weight: bold;
    box-shadow: 0 0 12px rgba(4, 87, 139, 0.5);
  }

  .lang-btn img {
    border-radius: 4px;
    object-fit: cover;
  }
</style>