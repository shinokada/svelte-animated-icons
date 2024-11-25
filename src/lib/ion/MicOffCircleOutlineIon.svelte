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
    transitionParams?: DrawParams;
  }

  let {
    pauseDuration = 300,
    event = 'hover',
    size = 24,
    role = 'img',
    color = 'currentColor',
    title,
    desc,
    ariaLabel = 'mic off circle outline',
    transitionParams = { duration: 800, delay: 0 },
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
</script>

{#snippet iconsvg()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
    {role}
    width={size}
    height={size}
    fill={color}
    aria-label={ariaLabel}
    aria-describedby={hasDescription ? ariaDescribedby : undefined}
    viewBox="0 0 512 512"
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
        d="M256,464C141.31,464,48,370.69,48,256S141.31,48,256,48s208,93.31,208,208S370.69,464,256,464Zm0-384C159,80,80,159,80,256S159,432,256,432s176-78.95,176-176S353.05,80,256,80Z"
      /><path
        transition:draw={transitionParams}
        d="M352,369a15.93,15.93,0,0,1-11.84-5.24l-192-210a16,16,0,0,1,23.68-21.52l192,210A16,16,0,0,1,352,369Z"
      /><path
        transition:draw={transitionParams}
        d="M352,248.22v-23.8a16.3,16.3,0,0,0-13.64-16.24C328.48,206.7,320,214.69,320,224.3v23.92a43.35,43.35,0,0,1-3.07,15.91,4,4,0,0,0,.76,4.16l19.19,21.1a2,2,0,0,0,3.19-.3A77.12,77.12,0,0,0,352,248.22Z"
      /><path
        transition:draw={transitionParams}
        d="M304,240V176a48.14,48.14,0,0,0-48-48h0a48.08,48.08,0,0,0-41,23.1,4,4,0,0,0,.47,4.77l84.42,92.86a2,2,0,0,0,3.46-1A47.84,47.84,0,0,0,304,240Z"
      /><path
        transition:draw={transitionParams}
        d="M246.57,285.2l-36.46-40.11a1,1,0,0,0-1.74.8,48.26,48.26,0,0,0,37.25,41A1,1,0,0,0,246.57,285.2Z"
      /><path
        transition:draw={transitionParams}
        d="M287.55,352H272V334.26a100.33,100.33,0,0,0,12.53-3.06,2,2,0,0,0,.89-3.26l-21.07-23.19a3.94,3.94,0,0,0-3.29-1.29c-1.69.15-3.39.24-5.06.24-36,0-64-29.82-64-55.48V224.4A16.26,16.26,0,0,0,176.39,208,15.91,15.91,0,0,0,160,224v24.22c0,23.36,10.94,45.61,30.79,62.66A103.71,103.71,0,0,0,240,334.26V352H224.45c-8.61,0-16,6.62-16.43,15.23A16,16,0,0,0,224,384h64a16,16,0,0,0,16-16.77C303.58,358.62,296.16,352,287.55,352Z"
      />
    {/if}
  </svg>
{/snippet}

{#if event === 'hover'}
  <button onmouseenter={handleEvent}>
    <div class="icon-wrapper">
      {@render iconsvg()}
    </div>
  </button>
{:else if event === 'click'}
  <button onclick={handleEvent}>
    <div class="icon-wrapper">
      {@render iconsvg()}
    </div>
  </button>
{:else}
  <div class="icon-wrapper">
    {@render iconsvg()}
  </div>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    display: inline-flex;
    line-height: 0;
  }

  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
    width: var(--size, 24px);
    height: var(--size, 24px);
  }

  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
