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
    ariaLabel = 'binoculars outline',
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
    fill="none"
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
    {#if visible}
      <circle
        transition:draw={transitionParams}
        cx="392"
        cy="344"
        r="88"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        transition:draw={transitionParams}
        cx="120"
        cy="344"
        r="88"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        transition:draw={transitionParams}
        d="M208 344V128C208 101.5 192 80 164 80C129 80 117.5 101.5 107 128C107 128 58.5 255.833 36 317.5"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        transition:draw={transitionParams}
        d="M208 184C208 184 224.5 176 256 176C287.5 176 304 184 304 184"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        transition:draw={transitionParams}
        d="M208 272C208 272 224.5 264 256 264C287.5 264 304 272 304 272"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        transition:draw={transitionParams}
        d="M304 344V128C304 101.5 320 80 348 80C383 80 394.5 101.5 405 128C405 128 453.5 255.833 476 317.5"
        stroke={color}
        stroke-width="32"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/if}
  </svg>
{/snippet}

{#if event === 'hover'}
  <button onmouseenter={handleEvent}>
    <div class="icon-wrapper">
      {@render iconsvg()}
    </div>
  </button>
{:else if event === 'click'}
  <button onclick={handleEvent}>
    <div class="icon-wrapper">
      {@render iconsvg()}
    </div>
  </button>
{:else}
  <div class="icon-wrapper">
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
    display: inline-flex;
    line-height: 0;
  }

  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
    width: var(--size, 24px);
    height: var(--size, 24px);
  }

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
