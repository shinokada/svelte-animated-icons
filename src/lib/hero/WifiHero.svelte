<script lang="ts">
  import { draw } from 'svelte/transition';
  import type { DrawParams } from 'svelte/transition';
  import type { SVGAttributes } from 'svelte/elements';

  type TitleType = {
    id?: string;
    title?: string;
  };
  type DescType = {
    id?: string;
    desc?: string;
  };

  interface Props extends SVGAttributes<SVGElement> {
    pauseDuration?: number;
    event?: 'hover' | 'click' | 'none';
    title?: TitleType;
    desc?: DescType;
    ariaLabel?: string;
    size?: number;
    role?: string;
    color?: string;
    strokeWidth?: number;
    transitionParams?: DrawParams;
    enableFocusStyles?: boolean;
    focusOutlineWidth?: string | number;
    focusOutlineColor?: string;
    focusOutlineOffset?: string | number;
    focusOutlineStyle?: string;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    role = 'img',
    color = 'currentColor',
    strokeWidth = 1.5,
    title,
    desc,
    ariaLabel = 'wifi',
    transitionParams = { duration: 500, delay: 0 },
    enableFocusStyles = false,
    focusOutlineWidth = 0.05, // Default to ~8.3% of icon size
    focusOutlineColor = 'currentColor',
    focusOutlineOffset = 0.05, // Default to ~8.3% of icon size
    focusOutlineStyle = 'solid',
    class: className,
    ...restProps
  }: Props = $props();

  const getDuration = (params?: DrawParams): number => {
    if (!params?.duration) return 0;
    if (typeof params.duration === 'function') {
      return params.duration(0);
    }
    return params.duration;
  };

  let visible = $state(true);
  let totalDuration = $derived(getDuration(transitionParams) + pauseDuration);

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  const handleEvent = () => {
    if (!visible) return;
    visible = false;
    setTimeout(() => {
      visible = true;
    }, totalDuration);
  };

  // Convert outline width and offset to calculated values based on size
  const calculateOutlineValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return `calc(var(--size) * ${value})`;
    }
    // If it's a string with units, return as is
    return value;
  };

  // Set CSS variable for the placeholder size
  $effect(() => {
    document.documentElement.style.setProperty('--size', `${size}px`);
  });

  const buttonId = crypto.randomUUID();
  let focusStyles = $derived(
    enableFocusStyles
      ? `
    --focus-outline-width: ${calculateOutlineValue(focusOutlineWidth)};
    --focus-outline-color: ${focusOutlineColor};
    --focus-outline-offset: ${calculateOutlineValue(focusOutlineOffset)};
    --focus-outline-style: ${focusOutlineStyle};
  `
      : ''
  );
</script>

{#snippet iconsvg()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
    {role}
    width={size}
    height={size}
    fill="none"
    aria-label={ariaLabel}
    aria-describedby={hasDescription ? ariaDescribedby : undefined}
    viewBox="0 0 24 24"
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    class={className}
  >
    {#if title?.id && title.title}
      <title id={title.id}>{title.title}</title>
    {/if}
    {#if desc?.id && desc.desc}
      <desc id={desc.id}>{desc.desc}</desc>
    {/if}
    {#if visible}
      <path
        d="M8.28767 15.0378C10.3379 12.9875 13.662 12.9875 15.7123 15.0378M5.10569 11.8558C8.9133 8.04815 15.0867 8.04815 18.8943 11.8558M1.92371 8.67373C7.48868 3.10876 16.5113 3.10876 22.0762 8.67373M12.5303 18.2197L12 18.7501L11.4696 18.2197C11.7625 17.9268 12.2374 17.9268 12.5303 18.2197Z"
        stroke={color}
        stroke-width={strokeWidth}
        transition:draw={transitionParams}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/if}
  </svg>
{/snippet}

{#if event === 'hover'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onmouseenter={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else if event === 'click'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onclick={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else}
  <div class="icon-wrapper" role="img" aria-label={ariaLabel} style={focusStyles}>
    {@render iconsvg()}
  </div>
{/if}

<style>
  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
    width: var(--size, 24px);
    height: var(--size, 24px);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    line-height: 0;
  }

  .icon-wrapper:focus {
    outline-width: var(--focus-outline-width, 0);
    outline-color: var(--focus-outline-color, transparent);
    outline-offset: var(--focus-outline-offset, 0);
    outline-style: var(--focus-outline-style, none);
  }
</style>
