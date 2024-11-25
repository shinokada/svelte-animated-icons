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
    ariaLabel = 'scale',
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
        d="M12 3V20.25M12 20.25C10.528 20.25 9.1179 20.515 7.81483 21M12 20.25C13.472 20.25 14.8821 20.515 16.1852 21M18.75 4.97089C16.5446 4.66051 14.291 4.5 12 4.5C9.70897 4.5 7.45542 4.66051 5.25 4.97089M18.75 4.97089C19.7604 5.1131 20.7608 5.28677 21.75 5.49087M18.75 4.97089L21.3704 15.6961C21.4922 16.1948 21.2642 16.7237 20.7811 16.8975C20.1468 17.1257 19.4629 17.25 18.75 17.25C18.0371 17.25 17.3532 17.1257 16.7189 16.8975C16.2358 16.7237 16.0078 16.1948 16.1296 15.6961L18.75 4.97089ZM2.25 5.49087C3.23922 5.28677 4.23956 5.1131 5.25 4.97089M5.25 4.97089L7.87036 15.6961C7.9922 16.1948 7.76419 16.7237 7.28114 16.8975C6.6468 17.1257 5.96292 17.25 5.25 17.25C4.53708 17.25 3.8532 17.1257 3.21886 16.8975C2.73581 16.7237 2.5078 16.1948 2.62964 15.6961L5.25 4.97089Z"
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
