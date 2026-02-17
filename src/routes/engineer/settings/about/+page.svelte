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
      src="/engineer/drawer/DrawerItem_About.png"
      alt="DrawerItem_About"
      class="header-icon"
      width={iconSize}
      height={iconSize}
    />

    <div class="header-content">
      {m.settings_about_header()}
    </div>
  </header>

  <!-- main-content -->
  <div class="page-main-content">
    <div class="content-area">

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
</style>