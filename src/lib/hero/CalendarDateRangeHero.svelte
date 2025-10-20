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
    focusable?: 'true' | 'false' | 'auto';
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    color = 'currentColor',
    strokeWidth = 1.5,
    title,
    desc,
    focusable = 'false',
    ariaLabel,
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

  let ariaDescribedby = $derived(`${title?.id || ''} ${desc?.id || ''}`.trim());
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
  {focusable}
  aria-label={title?.id ? undefined : ariaLabel}
  aria-labelledby={title?.id || undefined}
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
      d="M6.7491 2.9945V5.24472M17.2494 2.99316V5.24338M2.99756 18.7434V7.49209C2.99756 6.24938 4.00496 5.24197 5.24766 5.24197H18.7475C19.9902 5.24197 20.9976 6.24938 20.9976 7.49209V18.7434M2.99756 18.7434C2.99756 19.9861 4.00496 20.9935 5.24766 20.9935H18.7475C19.9902 20.9935 20.9976 19.9861 20.9976 18.7434M2.99756 18.7434V11.2429C2.99756 10.0002 4.00496 8.99282 5.24766 8.99282H18.7475C19.9902 8.99282 20.9976 10.0002 20.9976 11.2429V18.7434M14.2475 12.7429H16.4975M7.49752 14.9932H11.9975M11.9997 12.7429H12.0053V12.7486H11.9997V12.7429ZM11.9989 17.2437H12.0046V17.2493H11.9989V17.2437ZM9.74858 17.2444H9.75421V17.25H9.74858V17.2444ZM7.49824 17.2437H7.50387V17.2493H7.49824V17.2437ZM14.2485 14.9969H14.2542V15.0025H14.2485V14.9969ZM14.2493 17.2444H14.255V17.25H14.2493V17.2444ZM16.4996 14.9955H16.5052V15.0011H16.4996V14.9955Z"
      stroke={color}
      stroke-width={strokeWidth}
      transition:draw={transitionParams}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {/if}
</svg>
