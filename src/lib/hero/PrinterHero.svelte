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
            d="M6.72012 13.8287C6.47944 13.8589 6.23939 13.8911 6 13.9253M6.72012 13.8287C8.44957 13.6118 10.2117 13.5 12 13.5C13.7883 13.5 15.5504 13.6118 17.2799 13.8287M6.72012 13.8287L6.34091 18M17.2799 13.8287C17.5206 13.8589 17.7606 13.8911 18 13.9253M17.2799 13.8287L17.6591 18M17.6591 18L17.8885 20.5231C17.9484 21.182 17.4296 21.75 16.7681 21.75H7.23191C6.57038 21.75 6.05164 21.182 6.11153 20.5231L6.34091 18M17.6591 18H18.75C19.9926 18 21 16.9926 21 15.75V9.45569C21 8.37475 20.2321 7.44082 19.1631 7.28086C18.5293 7.18604 17.8916 7.10361 17.25 7.03381M6.34091 18H5.25C4.00736 18 3 16.9926 3 15.75V9.45569C3 8.37475 3.7679 7.44082 4.83694 7.28086C5.47066 7.18604 6.10843 7.10361 6.75 7.03381M17.25 7.03381C15.5258 6.84625 13.7741 6.75 12 6.75C10.2259 6.75 8.47423 6.84625 6.75 7.03381M17.25 7.03381V3.375C17.25 2.75368 16.7463 2.25 16.125 2.25H7.875C7.25368 2.25 6.75 2.75368 6.75 3.375V7.03381M18 10.5H18.0075V10.5075H18V10.5ZM15 10.5H15.0075V10.5075H15V10.5Z"
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
            d="M6.72012 13.8287C6.47944 13.8589 6.23939 13.8911 6 13.9253M6.72012 13.8287C8.44957 13.6118 10.2117 13.5 12 13.5C13.7883 13.5 15.5504 13.6118 17.2799 13.8287M6.72012 13.8287L6.34091 18M17.2799 13.8287C17.5206 13.8589 17.7606 13.8911 18 13.9253M17.2799 13.8287L17.6591 18M17.6591 18L17.8885 20.5231C17.9484 21.182 17.4296 21.75 16.7681 21.75H7.23191C6.57038 21.75 6.05164 21.182 6.11153 20.5231L6.34091 18M17.6591 18H18.75C19.9926 18 21 16.9926 21 15.75V9.45569C21 8.37475 20.2321 7.44082 19.1631 7.28086C18.5293 7.18604 17.8916 7.10361 17.25 7.03381M6.34091 18H5.25C4.00736 18 3 16.9926 3 15.75V9.45569C3 8.37475 3.7679 7.44082 4.83694 7.28086C5.47066 7.18604 6.10843 7.10361 6.75 7.03381M17.25 7.03381C15.5258 6.84625 13.7741 6.75 12 6.75C10.2259 6.75 8.47423 6.84625 6.75 7.03381M17.25 7.03381V3.375C17.25 2.75368 16.7463 2.25 16.125 2.25H7.875C7.25368 2.25 6.75 2.75368 6.75 3.375V7.03381M18 10.5H18.0075V10.5075H18V10.5ZM15 10.5H15.0075V10.5075H15V10.5Z"
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
        d="M6.72012 13.8287C6.47944 13.8589 6.23939 13.8911 6 13.9253M6.72012 13.8287C8.44957 13.6118 10.2117 13.5 12 13.5C13.7883 13.5 15.5504 13.6118 17.2799 13.8287M6.72012 13.8287L6.34091 18M17.2799 13.8287C17.5206 13.8589 17.7606 13.8911 18 13.9253M17.2799 13.8287L17.6591 18M17.6591 18L17.8885 20.5231C17.9484 21.182 17.4296 21.75 16.7681 21.75H7.23191C6.57038 21.75 6.05164 21.182 6.11153 20.5231L6.34091 18M17.6591 18H18.75C19.9926 18 21 16.9926 21 15.75V9.45569C21 8.37475 20.2321 7.44082 19.1631 7.28086C18.5293 7.18604 17.8916 7.10361 17.25 7.03381M6.34091 18H5.25C4.00736 18 3 16.9926 3 15.75V9.45569C3 8.37475 3.7679 7.44082 4.83694 7.28086C5.47066 7.18604 6.10843 7.10361 6.75 7.03381M17.25 7.03381C15.5258 6.84625 13.7741 6.75 12 6.75C10.2259 6.75 8.47423 6.84625 6.75 7.03381M17.25 7.03381V3.375C17.25 2.75368 16.7463 2.25 16.125 2.25H7.875C7.25368 2.25 6.75 2.75368 6.75 3.375V7.03381M18 10.5H18.0075V10.5075H18V10.5ZM15 10.5H15.0075V10.5075H15V10.5Z"
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
