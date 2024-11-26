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

  interface Props extends SVGAttributes<SVGSVGElement> {
    pauseDuration?: number;
    event?: 'hover' | 'click' | 'none';
    title?: TitleType;
    desc?: DescType;
    ariaLabel?: string;
    size?: number;
    color?: string;
    transitionParams?: DrawParams;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    color = 'currentColor',
    title,
    desc,
    ariaLabel = 'receipt outline',
    transitionParams = { duration: 500, delay: 0 },
    class: className,
    ...restProps
  }: Props = $props();

  const getDuration = (params?: DrawParams): number => {
    if (!params?.duration) return 0;
    if (typeof params.duration === 'function') {
      return params.duration(0);
    }
    return params.duration;
  };

  $effect(() => {
    visible = true;
    isAnimating = false;
  });

  let visible = $state(true);
  let totalDuration = $derived(getDuration(transitionParams) + pauseDuration);

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  let isAnimating = $state(false);

  const handleEvent = () => {
    // Only animate if event is not 'none'
    if (event === 'none' || isAnimating) return;

    isAnimating = true;
    visible = false;

    setTimeout(() => {
      visible = true;
      isAnimating = false;
    }, totalDuration);
  };

  const eventHandlers = $derived(
    event === 'none'
      ? {} // No event handlers when event is 'none'
      : event === 'hover'
        ? { onmouseenter: handleEvent, onclick: undefined }
        : {
            onclick: handleEvent,
            onmouseenter: undefined,
            onmouseover: undefined
          }
  );
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
  {...eventHandlers}
  width={size}
  height={size}
  fill={color}
  role={event === 'none' ? 'img' : 'button'}
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 512 512"
  class={className}
>
  {#if title?.id && title.title}
    <title id={title.id}>{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id={desc.id}>{desc.desc}</desc>
  {/if}
  {#if visible}
    <polyline
      transition:draw={transitionParams}
      points="160 336 160 48 192 64 224 48 255.94 64 288.31 48 320 64 351.79 48 383.72 64 416 48 448.01 64 480 48 480 272"
      style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
    /><path
      transition:draw={transitionParams}
      d="M480,272V384a80,80,0,0,1-80,80h0a80,80,0,0,1-80-80V336H48a15.86,15.86,0,0,0-16,16c0,64,6.74,112,80,112H400"
      style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
    /><line
      transition:draw={transitionParams}
      x1="224"
      y1="144"
      x2="416"
      y2="144"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    /><line
      transition:draw={transitionParams}
      x1="288"
      y1="224"
      x2="416"
      y2="224"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    />
  {/if}
</svg>
