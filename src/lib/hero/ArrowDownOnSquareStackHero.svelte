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
		strokeWidth?: number;
		transitionParams?: DrawParams;
	}

	let {
		pauseDuration = 300,
		event = 'hover',
		size = 24,
		color = 'currentColor',
		strokeWidth = 1.5,
		title,
		desc,
		ariaLabel = 'arrow down on square stack',
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
	fill="none"
	role={event === 'none' ? 'img' : 'button'}
	aria-label={ariaLabel}
	aria-describedby={hasDescription ? ariaDescribedby : undefined}
	viewBox="0 0 24 24"
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
			d="M7.5 7.5H6.75C5.50736 7.5 4.5 8.50736 4.5 9.75V17.25C4.5 18.4926 5.50736 19.5 6.75 19.5H14.25C15.4926 19.5 16.5 18.4926 16.5 17.25V9.75C16.5 8.50736 15.4926 7.5 14.25 7.5H13.5M7.5 11.25L10.5 14.25M10.5 14.25L13.5 11.25M10.5 14.25L10.5 1.5M16.5 10.5H17.25C18.4926 10.5 19.5 11.5074 19.5 12.75V20.25C19.5 21.4926 18.4926 22.5 17.25 22.5H9.75C8.50736 22.5 7.5 21.4926 7.5 20.25V19.5"
			stroke={color}
			stroke-width={strokeWidth}
			transition:draw={transitionParams}
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{/if}
</svg>
