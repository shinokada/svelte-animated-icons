<script lang="ts">
  import * as icons from '$lib';
  import type { Component } from 'svelte';

  // Default values
  const DEFAULT_VALUES = {
    size: 24,
    color: 'currentColor',
    strokeWidth: 1.5,
    event: 'onmouseenter',
    pauseDuration: 300,
    transitionDuration: 800,
    transitionDelay: 0
  };
  
  let size = $state(DEFAULT_VALUES.size);
  let color = $state(DEFAULT_VALUES.color);
  let strokeWidth = $state(DEFAULT_VALUES.strokeWidth);
  let searchTerm = $state('');
  let event = $state(DEFAULT_VALUES.event);
  let pauseDuration = $state(DEFAULT_VALUES.pauseDuration);
  let transitionDuration = $state(DEFAULT_VALUES.transitionDuration);
  let transitionDelay = $state(DEFAULT_VALUES.transitionDelay);
  let copiedIcon = $state('');
  
  let filteredIcons = $derived(
    Object.entries(icons).filter(([name]) => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    ) as [string, Component][]
  );

  let transitionParams = $derived({
    duration: transitionDuration,
    delay: transitionDelay
  });

  const eventOptions = [
    { value: 'onmouseenter', label: 'Mouse Enter' },
    { value: 'onclick', label: 'Click' }
  ];

  function getPropsString() {
    const props = [];
    
    if (size !== DEFAULT_VALUES.size) {
      props.push(`size={${size}}`);
    }
    if (color !== DEFAULT_VALUES.color) {
      props.push(`color="${color}"`);
    }
    if (strokeWidth !== DEFAULT_VALUES.strokeWidth) {
      props.push(`strokeWidth={${strokeWidth}}`);
    }
    if (event !== DEFAULT_VALUES.event) {
      props.push(`event="${event}"`);
    }
    if (pauseDuration !== DEFAULT_VALUES.pauseDuration) {
      props.push(`pauseDuration={${pauseDuration}}`);
    }

    const hasCustomTransition = 
      transitionDuration !== DEFAULT_VALUES.transitionDuration ||
      transitionDelay !== DEFAULT_VALUES.transitionDelay;

    if (hasCustomTransition) {
      props.push(`transitionParams={{
    duration: ${transitionDuration},
    delay: ${transitionDelay}
  }}`);
    }
    
    return props.join('\n  ');
  }

  async function copyIcon(name: string) {
    try {
      const props = getPropsString();
      const componentText = `<script>
  import { ${name} } from '$lib';
<\/script>

<${name}${props ? `\n  ${props}` : ''} />`;
      
      await navigator.clipboard.writeText(componentText);
      copiedIcon = name;
      setTimeout(() => {
        copiedIcon = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold my-4">Svelte Icon Draw (Heroicons)</h1>
  <div class="controls space-y-4">
    <!-- Basic Controls -->
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <label for="size-input">Size:</label>
        <input
          id="size-input"
          type="number"
          bind:value={size}
          min="12"
          max="64"
          class="border p-2 rounded w-20"
        />
      </div>
      
      <div class="flex items-center gap-2">
        <label for="color-input">Color:</label>
        <input
          id="color-input"
          type="color"
          bind:value={color}
          class="h-10"
        />
      </div>
      
      <div class="flex items-center gap-2">
        <label for="stroke-input">Stroke Width:</label>
        <input
          id="stroke-input"
          type="number"
          bind:value={strokeWidth}
          min="0.5"
          max="4"
          step="0.5"
          class="border p-2 rounded w-20"
        />
      </div>
    </div>

    <!-- Animation Controls -->
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <label for="event-select">Event:</label>
        <select id="event-select" bind:value={event} class="border p-2 rounded">
          {#each eventOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label for="pause-input">Pause Duration:</label>
        <input
          id="pause-input"
          type="number"
          bind:value={pauseDuration}
          min="0"
          max="2000"
          step="100"
          class="border p-2 rounded w-24"
        />
      </div>

      <div class="flex items-center gap-2">
        <label for="duration-input">Transition Duration:</label>
        <input
          id="duration-input"
          type="number"
          bind:value={transitionDuration}
          min="0"
          max="2000"
          step="100"
          class="border p-2 rounded w-24"
        />
      </div>

      <div class="flex items-center gap-2">
        <label for="delay-input">Transition Delay:</label>
        <input
          id="delay-input"
          type="number"
          bind:value={transitionDelay}
          min="0"
          max="1000"
          step="100"
          class="border p-2 rounded w-24"
        />
      </div>
    </div>

    <!-- Search -->
    <div class="flex items-center gap-2">
      <label for="search-input" class="sr-only">Search icons</label>
      <input
        id="search-input"
        type="text"
        bind:value={searchTerm}
        placeholder="Search icons..."
        class="border p-2 rounded flex-grow"
      />
    </div>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
    {#each filteredIcons as [name, Icon]}
      <div class="icon-card border rounded p-4 flex flex-col items-center gap-2 relative group">
        <Icon
          {size}
          color={color}
          {strokeWidth}
          {event}
          pauseDuration={pauseDuration}
          transitionParams={transitionParams}
          ariaLabel={name}
        />
        <span class="text-sm text-center">{name}</span>
        <button
          class="copy-badge absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          onclick={() => copyIcon(name)}
          aria-label={`Copy ${name} component`}
        >
          {copiedIcon === name ? 'Copied!' : 'Copy'}
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .controls {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .copy-badge {
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .copy-badge:hover {
    background-color: #4a5568;
  }

  .icon-card {
    transition: transform 0.2s;
  }

  .icon-card:hover {
    transform: scale(1.02);
  }
</style>
