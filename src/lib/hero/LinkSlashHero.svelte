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
		ariaLabel = 'link slash',
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
			d="M13.1813 8.68025C13.6303 8.89477 14.0511 9.188 14.423 9.55994C15.9219 11.0591 16.1423 13.3528 15.084 15.0855M5.31614 12.3032L3.5592 14.0604C1.80188 15.8179 1.80188 18.6674 3.5592 20.4249C5.31653 22.1825 8.16572 22.1825 9.92304 20.4249L13.0517 17.296M18.6659 11.6811L20.4228 9.92393C22.1802 8.1664 22.1802 5.31689 20.4228 3.55936C18.6655 1.80183 15.8163 1.80183 14.059 3.55936L9.55909 8.05979C9.30075 8.31816 9.08038 8.60014 8.898 8.89877M10.8008 15.3041C10.3518 15.0895 9.93099 14.7963 9.55909 14.4244C9.0674 13.9326 8.71328 13.3554 8.49674 12.7405M15.084 15.0855L20.9908 20.993M15.084 15.0855L8.898 8.89877M2.9912 2.99128L8.898 8.89877"
			stroke={color}
			stroke-width={strokeWidth}
			transition:draw={transitionParams}
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{/if}
</svg>
