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
		ariaLabel = 'film outline',
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
		<rect
			transition:draw={transitionParams}
			x="48"
			y="96"
			width="416"
			height="320"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="384"
			y="336"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="384"
			y="256"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="384"
			y="176"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="384"
			y="96"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="48"
			y="336"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="48"
			y="256"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="48"
			y="176"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="48"
			y="96"
			width="80"
			height="80"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="128"
			y="96"
			width="256"
			height="160"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/><rect
			transition:draw={transitionParams}
			x="128"
			y="256"
			width="256"
			height="160"
			rx="28"
			ry="28"
			style="fill:none;stroke:{color};stroke-linejoin:round;stroke-width:32px"
		/>
	{/if}
</svg>
