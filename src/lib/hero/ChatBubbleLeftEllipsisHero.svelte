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
            d="M8.625 9.75C8.625 9.95711 8.45711 10.125 8.25 10.125C8.04289 10.125 7.875 9.95711 7.875 9.75C7.875 9.54289 8.04289 9.375 8.25 9.375C8.45711 9.375 8.625 9.54289 8.625 9.75ZM8.625 9.75H8.25M12.375 9.75C12.375 9.95711 12.2071 10.125 12 10.125C11.7929 10.125 11.625 9.95711 11.625 9.75C11.625 9.54289 11.7929 9.375 12 9.375C12.2071 9.375 12.375 9.54289 12.375 9.75ZM12.375 9.75H12M16.125 9.75C16.125 9.95711 15.9571 10.125 15.75 10.125C15.5429 10.125 15.375 9.95711 15.375 9.75C15.375 9.54289 15.5429 9.375 15.75 9.375C15.9571 9.375 16.125 9.54289 16.125 9.75ZM16.125 9.75H15.75M2.25 12.7593C2.25 14.3604 3.37341 15.754 4.95746 15.987C6.04357 16.1467 7.14151 16.27 8.25 16.3556V21L12.4335 16.8165C12.6402 16.6098 12.9193 16.4923 13.2116 16.485C15.1872 16.4361 17.1331 16.2678 19.0425 15.9871C20.6266 15.7542 21.75 14.3606 21.75 12.7595V6.74056C21.75 5.13946 20.6266 3.74583 19.0425 3.51293C16.744 3.17501 14.3926 3 12.0003 3C9.60776 3 7.25612 3.17504 4.95747 3.51302C3.37342 3.74593 2.25 5.13956 2.25 6.74064V12.7593Z"
            stroke={color}
            stroke-width={strokeWidth}
            transition:draw={shouldAnimate ? transitionParams : undefined}
            stroke-linecap="round"
            stroke-linejoin="round"
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
            d="M8.625 9.75C8.625 9.95711 8.45711 10.125 8.25 10.125C8.04289 10.125 7.875 9.95711 7.875 9.75C7.875 9.54289 8.04289 9.375 8.25 9.375C8.45711 9.375 8.625 9.54289 8.625 9.75ZM8.625 9.75H8.25M12.375 9.75C12.375 9.95711 12.2071 10.125 12 10.125C11.7929 10.125 11.625 9.95711 11.625 9.75C11.625 9.54289 11.7929 9.375 12 9.375C12.2071 9.375 12.375 9.54289 12.375 9.75ZM12.375 9.75H12M16.125 9.75C16.125 9.95711 15.9571 10.125 15.75 10.125C15.5429 10.125 15.375 9.95711 15.375 9.75C15.375 9.54289 15.5429 9.375 15.75 9.375C15.9571 9.375 16.125 9.54289 16.125 9.75ZM16.125 9.75H15.75M2.25 12.7593C2.25 14.3604 3.37341 15.754 4.95746 15.987C6.04357 16.1467 7.14151 16.27 8.25 16.3556V21L12.4335 16.8165C12.6402 16.6098 12.9193 16.4923 13.2116 16.485C15.1872 16.4361 17.1331 16.2678 19.0425 15.9871C20.6266 15.7542 21.75 14.3606 21.75 12.7595V6.74056C21.75 5.13946 20.6266 3.74583 19.0425 3.51293C16.744 3.17501 14.3926 3 12.0003 3C9.60776 3 7.25612 3.17504 4.95747 3.51302C3.37342 3.74593 2.25 5.13956 2.25 6.74064V12.7593Z"
            stroke={color}
            stroke-width={strokeWidth}
            transition:draw={shouldAnimate ? transitionParams : undefined}
            stroke-linecap="round"
            stroke-linejoin="round"
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
        d="M8.625 9.75C8.625 9.95711 8.45711 10.125 8.25 10.125C8.04289 10.125 7.875 9.95711 7.875 9.75C7.875 9.54289 8.04289 9.375 8.25 9.375C8.45711 9.375 8.625 9.54289 8.625 9.75ZM8.625 9.75H8.25M12.375 9.75C12.375 9.95711 12.2071 10.125 12 10.125C11.7929 10.125 11.625 9.95711 11.625 9.75C11.625 9.54289 11.7929 9.375 12 9.375C12.2071 9.375 12.375 9.54289 12.375 9.75ZM12.375 9.75H12M16.125 9.75C16.125 9.95711 15.9571 10.125 15.75 10.125C15.5429 10.125 15.375 9.95711 15.375 9.75C15.375 9.54289 15.5429 9.375 15.75 9.375C15.9571 9.375 16.125 9.54289 16.125 9.75ZM16.125 9.75H15.75M2.25 12.7593C2.25 14.3604 3.37341 15.754 4.95746 15.987C6.04357 16.1467 7.14151 16.27 8.25 16.3556V21L12.4335 16.8165C12.6402 16.6098 12.9193 16.4923 13.2116 16.485C15.1872 16.4361 17.1331 16.2678 19.0425 15.9871C20.6266 15.7542 21.75 14.3606 21.75 12.7595V6.74056C21.75 5.13946 20.6266 3.74583 19.0425 3.51293C16.744 3.17501 14.3926 3 12.0003 3C9.60776 3 7.25612 3.17504 4.95747 3.51302C3.37342 3.74593 2.25 5.13956 2.25 6.74064V12.7593Z"
        stroke={color}
        stroke-width={strokeWidth}
        transition:draw={shouldAnimate ? transitionParams : undefined}
        stroke-linecap="round"
        stroke-linejoin="round"
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
