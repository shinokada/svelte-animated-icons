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
            d="M9.14314 17.0818C10.0799 17.1929 11.0332 17.25 11.9998 17.25C12.3306 17.25 12.6599 17.2433 12.9874 17.2301M9.14314 17.0818C7.24843 16.857 5.4214 16.4116 3.68848 15.7719C5.02539 14.2879 5.87549 12.3567 5.98723 10.2299M9.14314 17.0818C9.05019 17.3712 9 17.6797 9 18C9 19.6569 10.3431 21 12 21C13.2864 21 14.3837 20.1903 14.8101 19.0527M16.7749 16.7749L21 21M16.7749 16.7749C17.9894 16.5298 19.1706 16.1929 20.3111 15.7719C18.8743 14.177 17.9998 12.0656 17.9998 9.75V9.04919L18 9C18 5.68629 15.3137 3 12 3C9.5667 3 7.47171 4.44849 6.53026 6.53026M16.7749 16.7749L6.53026 6.53026M3 3L6.53026 6.53026"
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
            d="M9.14314 17.0818C10.0799 17.1929 11.0332 17.25 11.9998 17.25C12.3306 17.25 12.6599 17.2433 12.9874 17.2301M9.14314 17.0818C7.24843 16.857 5.4214 16.4116 3.68848 15.7719C5.02539 14.2879 5.87549 12.3567 5.98723 10.2299M9.14314 17.0818C9.05019 17.3712 9 17.6797 9 18C9 19.6569 10.3431 21 12 21C13.2864 21 14.3837 20.1903 14.8101 19.0527M16.7749 16.7749L21 21M16.7749 16.7749C17.9894 16.5298 19.1706 16.1929 20.3111 15.7719C18.8743 14.177 17.9998 12.0656 17.9998 9.75V9.04919L18 9C18 5.68629 15.3137 3 12 3C9.5667 3 7.47171 4.44849 6.53026 6.53026M16.7749 16.7749L6.53026 6.53026M3 3L6.53026 6.53026"
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
        d="M9.14314 17.0818C10.0799 17.1929 11.0332 17.25 11.9998 17.25C12.3306 17.25 12.6599 17.2433 12.9874 17.2301M9.14314 17.0818C7.24843 16.857 5.4214 16.4116 3.68848 15.7719C5.02539 14.2879 5.87549 12.3567 5.98723 10.2299M9.14314 17.0818C9.05019 17.3712 9 17.6797 9 18C9 19.6569 10.3431 21 12 21C13.2864 21 14.3837 20.1903 14.8101 19.0527M16.7749 16.7749L21 21M16.7749 16.7749C17.9894 16.5298 19.1706 16.1929 20.3111 15.7719C18.8743 14.177 17.9998 12.0656 17.9998 9.75V9.04919L18 9C18 5.68629 15.3137 3 12 3C9.5667 3 7.47171 4.44849 6.53026 6.53026M16.7749 16.7749L6.53026 6.53026M3 3L6.53026 6.53026"
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
