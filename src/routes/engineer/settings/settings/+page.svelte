<!-- src/routes/engineer/settings/settings/+page.svelte -->

<script lang="ts">
  import * as m from '../../../../paraglide/messages.js';
  import { getLocale, setLocale } from '../../../../paraglide/runtime.js';
  import RoundButton from '../../../../components/engineer/RoundButton.svelte';
  import ComboBox from '../../../../components/engineer/ComboBox.svelte';
  import TextField from '../../../../components/engineer/TextField.svelte';
  import SlideBar from '../../../../components/engineer/SlideBar.svelte';
  

  let locale = $derived(getLocale());

  const iconSize = 64;

  const options = [
    { value: 'opt1', label: 'Вариант 1' },
    { value: 'opt2', label: 'Вариант 2 — длинное название' },
    { value: 'opt3', label: 'Третий пункт' },
    { value: 'opt4', label: 'Четвёртый' },
    { value: 'opt5', label: 'Пятый элемент списка' },
    { value: 'opt6', label: 'Ещё один' },
    { value: 'opt7', label: '33Ещё один' },
    { value: 'opt8', label: 'Ещrgё один' }
  ];
  
  function handleSave() {
  }

</script>

<!-- Page -->
<div class="page-with-custom-header">

  <!-- Header -->
  <header class="custom-page-header">
    <img
      src="/engineer/drawer/DrawerItem_Settings.png"
      alt="DrawerItem_Language"
      class="header-icon"
      width={iconSize}
      height={iconSize}
    />

    <div class="header-content">
      {m.settings_settings_header()}
    </div>
  </header> <!-- Header -->


  <!-- НОВАЯ КНОПКА SAVE: контейнер во всю ширину, сразу под header -->
  <div class="save-bar">
    <RoundButton 
    height = {iconSize*0.75}
    width = {iconSize*3}
    text = {m.button_save()} 
     />
  </div>

  <!-- main-content -->
  <div class="page-main-content">
    <div class="content-area">
      <!-- scroll-container -->
      <div class="scroll-container">

        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->

        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->

        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->

        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->
        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->
        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->
        <!-- 0 Row -->
        <div class="setting-row">
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
          <RoundButton 
          height = {iconSize*0.75}
          width = {iconSize*3}
          text = {m.button_save()} 
          />
        </div><!-- 0 Row -->

        <!-- 0 Row -->
        <div class="setting-row">
          <SlideBar value = {0}
          />
        </div><!-- 0 Row -->



      </div><!-- scroll-container -->
    </div>
  </div> <!-- main-content -->

</div><!-- Page -->

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

  .save-bar {
    height: var(iconSize);
    background: transparent;
    flex-shrink: 0;
    position: relative;
    display: flex-start;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    padding-top: 1rem;
  }

  .page-main-content {
    flex: 1 1 auto;
    overflow: hidden;
    background: url('/engineer/engineer_background.png') center / cover no-repeat #0d1425;
    color: white;
    display: flex;
    flex-direction: column;
  }
  
 .setting-row {
    display: flex;
    flex-direction: row;        /* ← это главное */
    gap: 1.2rem;                /* расстояние между кнопками */
    justify-content: flex-start; /* или center / space-between / space-around */
    align-items: center;        /* выравнивание по вертикали */
    padding: 1rem 0;            /* опционально — отступы сверху/снизу строки */
    width: 100%;                /* чтобы занимал всю ширину scroll-контейнера */
  }

  /* Переопределяем content-area для scrollable */
  .content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center; /* Центрируем по горизонтали */
    justify-content: flex-start;
    padding: 1.5rem 1.5rem 0;
    min-height: 0;
    overflow: hidden;
  }

  .scroll-container {
    flex: 1;
    width: 100%;

    overflow-y: auto;           /* или scroll — важно, чтобы было не hidden */
    overflow-x: hidden;

    touch-action: pan-y pinch-zoom;   /* разрешаем вертикальный скролл + pinch-zoom */
    display: flex;
    flex-direction: column;

    -webkit-overflow-scrolling: touch;   /* ← это главное для momentum на iOS */

    padding-right: 12px;        /* место под скроллбар */

    /* Современные стили скроллбара (работают почти везде) */
    scrollbar-width: thin;      /* firefox */
    scrollbar-color: rgba(255,255,255,0.4) transparent;

    /* Для Chrome/Edge/Safari новый способ */
    &::-webkit-scrollbar {
      width: 8px;               /* или 8px, если хочешь потолще */
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.5);
    }
  }

  .scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 3px;
  }

  /* Каждый параметр: 2 ряда (label + control) */
  .param-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .param-label {
    font-size: 1.05rem;
    font-weight: 500;
    color: #d0d0d0;
    opacity: 0.9;
  }

  /* Стили для компонентов (если нужно доработать) */
  :global(.ComboBox), :global(.TextField) {
    width: 100%;
  }
</style>