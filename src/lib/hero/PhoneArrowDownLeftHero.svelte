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

  interface Props extends SVGAttributes<SVGElement> {
    pauseDuration?: number;
    event?: 'hover' | 'click' | 'none';
    title?: TitleType;
    desc?: DescType;
    ariaLabel?: string;
    size?: number;
    role?: string;
    color?: string;
    strokeWidth?: number;
    transitionParams?: DrawParams;
    focusOutlineWidth?: string;
    focusOutlineColor?: string;
    focusOutlineOffset?: string;
    focusOutlineStyle?: string;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    role = 'img',
    color = 'currentColor',
    strokeWidth = 1.5,
    title,
    desc,
    ariaLabel = 'phone arrow down left',
    transitionParams = { duration: 800, delay: 0 },
    focusOutlineWidth = '1px',
    focusOutlineColor = 'currentColor',
    focusOutlineOffset = '1px',
    focusOutlineStyle = 'solid',
    ...restProps
  }: Props = $props();

  const getDuration = (params?: DrawParams): number => {
    if (!params?.duration) return 0;
    if (typeof params.duration === 'function') {
      return params.duration(0);
    }
    return params.duration;
  };

  let visible = $state(true);
  let totalDuration = $derived(getDuration(transitionParams) + pauseDuration);

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  const handleEvent = () => {
    if (!visible) return;
    visible = false;
    setTimeout(() => {
      visible = true;
    }, totalDuration);
  };

  // Set CSS variable for the placeholder size
  $effect(() => {
    document.documentElement.style.setProperty('--size', `${size}px`);
  });
  const buttonId = crypto.randomUUID();
  let focusStyles = $derived(`
    --focus-outline-width: ${focusOutlineWidth};
    --focus-outline-color: ${focusOutlineColor};
    --focus-outline-offset: ${focusOutlineOffset};
    --focus-outline-style: ${focusOutlineStyle};
  `);
</script>

{#snippet iconsvg()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
    {role}
    width={size}
    height={size}
    fill="none"
    aria-label={ariaLabel}
    aria-describedby={hasDescription ? ariaDescribedby : undefined}
    viewBox="0 0 24 24"
    class="svg-icon"
  >
    {#if title?.id && title.title}
      <title id={title.id}>{title.title}</title>
    {/if}
    {#if desc?.id && desc.desc}
      <desc id={desc.id}>{desc.desc}</desc>
    {/if}
    {#if visible}
      <path
        d="M14.25 9.75V5.25M14.25 9.75L18.75 9.75M14.25 9.75L20.25 3.75M17.25 21.75C8.96573 21.75 2.25 15.0343 2.25 6.75V4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H5.87163C6.38785 2.25 6.83783 2.60133 6.96304 3.10215L8.06883 7.52533C8.17861 7.96445 8.01453 8.4266 7.65242 8.69818L6.3588 9.6684C5.98336 9.94998 5.81734 10.437 5.97876 10.8777C7.19015 14.1846 9.81539 16.8098 13.1223 18.0212C13.563 18.1827 14.05 18.0166 14.3316 17.6412L15.3018 16.3476C15.5734 15.9855 16.0355 15.8214 16.4747 15.9312L20.8979 17.037C21.3987 17.1622 21.75 17.6121 21.75 18.1284V19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H17.25Z"
        stroke={color}
        stroke-width={strokeWidth}
        transition:draw={transitionParams}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/if}
  </svg>
{/snippet}

{#if event === 'hover'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onmouseenter={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else if event === 'click'}
  <div
    class="icon-wrapper"
    role="button"
    tabindex="0"
    id={buttonId}
    aria-label={`Animate ${ariaLabel} icon`}
    onclick={handleEvent}
    onkeydown={(e) => e.key === 'Enter' && handleEvent()}
    style={focusStyles}
  >
    {@render iconsvg()}
  </div>
{:else}
  <div class="icon-wrapper" role="img" aria-label={ariaLabel} style={focusStyles}>
    {@render iconsvg()}
  </div>
{/if}

<style>
  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
    width: var(--size, 24px);
    height: var(--size, 24px);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    outline: inherit;
    line-height: 0;
  }

  .icon-wrapper:focus {
    outline-width: var(--focus-outline-width);
    outline-color: var(--focus-outline-color);
    outline-offset: var(--focus-outline-offset);
    outline-style: var(--focus-outline-style);
  }

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
