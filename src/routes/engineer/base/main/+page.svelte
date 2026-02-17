<!-- src/routes/engineer/base/main.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { getContext } from 'svelte';

  import CentralButton from '../../../../components/engineer/CentralButton.svelte';
  import RoundButton from '../../../../components/engineer/RoundButton.svelte';
  import RoundTerminal from '../../../../components/engineer/RoundTerminal.svelte';

  const toolbarHeight = getContext('toolbarHeight') ?? 0;
  const navibarHeight = getContext('navibarHeight') ?? 0;

  //Central button
  const CENTRAL_MAX_HEIGHT_RATIO = 0.50;
  const CENTRAL_MAX_WIDTH_RATIO = 0.30;
  const CENTRAL_BASE_SIZE = 240;
  //Regular button
  const REGULAR_MAX_HEIGHT_RATIO = 0.20;
  const REGULAR_MAX_WIDTH_RATIO = 0.6;
  const REGULAR_BASE_WIDTH = CENTRAL_BASE_SIZE*1.2;
  const REGULAR_BASE_HEIGHT = CENTRAL_BASE_SIZE/6;


  let windowWidth = $state(100);
  let windowHeight = $state(100);

  let availableHeight = $derived(
    windowHeight - $toolbarHeight - $navibarHeight
  );

  let topAreaHeight = $derived(availableHeight * 0.5);
  let topAreaWidth = $derived(windowWidth);

  // Central button dynamic size
  let centralSize = $derived(
    Math.min(
      CENTRAL_BASE_SIZE,
      topAreaHeight * CENTRAL_MAX_HEIGHT_RATIO,
      topAreaWidth * CENTRAL_MAX_WIDTH_RATIO
    )
  );

    // Regular button dynamic size
  let regularHeight = $derived(
    Math.max(
      REGULAR_BASE_HEIGHT
    )
  );

  let regularWidth = $derived(
    Math.min(
      REGULAR_BASE_WIDTH,
      (topAreaWidth /2 - topAreaWidth/20)
    )
  );


  // ── Отслеживание размеров окна ──────────────────────────────────────────────
  function updateWindowSize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  onMount(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateWindowSize);
  });
</script>

<main
  class="fullscreen"
  style="
    top: {$toolbarHeight}px;
    bottom: {$navibarHeight}px;
    left: 0;
    right: 0;
  "
>
  <div class="top-area">
    <!-- Верхняя левая -->
    <div class="corner top-left">
      <RoundButton
        text="TB: {$toolbarHeight}px"
        width={regularWidth}
        height={regularHeight}
        currentColor="#6a48d6"
        fontColor="#FFFFFF"
        canvasColor="#1A1F35"
        borderColor="#AAAAAA"
      />
    </div>

    <!-- Верхняя правая -->
    <div class="corner top-right">
      <RoundButton
        text="NB: {$navibarHeight}px"
        width={regularWidth}
        height={regularHeight}
        currentColor="#6a48d6"
        fontColor="#FFFFFF"
        canvasColor="#1A1F35"
        borderColor="#AAAAAA"
      />
    </div>

    <!-- Нижняя левая -->
    <div class="corner bottom-left">
      <RoundButton
        text="W: {windowWidth}px"
        width={regularWidth}
        height={regularHeight}
        currentColor="#6a48d6"
        fontColor="#FFFFFF"
        canvasColor="#1A1F35"
        borderColor="#AAAAAA"
      />
    </div>

    <!-- Нижняя правая -->
    <div class="corner bottom-right">
      <RoundButton
        text="H: {windowHeight/2}px"
        width={regularWidth}
        height={regularHeight}
        currentColor="#6a48d6"
        fontColor="#FFFFFF"
        canvasColor="#1A1F35"
        borderColor="#AAAAAA"
      />
    </div>

    <!-- Центральная кнопка -->
    <div class="central">
      <CentralButton
        text="Connect"
        size={centralSize}
        currentColor="#0000FF"
        fontColor="#FFFFFF"
        canvasColor="#1A1F35"
        borderColor="#CCCCCC"
      />
    </div>
  </div>

  <div class="bottom-area">
    <RoundTerminal />
  </div>
</main>

<style>
  .fullscreen {
    position: fixed;
    margin: 0;
    padding: 0;
    background: transparent;
    color: white;
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    width: 100vw;
    overflow: hidden;
  }

  .top-area,
  .bottom-area {
    background: transparent;
  }

  .top-area {
    flex: 0 0 50%;
    --offset-top: 0rem;
    --offset-bottom: 1rem;
    --offset-side: 3rem;
    padding: var(--offset-top) var(--offset-side) var(--offset-bottom) var(--offset-side);
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }

  .bottom-area {
    flex: 1;
    padding: 1.0rem 1.0rem 1.0rem;
    display: flex;
    flex-direction: column;
    overflow: visible;  
  }

  .corner {
    position: absolute;
    z-index: 2;
  }

  .top-left, .top-right { top: 1.0rem }
  .bottom-left, .bottom-right { bottom: 1.0rem }
  .top-left, .bottom-left { left: 1.0rem }
  .top-right, .bottom-right { right: 1.0rem }

  .central {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1;
  }

  .central :global(*) {
    pointer-events: auto;
  }


</style>