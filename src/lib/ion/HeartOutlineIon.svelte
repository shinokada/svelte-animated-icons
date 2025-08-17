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
		ariaLabel = 'heart outline',
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
			d="M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z"
			style="fill:none;stroke:{color};stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
		/>
	{/if}
</svg>
