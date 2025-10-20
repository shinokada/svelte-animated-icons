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
      d="M6.75038 3.74414H5.99707V11.9949H13.1221C15.4002 11.9949 17.2471 10.1479 17.2471 7.8695C17.2471 5.59113 15.4002 3.74414 13.1221 3.74414H6.75038ZM6.75038 3.74414V4.12491M6.75038 20.2456H13.4971C15.9824 20.2456 17.9971 18.2307 17.9971 15.7452C17.9971 13.2597 15.9824 11.2448 13.4971 11.2448H5.99707V20.2456H6.75038ZM6.75038 20.2456V19.8751M6.75038 4.12491H12.7504C14.8215 4.12491 16.5005 5.80387 16.5005 7.87496C16.5005 9.94606 14.8215 11.625 12.7504 11.625H6.75038M6.75038 4.12491V11.625M6.75038 11.625V19.8751M6.75038 11.625H13.1254C15.4036 11.625 17.2505 13.4719 17.2505 15.7501C17.2505 18.0283 15.4036 19.8751 13.1254 19.8751H6.75038M7.49707 4.49421H12.3721C14.236 4.49421 15.7471 6.00538 15.7471 7.8695C15.7471 9.73362 14.236 11.2448 12.3721 11.2448H7.49707V4.49421ZM7.49707 11.9949H12.7471C14.8181 11.9949 16.4971 13.6739 16.4971 15.7452C16.4971 17.8164 14.8181 19.4955 12.7471 19.4955H7.49707V11.9949Z"
      stroke={color}
      stroke-width={strokeWidth}
      transition:draw={transitionParams}
      stroke-linejoin="round"
    />
  {/if}
</svg>
