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
    focusOutlineWidth?: string;
    focusOutlineColor?: string;
    focusOutlineOffset?: string;
    focusOutlineStyle?: string;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    role = 'img',
    color = 'currentColor',
    title,
    desc,
    ariaLabel = 'fast food outline',
    transitionParams = { duration: 800, delay: 0 },
    focusOutlineWidth = '1px',
    focusOutlineColor = 'currentColor',
    focusOutlineOffset = '1px',
    focusOutlineStyle = 'solid',
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

  const buttonId = crypto.randomUUID();
  let focusStyles = $derived(`
    --focus-outline-width: ${focusOutlineWidth};
    --focus-outline-color: ${focusOutlineColor};
    --focus-outline-offset: ${focusOutlineOffset};
    --focus-outline-style: ${focusOutlineStyle};
  `);
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
    class="svg-icon"
  >
    {#if title?.id && title.title}
      <title id={title.id}>{title.title}</title>
    {/if}
    {#if desc?.id && desc.desc}
      <desc id={desc.id}>{desc.desc}</desc>
    {/if}
    {#if visible}
      <path
        transition:draw={transitionParams}
        d="M322,416c0,35.35-20.65,64-56,64H134c-35.35,0-56-28.65-56-64"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M336,336c17.67,0,32,17.91,32,40h0c0,22.09-14.33,40-32,40H64c-17.67,0-32-17.91-32-40h0c0-22.09,14.33-40,32-40"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M344,336H179.31a8,8,0,0,0-5.65,2.34l-26.83,26.83a4,4,0,0,1-5.66,0l-26.83-26.83a8,8,0,0,0-5.65-2.34H56a24,24,0,0,1-24-24h0a24,24,0,0,1,24-24H344a24,24,0,0,1,24,24h0A24,24,0,0,1,344,336Z"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M64,276v-.22c0-55,45-83.78,100-83.78h72c55,0,100,29,100,84v-.22"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><line
        transition:draw={transitionParams}
        x1="241"
        y1="112"
        x2="248.44"
        y2="175.97"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><path
        transition:draw={transitionParams}
        d="M256,480H395.31a32,32,0,0,0,31.91-29.61L463,112"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      /><polyline
        transition:draw={transitionParams}
        points="368 112 384 48 431 32"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      /><line
        transition:draw={transitionParams}
        x1="224"
        y1="112"
        x2="480"
        y2="112"
        style="fill:none;stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
      />
    {/if}
  </svg>
{/snippet}

{#if event === 'hover'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onmouseenter={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else if event === 'click'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onclick={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else}
  <div class="icon-wrapper" role="img" aria-label={ariaLabel} style={focusStyles}>
    {@render iconsvg()}
  </div>
{/if}

<style>
  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
    width: var(--size, 24px);
    height: var(--size, 24px);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    line-height: 0;
  }

  .icon-wrapper:focus {
    outline-width: var(--focus-outline-width);
    outline-color: var(--focus-outline-color);
    outline-offset: var(--focus-outline-offset);
    outline-style: var(--focus-outline-style);
  }

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
