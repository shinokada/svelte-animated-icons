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
    ariaLabel = 'qr code outline',
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
      x="336"
      y="336"
      width="80"
      height="80"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="272"
      y="272"
      width="64"
      height="64"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="416"
      y="416"
      width="64"
      height="64"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="432"
      y="272"
      width="48"
      height="48"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="272"
      y="432"
      width="48"
      height="48"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="336"
      y="96"
      width="80"
      height="80"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="288"
      y="48"
      width="176"
      height="176"
      rx="16"
      ry="16"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    /><rect
      transition:draw={transitionParams}
      x="96"
      y="96"
      width="80"
      height="80"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="48"
      y="48"
      width="176"
      height="176"
      rx="16"
      ry="16"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    /><rect
      transition:draw={transitionParams}
      x="96"
      y="336"
      width="80"
      height="80"
      rx="8"
      ry="8"
    /><rect
      transition:draw={transitionParams}
      x="48"
      y="288"
      width="176"
      height="176"
      rx="16"
      ry="16"
      style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
    />
  {/if}
</svg>
