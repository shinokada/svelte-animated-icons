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
    ariaLabel = 'heart dislike circle outline',
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
      d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
      style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
    /><path
      transition:draw={transitionParams}
      d="M333.2,297.69c18.28-23.39,27.06-47.43,26.79-73.37-.31-31.06-25.22-56.33-55.53-56.33-20.4,0-35,10.64-44.11,20.42a5.93,5.93,0,0,1-8.7,0c-9.11-9.78-23.71-20.42-44.11-20.42L206,168a4,4,0,0,0-2.75,6.84l124,123.21A3.92,3.92,0,0,0,333.2,297.69Z"
    /><path
      transition:draw={transitionParams}
      d="M158.84,221a4,4,0,0,0-6.82,2.72c0,.21,0,.43,0,.64-.28,27.1,9.31,52.13,29.3,76.5,9.38,11.44,26.4,29.73,65.7,56.41a15.93,15.93,0,0,0,18,0c5.15-3.49,9.9-6.84,14.31-10a4,4,0,0,0,.46-6.07Z"
    /><path
      transition:draw={transitionParams}
      d="M336,368a15.92,15.92,0,0,1-11.31-4.69l-176-176a16,16,0,0,1,22.62-22.62l176,176A16,16,0,0,1,336,368Z"
    />
  {/if}
</svg>
