<!-- \src\components\engineer\CentralButton.svelte -->

<script>
  let {
    text = 'Connect',
    size = 450,
    currentColor = '#0000FF',
    fontColor = '#000000',
    canvasColor = '#FFFFFF',
    borderColor = '#CCCCCC'
  } = $props();

  const buttonColors = ['#FF0000', '#33AA33', '#0000FF', '#FFCC22'];

  function cmd() {
    const currentIndex = buttonColors.indexOf(currentColor);
    currentColor = buttonColors[(currentIndex + 1) % buttonColors.length];
  }

  
  let frameWidth = $derived(size / 20);
</script>

<div
    class="frame"
    style="--size: {size}px; --border-width: {size / 100}px; --border-color: {borderColor}; --current-color: {currentColor};"
  >

  <button
    type="button"
    class="root"
    
    onclick={cmd}
    onmousedown={() => frameWidth = size / 8}
    onmouseup={() => frameWidth = size / 20}
    onmouseenter={() => frameWidth = size / 16}
    onmouseleave={() => frameWidth = size / 20}
  >
    <div class="frame"
      style="--frame-width: {frameWidth}px; --frame-height: {frameWidth}px; --canvas-color: {canvasColor};">
      <span class="label" style="color: {fontColor};">{text}</span>
    </div> <!-- "frame" -->

    </button>
  </div>

<style>
  .root {
    aspect-ratio: 1 / 1;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    border: var(--border-width) solid var(--border-color);
    background: linear-gradient(to right, var(--current-color) 0%, white 150%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .frame {
    inset: var(--frame-width);
    position: absolute;
    border-radius: 50%;
    border: var(--border-width) solid var(--border-color);
    background: linear-gradient(to right, var(--canvas-color) 0%, white 350%);

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .frame:active {
    font-weight: bold;
  }

  .label {
    width: 75%;
    height: 35%;
    text-align: center;
    font-size: calc(var(--size) / 10);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
</style>