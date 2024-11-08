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
            d="M6.7491 2.9945V5.24472M17.2494 2.99316V5.24338M2.99756 18.7434V7.49209C2.99756 6.24938 4.00496 5.24197 5.24766 5.24197H18.7475C19.9902 5.24197 20.9976 6.24938 20.9976 7.49209V18.7434M2.99756 18.7434C2.99756 19.9861 4.00496 20.9935 5.24766 20.9935H18.7475C19.9902 20.9935 20.9976 19.9861 20.9976 18.7434M2.99756 18.7434V11.2429C2.99756 10.0002 4.00496 8.99282 5.24766 8.99282H18.7475C19.9902 8.99282 20.9976 10.0002 20.9976 11.2429V18.7434M14.2475 12.7429H16.4975M7.49752 14.9932H11.9975M11.9997 12.7429H12.0053V12.7486H11.9997V12.7429ZM11.9989 17.2437H12.0046V17.2493H11.9989V17.2437ZM9.74858 17.2444H9.75421V17.25H9.74858V17.2444ZM7.49824 17.2437H7.50387V17.2493H7.49824V17.2437ZM14.2485 14.9969H14.2542V15.0025H14.2485V14.9969ZM14.2493 17.2444H14.255V17.25H14.2493V17.2444ZM16.4996 14.9955H16.5052V15.0011H16.4996V14.9955Z"
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
            d="M6.7491 2.9945V5.24472M17.2494 2.99316V5.24338M2.99756 18.7434V7.49209C2.99756 6.24938 4.00496 5.24197 5.24766 5.24197H18.7475C19.9902 5.24197 20.9976 6.24938 20.9976 7.49209V18.7434M2.99756 18.7434C2.99756 19.9861 4.00496 20.9935 5.24766 20.9935H18.7475C19.9902 20.9935 20.9976 19.9861 20.9976 18.7434M2.99756 18.7434V11.2429C2.99756 10.0002 4.00496 8.99282 5.24766 8.99282H18.7475C19.9902 8.99282 20.9976 10.0002 20.9976 11.2429V18.7434M14.2475 12.7429H16.4975M7.49752 14.9932H11.9975M11.9997 12.7429H12.0053V12.7486H11.9997V12.7429ZM11.9989 17.2437H12.0046V17.2493H11.9989V17.2437ZM9.74858 17.2444H9.75421V17.25H9.74858V17.2444ZM7.49824 17.2437H7.50387V17.2493H7.49824V17.2437ZM14.2485 14.9969H14.2542V15.0025H14.2485V14.9969ZM14.2493 17.2444H14.255V17.25H14.2493V17.2444ZM16.4996 14.9955H16.5052V15.0011H16.4996V14.9955Z"
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
        d="M6.7491 2.9945V5.24472M17.2494 2.99316V5.24338M2.99756 18.7434V7.49209C2.99756 6.24938 4.00496 5.24197 5.24766 5.24197H18.7475C19.9902 5.24197 20.9976 6.24938 20.9976 7.49209V18.7434M2.99756 18.7434C2.99756 19.9861 4.00496 20.9935 5.24766 20.9935H18.7475C19.9902 20.9935 20.9976 19.9861 20.9976 18.7434M2.99756 18.7434V11.2429C2.99756 10.0002 4.00496 8.99282 5.24766 8.99282H18.7475C19.9902 8.99282 20.9976 10.0002 20.9976 11.2429V18.7434M14.2475 12.7429H16.4975M7.49752 14.9932H11.9975M11.9997 12.7429H12.0053V12.7486H11.9997V12.7429ZM11.9989 17.2437H12.0046V17.2493H11.9989V17.2437ZM9.74858 17.2444H9.75421V17.25H9.74858V17.2444ZM7.49824 17.2437H7.50387V17.2493H7.49824V17.2437ZM14.2485 14.9969H14.2542V15.0025H14.2485V14.9969ZM14.2493 17.2444H14.255V17.25H14.2493V17.2444ZM16.4996 14.9955H16.5052V15.0011H16.4996V14.9955Z"
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
