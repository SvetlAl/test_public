<!-- src/components/engineer/TextField.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';

  let {
    value = $bindable(''),
    label = 'Label', 
    disabled = false,
    placeholder = '',
    type = 'text',
    width = '100%',
    height = 56,
    borderRadius = '8px',
    normalBorderWidth = '1px',
    boldBorderWidth = '2px',
    normalColor = '#AAAAAA',
    hoverColor = '#FF9800',
    focusColor = '#FF9800',
    disabledColor = '#000000'
  } = $props<{
    value?: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    width?: number | string;
    height?: number;
    borderRadius?: string;
    normalBorderWidth?: string;
    boldBorderWidth?: string;
    normalColor?: string;
    hoverColor?: string;
    focusColor?: string;
    disabledColor?: string;
  }>();

  let focused = $state(false);
  let hovered = $state(false);

  let borderColor = $derived(
    disabled ? disabledColor :
    focused  ? focusColor :
    hovered  ? hoverColor :
    normalColor
  );

  let borderWidth = $derived(
    disabled || focused ? boldBorderWidth : normalBorderWidth
  );

  function handleFocus() {
    focused = true;
  }

  function handleBlur() {
    focused = false;
  }

  function handleMouseEnter() {
    hovered = true;
  }

  function handleMouseLeave() {
    hovered = false;
  }
</script>

<div
  class="textfield-wrapper"
  role="group"                          
  aria-labelledby="textfield-label" 
  style="width: {width}; height: {height}px;"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <input
    {type}
    bind:value
    {placeholder}
    {disabled}
    onfocus={handleFocus}
    onblur={handleBlur}
    class:disabled
    class:focused
    style="
      border-radius: {borderRadius};
      border: {borderWidth} solid {borderColor};
      height: {height}px;
    "
  />

{#if !focused && label && !disabled}
  <div
    class="floating-label"
    transition:fade={{ duration: 200 }}
    style="
      color: {borderColor};
      opacity: {hovered || focused ? 1 : 0.85};
    "
  >
    {label}
  </div>
{/if}
</div>

<style>
  .textfield-wrapper {
    position: relative;
    display: inline-block;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-size: 16px;
    color: white;
    background: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, border-width 0.2s ease;
  }

  input:disabled {
    color: #666;
    cursor: not-allowed;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .floating-label {
    position: absolute;
    top: -10px;
    left: 16px;
    padding: 0 6px;
    background: transparent;
    font-size: 12px;
    font-weight: 500;
    pointer-events: none;
    white-space: nowrap;
    transform: translateY(-50%);
  }

  input.focused + .floating-label,
  input:disabled + .floating-label {
    display: none;
  }
</style>