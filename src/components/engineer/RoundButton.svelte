<!-- \src\components\engineer\RoundButton.svelte -->

<script>
  let {
    text = 'Button',
    width = 320,
    height = 120,
    currentColor = '#0000FF',
    fontColor = '#FFFFFF',
    canvasColor = '#1A1F35',
    borderColor = '#3A4260'
  } = $props();

  const buttonColors = ['#FF0000', '#33AA33', '#0000FF', '#FFCC22'];

  function cmd() {
    const currentIndex = buttonColors.indexOf(currentColor);
    currentColor = buttonColors[(currentIndex + 1) % buttonColors.length];
  }

  let framePadding = $derived(Math.min(width, height) / 64);
</script>

<button
  type="button"
  class="root"
  style:--width="{width}px"
  style:--height="{height}px"
  style:--border-width="{Math.min(width, height) / 40}px"
  style:--border-color="{borderColor}"
  style:--current-color="{currentColor}"

    onclick={cmd}
    onmousedown={() => (framePadding = Math.min(width, height) / 16)}
    onmouseup={() => (framePadding = Math.min(width, height) / 12)}
    onmouseenter={() => (framePadding = Math.min(width, height) / 48)}
    onmouseleave={() => (framePadding = Math.min(width, height) / 64)}

>
  <div class="frame"
  style:--frame-padding="{framePadding}px"
  style:--canvas-color="{canvasColor}" >
    <span class="label" style:color="{fontColor}">{text}</span>
</div>
</button>

<style>
  .root {
    width: var(--width);
    height: var(--height);
    border-radius: 1.2em;
    border: var(--border-width) solid var(--border-color);
    background: linear-gradient(to right, var(--current-color) 0%, white 140%);
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .frame {
    width: calc(100% - var(--frame-padding) * 1);
    height: calc(85% - var(--frame-padding) * 1);
    border-radius: 1em;
    border: var(--border-width) solid var(--border-color);
    background: linear-gradient(to right, var(--canvas-color) 0%, white 320%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .frame:active {
    transform: scale(0.97);
    font-weight: bold;
  }

  .label {

    font-size: clamp(
    0.875rem,
    min(
      calc(var(--height) * 0.50),
      calc(var(--width) * 0.123)
    ),
    2.2rem
  );
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 92%;
  }
</style>