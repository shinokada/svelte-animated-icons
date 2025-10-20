<script lang="ts">
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
    title?: TitleType;
    desc?: DescType;
    ariaLabel?: string;
    size?: number;
    role?: string;
    color?: string;
    strokeWidth?: number;
  }

  let {
    size = 24,
    role = 'img',
    color = 'currentColor',
    strokeWidth = 1.5,
    title,
    desc,
    ariaLabel = 'archive box',
    ...restProps
  }: Props = $props();

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  let isAnimating = $state(false);

  function handleMouseEnter() {
    isAnimating = true;
  }

  function handleMouseLeave() {
    isAnimating = false;
  }

  function handleClick() {
    isAnimating = !isAnimating;
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
  {role}
  width={size || '24'}
  height={size || '24'}
  fill="none"
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onclick={handleClick}
>
  {#if title?.id && title.title}
    <title id={title.id}>{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id={desc.id}>{desc.desc}</desc>
  {/if}
  <path
    d="M9.75001 3.10408V8.81802C9.75001 9.41476 9.51295 9.98705 9.091 10.409L5.00001 14.5M9.75001 3.10408C9.49886 3.12743 9.24884 3.15465 9.00001 3.18568M9.75001 3.10408C10.4908 3.03521 11.2413 3 12 3C12.7587 3 13.5093 3.03521 14.25 3.10408M14.25 3.10408V8.81802C14.25 9.41476 14.4871 9.98705 14.909 10.409L19.8 15.3M14.25 3.10408C14.5011 3.12743 14.7512 3.15465 15 3.18568M19.8 15.3L18.2299 15.6925M5.00001 14.5L5.7701 14.3075M19.8 15.3L21.2022 16.7022C22.4341 17.9341 21.8527 20.0202 20.1354 20.3134C17.4911 20.7649 14.773 21 12 21C9.227 21 6.50891 20.7649 3.86459 20.3134C2.14728 20.0202 1.56591 17.9341 2.7978 16.7022L5.00001 14.5"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M5.7701 14.3075C7.85435 13.7864 10.0784 14.0392 12 15C13.9216 15.9608 16.1457 16.2136 18.2299 15.6925"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {#if isAnimating}
      <animate
        attributeName="d"
        dur="1000ms"
        repeatCount="indefinite"
        values="
          M5.7701 14.3075C7.85435 13.7864 10.0784 14.0392 12 15C13.9216 15.9608 16.1457 16.2136 18.2299 15.6925;
          M5.7701 14.3075C7.85435 14.7864 10.0784 14.5392 12 14C13.9216 13.4608 16.1457 13.7136 18.2299 14.1925;
          M5.7701 14.3075C7.85435 13.7864 10.0784 14.0392 12 15C13.9216 15.9608 16.1457 16.2136 18.2299 15.6925"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      />
    {/if}
  </path>
</svg>

<!--
@component
[Go to docs](https://svelte-animated-icons.codewithshin.com/)
## Props
@prop size = 24
@prop role = 'img'
@prop color = 'currentColor'
@prop strokeWidth = 1.5
@prop title
@prop desc
@prop ariaLabel = 'archive box'
@prop ...restProps
-->
