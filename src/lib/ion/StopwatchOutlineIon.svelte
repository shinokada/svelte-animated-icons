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
          <line
            transition:draw={transitionParams}
            x1="256"
            y1="232"
            x2="256"
            y2="152"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="256"
            y1="88"
            x2="256"
            y2="72"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
          /><line
            transition:draw={transitionParams}
            x1="132"
            y1="132"
            x2="120"
            y2="120"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
          /><circle
            transition:draw={transitionParams}
            cx="256"
            cy="272"
            r="32"
            style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
          /><path
            transition:draw={transitionParams}
            d="M256,96A176,176,0,1,0,432,272,176,176,0,0,0,256,96Z"
            style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
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
          <line
            transition:draw={transitionParams}
            x1="256"
            y1="232"
            x2="256"
            y2="152"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          /><line
            transition:draw={transitionParams}
            x1="256"
            y1="88"
            x2="256"
            y2="72"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
          /><line
            transition:draw={transitionParams}
            x1="132"
            y1="132"
            x2="120"
            y2="120"
            style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
          /><circle
            transition:draw={transitionParams}
            cx="256"
            cy="272"
            r="32"
            style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
          /><path
            transition:draw={transitionParams}
            d="M256,96A176,176,0,1,0,432,272,176,176,0,0,0,256,96Z"
            style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
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
      <line
        transition:draw={transitionParams}
        x1="256"
        y1="232"
        x2="256"
        y2="152"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><line
        transition:draw={transitionParams}
        x1="256"
        y1="88"
        x2="256"
        y2="72"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      /><line
        transition:draw={transitionParams}
        x1="132"
        y1="132"
        x2="120"
        y2="120"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"
      /><circle
        transition:draw={transitionParams}
        cx="256"
        cy="272"
        r="32"
        style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M256,96A176,176,0,1,0,432,272,176,176,0,0,0,256,96Z"
        style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
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
