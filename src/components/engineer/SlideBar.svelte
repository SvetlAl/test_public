<!-- src/components/engineer/SlideBar.svelte -->
<!-- src/components/engineer/SlideBar.svelte -->
<!-- src/components/engineer/SlideBar.svelte -->

<script lang="ts">

  let { 
    label = 'Param',
    value = $bindable(),        // ← вот так! теперь bind:value работает
    min = 0,
    max = 100,
    step = 1
  } = $props<{
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
  }>();

  // Вычисляем процент заполнения
  let percent = $derived(((value - min) / (max - min)) * 100);

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = Number(target.value);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      value = Math.min(max, value + step);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      value = Math.max(min, value - step);
      e.preventDefault();
    }
  }
</script>

<div class="slidebar">
  <div class="label-row">
    <span class="param-label">{label}</span>
  </div>

  <div class="track-row">
    <input
      type="range"
      {min}
      {max}
      {step}
      bind:value                
      oninput={handleInput}
      onkeydown={handleKeydown}
      class="hidden-range"
      aria-label={label}
    />

    <div class="custom-track">
      <div class="track-filled" style:width="{percent}%"></div>

      <div
        class="thumb"
        style:left="{percent}%"
        role="slider"
        tabindex="0"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
      ></div>
    </div>
  </div>
</div>


<style>
  .slidebar {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80px;
    user-select: none;
  }

  .label-row {
    flex: 1;                /* ~1/3 */
    display: flex;
    align-items: flex-end;
    padding-bottom: 6px;
  }

  .param-label {
    font-size: 1.05rem;
    font-weight: 500;
    color: #d0d0d0;
    opacity: 0.9;
  }

  .track-row {
    flex: 2;
    position: relative;
    display: flex;
    align-items: center;
  }

  .custom-track {
    position: relative;
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 3px;
    overflow: hidden;
  }

  .track-filled {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: rgb(5, 104, 167); 
    border-radius: 3px;
    transition: width 0.1s ease-out;
  }

  .thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid rgb(5, 104, 167);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    cursor: grab;
    transition: all 0.12s ease;
  }

  .thumb:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 4px 14px rgba(5, 104, 167, 0.4);
  }

  .hidden-range {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  .hidden-range:focus-visible + .custom-track .thumb {
    outline: 2px solid rgb(5, 104, 167);
    outline-offset: 2px;
  }
</style>