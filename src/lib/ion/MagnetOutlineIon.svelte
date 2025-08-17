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
		ariaLabel = 'magnet outline',
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
		<path
			transition:draw={transitionParams}
			d="M421.83,293.82A144,144,0,0,0,218.18,90.17"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M353.94,225.94a48,48,0,0,0-67.88-67.88"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/><line
			transition:draw={transitionParams}
			x1="192"
			y1="464"
			x2="192"
			y2="416"
			style="stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
		/><line
			transition:draw={transitionParams}
			x1="90.18"
			y1="421.82"
			x2="124.12"
			y2="387.88"
			style="stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
		/><line
			transition:draw={transitionParams}
			x1="48"
			y1="320"
			x2="96"
			y2="320"
			style="stroke:{color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M286.06,158.06,172.92,271.19a32,32,0,0,1-45.25,0L105,248.57a32,32,0,0,1,0-45.26L218.18,90.17"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M421.83,293.82,308.69,407a32,32,0,0,1-45.26,0l-22.62-22.63a32,32,0,0,1,0-45.26L353.94,225.94"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><line
			transition:draw={transitionParams}
			x1="139.6"
			y1="169.98"
			x2="207.48"
			y2="237.87"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><line
			transition:draw={transitionParams}
			x1="275.36"
			y1="305.75"
			x2="343.25"
			y2="373.63"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/>
	{/if}
</svg>
