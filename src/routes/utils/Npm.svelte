<script lang="ts">
	import { getContext } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';

	interface CtxType {
		size?: string;
		role?: string;
		withEvents?: boolean;
	}

	type TitleType = {
		id?: string;
		title?: string;
	};

	type DescType = {
		id?: string;
		desc?: string;
	};

	const ctx: CtxType = getContext('iconCtx') ?? {};

	interface Props extends SVGAttributes<SVGSVGElement> {
		size?: string;
		role?: string;
		ariaLabel?: string;
		class?: string;
		withEvents?: boolean;
		title?: TitleType;
		desc?: DescType;
	}
	let {
		size = ctx.size || '24',
		role = ctx.role || 'img',
		ariaLabel = 'npm',
		class: classname,
		withEvents = ctx.withEvents || false,
		title,
		desc,
		...restProps
	}: Props = $props();

	let ariaDescribedby = $state(`${title?.id || ''} ${desc?.id || ''}`);
	const hasDescription = $derived(!!(title?.id || desc?.id));
</script>

{#snippet svgContent()}
	<path d="m0 0H512V512H0" fill="#fff" /><path
		fill="none"
		stroke="#cb3837"
		stroke-width="22"
		d="M234 311H447V199H65V311H178V210 333h78M133 232v68m112-68v45m45-67v90m67-68v79h45v-79"
	/>
{/snippet}

{#if withEvents}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		class={classname}
		{...restProps}
		aria-label={ariaLabel}
		{role}
		viewBox="0 0 512 512"
		aria-describedby={hasDescription ? ariaDescribedby : undefined}
	>
		{#if title?.id && title.title}
			<title id={title.id}>{title.title}</title>
		{/if}
		{#if desc?.id && desc.desc}
			<desc id={desc.id}>{desc.desc}</desc>
		{/if}
		{@render svgContent()}
	</svg>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		class={classname}
		{...restProps}
		aria-label={ariaLabel}
		{role}
		viewBox="0 0 512 512"
		aria-describedby={hasDescription ? ariaDescribedby : undefined}
	>
		{#if title?.id && title.title}
			<title id={title.id}>{title.title}</title>
		{/if}
		{#if desc?.id && desc.desc}
			<desc id={desc.id}>{desc.desc}</desc>
		{/if}
		{@render svgContent()}
	</svg>
{/if}
