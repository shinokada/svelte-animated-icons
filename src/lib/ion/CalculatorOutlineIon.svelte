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
    transitionParams?: DrawParams;
  }

  let {
    pauseDuration = 300,
    event = 'onmouseenter',
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
            x="112"
            y="48"
            width="288"
            height="416"
            rx="32"
            ry="32"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="160.01"
            y="112"
            width="191.99"
            height="64"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><circle transition:draw={transitionParams} cx="168" cy="248" r="24" /><circle
            transition:draw={transitionParams}
            cx="256"
            cy="248"
            r="24"
          /><circle transition:draw={transitionParams} cx="344" cy="248" r="24" /><circle
            transition:draw={transitionParams}
            cx="168"
            cy="328"
            r="24"
          /><circle transition:draw={transitionParams} cx="256" cy="328" r="24" /><circle
            transition:draw={transitionParams}
            cx="168"
            cy="408"
            r="24"
          /><circle transition:draw={transitionParams} cx="256" cy="408" r="24" /><rect
            transition:draw={transitionParams}
            x="320"
            y="304"
            width="48"
            height="128"
            rx="24"
            ry="24"
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
            x="112"
            y="48"
            width="288"
            height="416"
            rx="32"
            ry="32"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="160.01"
            y="112"
            width="191.99"
            height="64"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><circle transition:draw={transitionParams} cx="168" cy="248" r="24" /><circle
            transition:draw={transitionParams}
            cx="256"
            cy="248"
            r="24"
          /><circle transition:draw={transitionParams} cx="344" cy="248" r="24" /><circle
            transition:draw={transitionParams}
            cx="168"
            cy="328"
            r="24"
          /><circle transition:draw={transitionParams} cx="256" cy="328" r="24" /><circle
            transition:draw={transitionParams}
            cx="168"
            cy="408"
            r="24"
          /><circle transition:draw={transitionParams} cx="256" cy="408" r="24" /><rect
            transition:draw={transitionParams}
            x="320"
            y="304"
            width="48"
            height="128"
            rx="24"
            ry="24"
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
        x="112"
        y="48"
        width="288"
        height="416"
        rx="32"
        ry="32"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><rect
        transition:draw={transitionParams}
        x="160.01"
        y="112"
        width="191.99"
        height="64"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><circle transition:draw={transitionParams} cx="168" cy="248" r="24" /><circle
        transition:draw={transitionParams}
        cx="256"
        cy="248"
        r="24"
      /><circle transition:draw={transitionParams} cx="344" cy="248" r="24" /><circle
        transition:draw={transitionParams}
        cx="168"
        cy="328"
        r="24"
      /><circle transition:draw={transitionParams} cx="256" cy="328" r="24" /><circle
        transition:draw={transitionParams}
        cx="168"
        cy="408"
        r="24"
      /><circle transition:draw={transitionParams} cx="256" cy="408" r="24" /><rect
        transition:draw={transitionParams}
        x="320"
        y="304"
        width="48"
        height="128"
        rx="24"
        ry="24"
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
