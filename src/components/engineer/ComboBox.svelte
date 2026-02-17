<!-- src/components/engineer/ComboBox.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  type Item = {
    value: string;
    label: string;
  };

  let {
    items = [],
    value = '',
    placeholder = 'Выберите...',
    initialWidth = '100%',
    initialHeight = 48
  } = $props<{
    items?: Item[];
    value?: string;
    placeholder?: string;
    initialWidth?: number | string;
    initialHeight?: number;
  }>();

  const dispatch = createEventDispatcher<{ change: { value: string } }>();

  let isOpen = $state(false);
  let triggerElement: HTMLElement | undefined = $state();
  let dropdownElement: HTMLElement | undefined = $state();

  // вычисляемое значение — аналог старого $: selectedLabel = ...
  let selectedLabel = $derived(
    items.find((item: Item) => item.value === value)?.label || placeholder
  );

  function toggle() {
    isOpen = !isOpen;
  }

  function select(item: Item) {
    value = item.value;
    dispatch('change', { value: item.value });
    isOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      triggerElement &&
      !triggerElement.contains(event.target as Node) &&
      dropdownElement &&
      !dropdownElement.contains(event.target as Node)
    ) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div
  class="combobox-wrapper"
  style:width={typeof initialWidth === 'number' ? `${initialWidth}px` : initialWidth}
  style:--height="{initialHeight}px"
>
  <!-- Триггер / выбранное значение -->
  <button
    type="button"
    class="trigger"
    class:open={isOpen}
    bind:this={triggerElement}
    onclick={toggle}
  >
    <span class="selected-text">{selectedLabel}</span>
    <svg
      class="chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if isOpen && items.length > 0}

<div class="dropdown" bind:this={dropdownElement}>
  <ul class="options" role="listbox" aria-label="Выбор значения">
    {#each items as item (item.value)}
      <li class="option" role="option" aria-selected={item.value === value}>
        <button
          type="button"
          class="option-button"
          class:selected={item.value === value}
          onclick={() => select(item)}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
</div>

  {/if}
</div>

<style>
  .combobox-wrapper {
    position: relative;
    font-family: system-ui, -apple-system, sans-serif;
    --radius: 12px;
    --border: 1px solid #a0b0c8;
    --bg: #e4e6ee;
    --text: #010c27;
    --hover: #4f7cee;
    --selected: #3a4260;
  }

  .trigger {
    width: 100%;
    height: var(--height);
    background: var(--bg);
    border: var(--border);
    border-radius: var(--radius);
    color: var(--text);
    padding: 0 16px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.15s ease;
    user-select: none;
  }

  .trigger:hover {
    background: var(--hover);
  }

  .trigger.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: var(--hover);
  }

  .selected-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    text-align: left;
  }

  .chevron {
    transition: transform 0.2s ease;
    color: #94a3b8;
  }

  .trigger.open .chevron {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg);
    border: var(--border);
    border-top: none;
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .options {
    list-style: none;
    margin: 0;
    padding: 6px 0;
  }

  .option {
    padding: 10px 16px;
    color: var(--text);
    cursor: pointer;
    transition: background 0.12s ease;
  }

  .option {
  list-style: none;
  margin: 0;
  padding: 0;
}

  .option-button {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    background: transparent;
    border: none;
    color: var(--text);
    text-align: left;
    cursor: pointer;
    font: inherit;
    transition: background 0.12s ease;
  }

  .option-button:hover {
    background: var(--hover);
  }

  .option-button.selected {
    background: var(--selected);
    font-weight: 500;
  }

  .option-button:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: -2px;
  }

  .option:hover {
    background: var(--hover);
  }

  .dropdown::-webkit-scrollbar {
    width: 6px;
  }

  .dropdown::-webkit-scrollbar-track {
    background: #111827;
  }

  .dropdown::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 3px;
  }

  .dropdown::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
</style>