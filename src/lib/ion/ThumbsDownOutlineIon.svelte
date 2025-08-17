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
		ariaLabel = 'thumbs down outline',
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
			d="M192,53.84S208,48,256,48s74,16,96,32h64a64,64,0,0,1,64,64v48a64,64,0,0,1-64,64H386a32.34,32.34,0,0,0-27.37,15.4S350,290.19,324,335.22,248,448,240,464c-29,0-43-22-34-47.71,10.28-29.39,23.71-54.38,27.46-87.09.54-4.78-3.14-12-8-12L96,307"
			style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M96,241l80,2c20,1.84,32,12.4,32,30h0c0,17.6-14,28.84-32,30l-80,4c-17.6,0-32-16.4-32-34v-.17A32,32,0,0,1,96,241Z"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M64,176l112,2c18,.84,32,12.41,32,30h0c0,17.61-14,28.86-32,30L64,240a32.1,32.1,0,0,1-32-32h0A32.1,32.1,0,0,1,64,176Z"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M112,48l64,3c21,1.84,32,11.4,32,29h0c0,17.6-14.4,30-32,30l-64,2A32.09,32.09,0,0,1,80,80h0A32.09,32.09,0,0,1,112,48Z"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/><path
			transition:draw={transitionParams}
			d="M80,112l96,2c19,.84,32,12.4,32,30h0c0,17.6-13,28.84-32,30l-96,2a32.09,32.09,0,0,1-32-32h0A32.09,32.09,0,0,1,80,112Z"
			style="fill:none;stroke:{color};stroke-miterlimit:10;stroke-width:32px"
		/>
	{/if}
</svg>
