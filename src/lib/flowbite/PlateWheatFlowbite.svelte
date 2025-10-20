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
    strokeWidth = 2,
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
      transition:draw={transitionParams}
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={strokeWidth}
      d="M5 5.00003h1M5 11h1M3 8.00003h4m8.5 0c-.1016.11084-1.5385-1.15738-1.7964-1.482-.3299-.41512-.7812-1.43054-.6974-1.50634.0838-.0758 1.1161.68119 1.3741 1.00581.258.32462 1.2213 1.87169 1.1197 1.98253Zm0 0c-.1016-.11084-1.5385 1.15738-1.7964 1.482-.3299.41512-.7812 1.43057-.6974 1.50637.0838.0758 1.1161-.6812 1.3741-1.00584.258-.32462 1.2213-1.87169 1.1197-1.98253Zm4 0c-.1016.11084-1.5385-1.15738-1.7964-1.482-.3299-.41512-.7812-1.43054-.6974-1.50634.0838-.0758 1.1161.68119 1.3741 1.00581.258.32462 1.2213 1.87169 1.1197 1.98253Zm0 0c-.1016-.11084-1.5385 1.15738-1.7964 1.482-.3299.41512-.7812 1.43057-.6974 1.50637.0838.0758 1.1161-.6812 1.3741-1.00584.258-.32462 1.2213-1.87169 1.1197-1.98253Zm-8.5 0h10m-9.9943-.00001c-.1016.11084-1.53849-1.15738-1.79646-1.48201-.32987-.41511-.7812-1.43053-.69738-1.50633.08383-.0758 1.11614.68118 1.3741 1.00581.25794.32462 1.22124 1.87168 1.11974 1.98253Zm0 0c-.1016-.11085-1.53849 1.1574-1.79646 1.48203-.32987.41511-.7812 1.43055-.69738 1.50635.08383.0758 1.11614-.6812 1.3741-1.00582.25794-.32463 1.22124-1.87172 1.11974-1.98256ZM8.59868 18.0116V19h6.80262v-.9884C18.39 17.3447 20.5872 15.8251 21 14H3c.41284 1.8251 2.60995 3.3447 5.59868 4.0116Z"
    />
  {/if}
</svg>
