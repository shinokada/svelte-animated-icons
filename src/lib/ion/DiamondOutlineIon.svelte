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
		ariaLabel = 'diamond outline',
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
			d="M35.42,188.21,243.17,457.67a16.17,16.17,0,0,0,25.66,0L476.58,188.21a16.52,16.52,0,0,0,.95-18.75L407.06,55.71A16.22,16.22,0,0,0,393.27,48H118.73a16.22,16.22,0,0,0-13.79,7.71L34.47,169.46A16.52,16.52,0,0,0,35.42,188.21Z"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/><line
			transition:draw={transitionParams}
			x1="48"
			y1="176"
			x2="464"
			y2="176"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/><polyline
			transition:draw={transitionParams}
			points="400 64 352 176 256 48"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/><polyline
			transition:draw={transitionParams}
			points="112 64 160 176 256 48"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/><line
			transition:draw={transitionParams}
			x1="256"
			y1="448"
			x2="160"
			y2="176"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/><line
			transition:draw={transitionParams}
			x1="256"
			y1="448"
			x2="352"
			y2="176"
			fill="none"
			stroke={color}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="32"
		/>
	{/if}
</svg>
