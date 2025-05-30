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
    strokeWidth?: number;
    transitionParams?: DrawParams;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    title,
    desc,
    ariaLabel = 'teddy bear',
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
  fill="none"
  role={event === 'none' ? 'img' : 'button'}
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 24 24"
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
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={strokeWidth}
      d="M7.5 15C6.11929 15 5 16.1193 5 17.5S6.11929 20 7.5 20s2.5-1.1193 2.5-2.5S8.88071 15 7.5 15Zm0 0 1.67693-4.1693m6.69787-3.82761C17.0117 7.00309 18 6.10457 18 5c0-1.10457-.9217-2-2.0586-2-.8963 0-1.6853.74312-1.9679 1.51992M8.12719 6.99544C7.00181 6.99544 6 6.10457 6 5s.9123-2 2.03768-2c.93446 0 1.70666.67806 1.94698 1.51992M14 18h-4m6-3-1.4578-3.8912m-6.63506 2.8789-.44889.1929C6.24889 14.5837 5 13.6836 5 12.4088c0-.8339.55278-1.5667 1.35457-1.7958L8.5 10m7.1055 3.9877.4133.1446c1.2127.4242 2.4812-.476 2.4812-1.7607 0-.8159-.5302-1.5371-1.309-1.7805l-1.7458-.5575M12 9.06243v-.01m-1.3779-1.55397v-.01m3.0337.01v-.01M16 8c0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4 0-2.20914 1.79086-4 4-4 2.2091 0 4 1.79086 4 4Zm3 9.5c0 1.3807-1.1193 2.5-2.5 2.5S14 18.8807 14 17.5s1.1193-2.5 2.5-2.5 2.5 1.1193 2.5 2.5Z"
    />
  {/if}
</svg>
