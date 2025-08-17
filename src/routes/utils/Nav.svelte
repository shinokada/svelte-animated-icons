<script lang="ts">
	import {
		Navbar,
		NavLi,
		NavBrand,
		NavHamburger,
		NavUl,
		uiHelpers,
		DarkMode,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import DynamicCodeBlockStyle from './DynamicCodeBlockStyle.svelte';
	import { Bluesky, DotsHorizontalOutline, GithubSolid, XSolid } from 'runes-webkit';
	import { page } from '$app/state';

	const githubUrl = `https://github.com/shinokada/${__NAME__}`;
	const twitterUrl = 'https://twitter.com/shinokada';
	const blueskyUrl = 'https://bsky.app/profile/codewithshin.com';

	let activeUrl = $state(page.url.pathname);
	let nav = uiHelpers();
	let navStatus = $state(false);

	$effect(() => {
		activeUrl = page.url.pathname;
		navStatus = nav.isOpen;
	});

	let activeClass = 'p-2 text-base hover:text-gray-600';
	let nonActiveClass = 'p-2 text-base hover:text-gray-600';
</script>

<Navbar
	breakpoint="lg"
	fluid
	class="fixed top-0 left-0 z-50 border-b border-gray-100 bg-white py-4  sm:px-12 dark:border-gray-700 dark:bg-stone-900"
	navContainerClass="lg:justify-between"
>
	<NavBrand href="/">
		<span
			class="text-primary-900 dark:text-primary-500 self-center text-2xl font-semibold whitespace-nowrap xl:text-3xl"
			>Svelte Animated Icons</span
		>
	</NavBrand>
	<div class="flex justify-end lg:order-2">
		<NavHamburger class="order-3" />
		<DynamicCodeBlockStyle class="hidden lg:block" />
		<DotsHorizontalOutline class="mt-2 mr-4 ml-6 dark:text-white" size="lg" />
		<Dropdown simple class="p-1">
			{#if blueskyUrl}
				<DropdownItem href={blueskyUrl} target="_blank" class="m-0 p-0.5">
					<Bluesky size="30" />
				</DropdownItem>
			{/if}
			{#if twitterUrl}
				<DropdownItem href={twitterUrl} target="_blank" class="m-0 p-2"><XSolid /></DropdownItem>
			{/if}
			{#if githubUrl}
				<DropdownItem href={githubUrl} target="_blank" class="m-0 p-2">
					<GithubSolid />
				</DropdownItem>
			{/if}
		</Dropdown>
		<DarkMode class="m-0 p-2" />
	</div>
	<NavUl
		{activeUrl}
		breakpoint="lg"
		class="order-2 lg:order-1"
		classes={{ active: activeClass, nonActive: nonActiveClass, ul: 'p-0' }}
	>
		<NavLi href="/flowbite">Flowbite</NavLi>
		<NavLi href="/hero">Hero</NavLi>
		<NavLi href="/ion">Ion</NavLi>
		<NavLi href="/custom">Custom</NavLi>
		<NavLi href="https://svelte-animate.codewithshin.com/" target="_blank">Svelte Animate</NavLi>
	</NavUl>
</Navbar>
