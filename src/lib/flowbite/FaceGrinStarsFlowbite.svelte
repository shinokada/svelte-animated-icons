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
    event?: 'onmouseenter' | 'onclick' | 'none';
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
    event = 'onmouseenter',
    size = 24,
    role = 'img',
    color = 'currentColor',
    strokeWidth = 2,
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
  let shouldAnimate = $state(true);
  let totalDuration = $state(getDuration(transitionParams) + pauseDuration);

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  const handleEvent = () => {
    if (!visible) return;
    visible = false;
    setTimeout(() => {
      shouldAnimate = true;
      visible = true;
    }, totalDuration);
  };

  $effect(() => {
    visible = true;
    shouldAnimate = true;
  });

  // Set CSS variable for the placeholder size
  $effect(() => {
    document.documentElement.style.setProperty('--size', `${size}px`);
  });
</script>

{#if event === 'onmouseenter'}
  <button onmouseenter={handleEvent}>
    <div class="placeholder">
      {#if visible}
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
            transition:draw={shouldAnimate ? transitionParams : undefined}
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={strokeWidth}
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          />
          <path
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={strokeWidth}
            d="M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z"
          />
          <path
            fill="currentColor"
            d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
          />
          <path
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
          />
        </svg>
      {/if}
    </div>
  </button>
{:else if event === 'onclick'}
  <button onclick={handleEvent}>
    <div class="placeholder">
      {#if visible}
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
            transition:draw={shouldAnimate ? transitionParams : undefined}
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={strokeWidth}
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          />
          <path
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={strokeWidth}
            d="M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z"
          />
          <path
            fill="currentColor"
            d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
          />
          <path
            stroke={color}
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
          />
        </svg>
      {/if}
    </div>
  </button>
{:else}
  <div class="placeholder">
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
        transition:draw={shouldAnimate ? transitionParams : undefined}
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={strokeWidth}
        d="M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z"
      />
      <path
        fill="currentColor"
        d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
      />
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
      />
    </svg>
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
