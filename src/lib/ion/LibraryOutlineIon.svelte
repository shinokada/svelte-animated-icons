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
            x="32"
            y="96"
            width="64"
            height="368"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="112"
            y1="224"
            x2="240"
            y2="224"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="112"
            y1="400"
            x2="240"
            y2="400"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="112"
            y="160"
            width="128"
            height="304"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="256"
            y="48"
            width="96"
            height="416"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><path
            transition:draw={transitionParams}
            d="M422.46,96.11l-40.4,4.25c-11.12,1.17-19.18,11.57-17.93,23.1l34.92,321.59c1.26,11.53,11.37,20,22.49,18.84l40.4-4.25c11.12-1.17,19.18-11.57,17.93-23.1L445,115C443.69,103.42,433.58,94.94,422.46,96.11Z"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
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
            x="32"
            y="96"
            width="64"
            height="368"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="112"
            y1="224"
            x2="240"
            y2="224"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="112"
            y1="400"
            x2="240"
            y2="400"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="112"
            y="160"
            width="128"
            height="304"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><rect
            transition:draw={transitionParams}
            x="256"
            y="48"
            width="96"
            height="416"
            rx="16"
            ry="16"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
          /><path
            transition:draw={transitionParams}
            d="M422.46,96.11l-40.4,4.25c-11.12,1.17-19.18,11.57-17.93,23.1l34.92,321.59c1.26,11.53,11.37,20,22.49,18.84l40.4-4.25c11.12-1.17,19.18-11.57,17.93-23.1L445,115C443.69,103.42,433.58,94.94,422.46,96.11Z"
            style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
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
        x="32"
        y="96"
        width="64"
        height="368"
        rx="16"
        ry="16"
        style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
      /><line
        transition:draw={transitionParams}
        x1="112"
        y1="224"
        x2="240"
        y2="224"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><line
        transition:draw={transitionParams}
        x1="112"
        y1="400"
        x2="240"
        y2="400"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><rect
        transition:draw={transitionParams}
        x="112"
        y="160"
        width="128"
        height="304"
        rx="16"
        ry="16"
        style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
      /><rect
        transition:draw={transitionParams}
        x="256"
        y="48"
        width="96"
        height="416"
        rx="16"
        ry="16"
        style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M422.46,96.11l-40.4,4.25c-11.12,1.17-19.18,11.57-17.93,23.1l34.92,321.59c1.26,11.53,11.37,20,22.49,18.84l40.4-4.25c11.12-1.17,19.18-11.57,17.93-23.1L445,115C443.69,103.42,433.58,94.94,422.46,96.11Z"
        style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
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
