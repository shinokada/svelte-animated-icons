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
    transitionParams?: DrawParams;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    role = 'img',
    color = 'currentColor',
    title,
    desc,
    ariaLabel = 'archive box',
    transitionParams = { duration: 800, delay: 0 },
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

  // Set CSS variable for the placeholder size
  $effect(() => {
    document.documentElement.style.setProperty('--size', `${size}px`);
  });
</script>

{#snippet iconsvg()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
    {role}
    width={size}
    height={size}
    fill={color}
    aria-label={ariaLabel}
    aria-describedby={hasDescription ? ariaDescribedby : undefined}
    viewBox="0 0 512 512"
  >
    {#if title?.id && title.title}
      <title id={title.id}>{title.title}</title>
    {/if}
    {#if desc?.id && desc.desc}
      <desc id={desc.id}>{desc.desc}</desc>
    {/if}

    <rect
      transition:draw={transitionParams}
      fill="none"
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      x="280.48"
      y="122.9"
      width="63.03"
      height="378.2"
      rx="31.52"
      transform="translate(-129.23 312) rotate(-45)"
    /><path
      transition:draw={transitionParams}
      d="M178.38,178.38h0a31.64,31.64,0,0,0,0,44.75L223.25,268,268,223.25l-44.87-44.87A31.64,31.64,0,0,0,178.38,178.38Z"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="48"
      y1="192"
      x2="96"
      y2="192"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="90.18"
      y1="90.18"
      x2="124.12"
      y2="124.12"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="192"
      y1="48"
      x2="192"
      y2="96"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="293.82"
      y1="90.18"
      x2="259.88"
      y2="124.12"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="124.12"
      y1="259.88"
      x2="90.18"
      y2="293.82"
    />
  </svg>
{/snippet}

{#if event === 'hover'}
  <button onmouseenter={handleEvent}>
    <div class="placeholder">
      {#if visible}
        {@render iconsvg()}
      {/if}
    </div>
  </button>
{:else if event === 'click'}
  <button onclick={handleEvent}>
    <div class="placeholder">
      {#if visible}
        {@render iconsvg()}
      {/if}
    </div>
  </button>
{:else}
  <div class="placeholder">
    {@render iconsvg()}
  </div>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  .placeholder {
    display: inline-block;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
  }
</style>
