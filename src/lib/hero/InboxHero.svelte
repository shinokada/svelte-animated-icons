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
    ariaLabel = 'inbox',
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
        d="M2.25 13.5H6.10942C6.96166 13.5 7.74075 13.9815 8.12188 14.7438L8.37812 15.2562C8.75925 16.0185 9.53834 16.5 10.3906 16.5H13.6094C14.4617 16.5 15.2408 16.0185 15.6219 15.2562L15.8781 14.7438C16.2592 13.9815 17.0383 13.5 17.8906 13.5H21.75M2.25 13.8383V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V13.8383C21.75 13.614 21.7165 13.391 21.6505 13.1766L19.2387 5.33831C18.9482 4.39423 18.076 3.75 17.0882 3.75H6.91179C5.92403 3.75 5.05178 4.39423 4.76129 5.33831L2.3495 13.1766C2.28354 13.391 2.25 13.614 2.25 13.8383Z"
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
