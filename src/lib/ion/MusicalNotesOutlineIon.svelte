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
    ariaLabel = 'musical notes outline',
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
    <path
      transition:draw={transitionParams}
      d="M192,218v-6c0-14.84,10-27,24.24-30.59l174.59-46.68A20,20,0,0,1,416,154V176"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    /><path
      transition:draw={transitionParams}
      d="M416,295.94v80c0,13.91-8.93,25.59-22,30l-22,8c-25.9,8.72-52-10.42-52-38h0a33.37,33.37,0,0,1,23-32l51-18.15c13.07-4.4,22-15.94,22-29.85V58a10,10,0,0,0-12.6-9.61L204,102a16.48,16.48,0,0,0-12,16v226c0,13.91-8.93,25.6-22,30l-52,18c-13.88,4.68-22,17.22-22,32h0c0,27.58,26.52,46.55,52,38l22-8c13.07-4.4,22-16.08,22-30v-80"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    />
  {/if}
</svg>
