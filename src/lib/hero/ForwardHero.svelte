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
    fill="none"
    aria-label={ariaLabel}
    aria-describedby={hasDescription ? ariaDescribedby : undefined}
    viewBox="0 0 24 24"
  >
    {#if title?.id && title.title}
      <title id={title.id}>{title.title}</title>
    {/if}
    {#if desc?.id && desc.desc}
      <desc id={desc.id}>{desc.desc}</desc>
    {/if}

    <path
      d="M3 8.68867C3 7.82487 3.93317 7.28334 4.68316 7.7119L11.7906 11.7733C12.5464 12.2052 12.5464 13.295 11.7906 13.7269L4.68316 17.7883C3.93317 18.2169 3 17.6753 3 16.8115V8.68867Z"
      stroke={color}
      stroke-width={strokeWidth}
      transition:draw={transitionParams}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.75 8.68867C12.75 7.82487 13.6832 7.28334 14.4332 7.7119L21.5406 11.7733C22.2964 12.2052 22.2964 13.295 21.5406 13.7269L14.4332 17.7883C13.6832 18.2169 12.75 17.6753 12.75 16.8115V8.68867Z"
      stroke={color}
      stroke-width={strokeWidth}
      transition:draw={transitionParams}
      stroke-linecap="round"
      stroke-linejoin="round"
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
    display: inline-flex;
    line-height: 0;
  }
  .placeholder {
    display: flex;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
  }
</style>
