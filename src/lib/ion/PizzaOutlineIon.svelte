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

    <path
      transition:draw={transitionParams}
      d="M404.76,123.08C358.37,104.18,309.69,96,256,96S149.9,105,107.1,122.68c-8.08,3.3-15.26,9-10.07,19.5C101.24,150.71,203,375,241.66,455a15.94,15.94,0,0,0,28.72,0L414.43,142.78C417.62,135.88,415.33,127.38,404.76,123.08Z"
      style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
    /><path
      transition:draw={transitionParams}
      d="M436.38,82.68C384.31,62.08,320.17,48,256,48S128.65,60.78,75.48,82.08C70.79,84,62,88.43,64.41,95.88L74.09,120c4,8.2,8.67,8.2,15.06,8.2,1.79,0,4.29-1,7.28-2.18A442.46,442.46,0,0,1,256,96c56.76,0,114.91,12,159.6,30,3.59,1.4,5.59,2.18,7.28,2.18,6.58,0,10.38,2.19,15-8.1L447.65,96C449.66,90,442.66,85.18,436.38,82.68Z"
      style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
    /><circle transition:draw={transitionParams} cx="192" cy="192" r="32" /><circle
      transition:draw={transitionParams}
      cx="320"
      cy="208"
      r="32"
    /><circle transition:draw={transitionParams} cx="256" cy="320" r="32" />
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
    display: inline-flex;
    line-height: 0;
  }
  .placeholder {
    display: flex;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
  }
</style>
