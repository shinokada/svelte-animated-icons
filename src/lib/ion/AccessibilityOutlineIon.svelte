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
		ariaLabel = 'accessibility outline',
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
		<circle
			transition:draw={transitionParams}
			fill="none"
			stroke={color}
			stroke-linejoin="round"
			stroke-width="32"
			cx="256"
			cy="56"
			r="40"
		/><path
			transition:draw={transitionParams}
			fill="none"
			stroke={color}
			stroke-linejoin="round"
			stroke-width="32"
			d="M204.23,274.44c2.9-18.06,4.2-35.52-.5-47.59-4-10.38-12.7-16.19-23.2-20.15L88,176.76c-12-4-23.21-10.7-24-23.94-1-17,14-28,29-24,0,0,88,31.14,163,31.14s162-31,162-31c18-5,30,9,30,23.79,0,14.21-11,19.21-24,23.94l-88,31.91c-8,3-21,9-26,18.18-6,10.75-5,29.53-2.1,47.59l5.9,29.63L351.21,467.9c2.8,13.15-6.3,25.44-19.4,27.74S308,489,304.12,476.28L266.56,360.35q-2.71-8.34-4.8-16.87L256,320l-5.3,21.65q-2.52,10.35-5.8,20.48L208,476.18c-4,12.85-14.5,21.75-27.6,19.46S158,480.05,160.94,467.9l37.39-163.83Z"
		/>
	{/if}
</svg>
