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
    strokeWidth = 1.5,
    title,
    desc,
    ariaLabel = 'scissors',
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
      d="M7.84786 8.25005L9.38443 9.13719M7.84786 8.25005C7.01943 9.68493 5.18501 10.1765 3.75013 9.34807C2.31526 8.51965 1.82363 6.68488 2.65206 5.25C3.48049 3.81512 5.31526 3.32349 6.75013 4.15192C8.18501 4.98035 8.67629 6.81517 7.84786 8.25005ZM9.38443 9.13719C10.043 9.51741 10.4538 10.2153 10.4666 10.9756C10.4725 11.3272 10.5207 11.6706 10.607 12.0001M9.38443 9.13719L11.4608 10.336M7.84786 15.7501L9.38443 14.863M7.84786 15.7501C8.67629 17.185 8.18501 19.0196 6.75013 19.8481C5.31526 20.6765 3.48049 20.1849 2.65206 18.75C1.82363 17.3151 2.31526 15.4803 3.75013 14.6519C5.18501 13.8235 7.01943 14.3152 7.84786 15.7501ZM9.38443 14.863C10.043 14.4828 10.4538 13.7849 10.4666 13.0246C10.4725 12.673 10.5207 12.3296 10.607 12.0001M9.38443 14.863L11.4608 13.6642M11.4608 10.336C11.9882 9.69899 12.6991 9.21094 13.5294 8.95701L18.8541 7.32853C19.6606 7.08187 20.5202 7.06683 21.3348 7.28511L22.1373 7.50012L14.3431 12.0001M11.4608 10.336C11.062 10.8178 10.7681 11.3847 10.607 12.0001M14.3431 12.0001L22.1373 16.5001L21.3348 16.7151C20.5202 16.9333 19.6606 16.9183 18.8541 16.6716L13.5294 15.0432C12.6991 14.7892 11.9882 14.3012 11.4608 13.6642M14.3431 12.0001L11.4608 13.6642"
      stroke={color}
      stroke-width={strokeWidth}
      transition:draw={transitionParams}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {/if}
</svg>
