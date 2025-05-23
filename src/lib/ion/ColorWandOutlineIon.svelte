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
    ariaLabel = 'color wand outline',
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
    <rect
      transition:draw={transitionParams}
      fill="none"
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      x="280.48"
      y="122.9"
      width="63.03"
      height="378.2"
      rx="31.52"
      transform="translate(-129.23 312) rotate(-45)"
    /><path
      transition:draw={transitionParams}
      d="M178.38,178.38h0a31.64,31.64,0,0,0,0,44.75L223.25,268,268,223.25l-44.87-44.87A31.64,31.64,0,0,0,178.38,178.38Z"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="48"
      y1="192"
      x2="96"
      y2="192"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="90.18"
      y1="90.18"
      x2="124.12"
      y2="124.12"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="192"
      y1="48"
      x2="192"
      y2="96"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="293.82"
      y1="90.18"
      x2="259.88"
      y2="124.12"
    /><line
      transition:draw={transitionParams}
      stroke={color}
      stroke-miterlimit="10"
      stroke-width="32"
      stroke-linecap="round"
      x1="124.12"
      y1="259.88"
      x2="90.18"
      y2="293.82"
    />
  {/if}
</svg>
