<script lang="ts">
  import * as icons from '$lib/ion';
  import type { Component } from 'svelte';
  import { Label, Input, Select, Span, Range, Checkbox } from 'svelte-5-ui-lib';

  // Default values
  const DEFAULT_VALUES = {
    size: 24,
    color: '#6928E2',
    event: 'hover',
    pauseDuration: 300,
    transitionDuration: 500,
    transitionDelay: 0,
    enableFocusStyles: false
  };

  let size = $state(DEFAULT_VALUES.size);
  let color = $state(DEFAULT_VALUES.color);
  let searchTerm = $state('');
  let event = $state(DEFAULT_VALUES.event);
  let pauseDuration = $state(DEFAULT_VALUES.pauseDuration);
  let transitionDuration = $state(DEFAULT_VALUES.transitionDuration);
  let transitionDelay = $state(DEFAULT_VALUES.transitionDelay);
  let enableFocusStyles = $state(DEFAULT_VALUES.enableFocusStyles);
  let copiedIcon = $state('');

  function handleFocusChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    enableFocusStyles = e.currentTarget.checked;
  }

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
    { value: 'hover', label: 'Hover' },
    { value: 'click', label: 'Click' },
    { value: 'undefined', label: 'None' }
  ];

  function getPropsString() {
    const props = [];

    if (size !== DEFAULT_VALUES.size) {
      props.push(`size={${size}}`);
    }
    if (color !== DEFAULT_VALUES.color) {
      props.push(`color="${color}"`);
    }
    if (event !== DEFAULT_VALUES.event) {
      props.push(`event="${event}"`);
    }
    if (pauseDuration !== DEFAULT_VALUES.pauseDuration) {
      props.push(`pauseDuration={${pauseDuration}}`);
    }
    if (enableFocusStyles !== DEFAULT_VALUES.enableFocusStyles) {
      props.push(`enableFocusStyles={${enableFocusStyles}}`);
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
      /* eslint-disable  no-useless-escape */
      const componentText = `<script>
  import { ${name} } from 'svelte-animated-icons';
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

<div class="mx-auto max-w-6xl p-4">
  <h1 class="my-4 text-2xl font-bold">Ion Icons</h1>
  <div class="mb-4 space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
    <!-- Basic Controls -->
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <Label color="secondary" for="size-input" class="w-20">Size: {size}</Label>
        <Range id="size-input" bind:value={size} min="16" max="100" />
      </div>

      <div class="flex items-center gap-2">
        <Label color="secondary" for="color-input">Color:</Label>
        <Input id="color-input" type="color" bind:value={color} class="h-10 w-20 p-0" />
      </div>

      <div class="flex items-center gap-2">
        <Label color="secondary" for="focus-toggle">Focus Styles:</Label>
        <Checkbox
          id="focus-toggle"
          checked={enableFocusStyles}
          onchange={handleFocusChange}
          class="h-5 w-5 rounded border-gray-300"
        />
      </div>
    </div>

    <!-- Animation Controls -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="flex items-center gap-2">
        <Label color="secondary" for="event-select">Event:</Label>
        <Select id="event-select" bind:value={event} class="rounded border p-2">
          {#each eventOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </Select>
      </div>

      <div class="flex items-center gap-2">
        <Label color="secondary" class="w-48" for="pause-input">Pause Duration:</Label>
        <Input
          id="pause-input"
          type="number"
          bind:value={pauseDuration}
          min="0"
          max="2000"
          step="100"
          class="rounded border p-2"
        />
      </div>

      <div class="flex items-center gap-2">
        <Label color="secondary" class="w-72" for="duration-input">Transition Duration:</Label>
        <Input
          id="duration-input"
          type="number"
          bind:value={transitionDuration}
          min="0"
          max="2000"
          step="100"
          class="rounded border p-2"
        />
      </div>

      <div class="flex items-center gap-2">
        <Label color="secondary" class="w-60" for="delay-input">Transition Delay:</Label>
        <Input
          id="delay-input"
          type="number"
          bind:value={transitionDelay}
          min="0"
          max="1000"
          step="100"
          class="rounded border p-2"
        />
      </div>
    </div>

    <!-- Search -->
    <div class="flex items-center gap-2">
      <Label color="secondary" for="search-input" class="sr-only">Search icons</Label>
      <Input
        id="search-input"
        type="text"
        bind:value={searchTerm}
        placeholder="Search icons..."
        class="flex-grow rounded border p-2"
      />
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each filteredIcons as [name, Icon]}
      <div
        class="icon-card group relative flex flex-col items-center gap-2 rounded border border-gray-200 p-4 dark:border-gray-700"
      >
        <Icon
          {size}
          {color}
          {event}
          {pauseDuration}
          {transitionParams}
          {enableFocusStyles}
          ariaLabel={name}
        />
        <Span highlight="blue">{name}</Span>
        <button
          class="copy-badge absolute right-2 top-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
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
