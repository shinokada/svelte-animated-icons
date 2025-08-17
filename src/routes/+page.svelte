<script lang="ts">
	import { HighlightCompo, H1, H2, DocPage } from 'runes-webkit';
	import { P, Table, List, Li } from 'flowbite-svelte';

	const tableItems = [
		{ prop: 'size', type: 'number', default: '24', description: 'Icon size in pixels' },
		{
			prop: 'color',
			type: 'string',
			default: 'currentColor',
			description: 'Icon color (any valid CSS color)'
		},
		{
			prop: 'strokeWidth (flowbite/hero)',
			type: 'number',
			default: '1.5/2.0',
			description: 'Width of the icon strokes'
		},
		{
			prop: 'event',
			type: "'hover'|'click'|'none'",
			default: "'hover'",
			description: 'Event that triggers the animation'
		},
		{
			prop: 'pauseDuration',
			type: 'number',
			default: '300',
			description: ' Duration of the animation (ms)'
		},
		{
			prop: 'transitionParams',
			type: 'object',
			default: 'duration: 500, delay: 0',
			description: 'Svelte transition parameters'
		},
		{
			prop: 'title',
			type: '{ id?: string, title?: string }',
			default: '-',
			description: 'SVG title for accessibility'
		},
		{
			prop: 'desc',
			type: '{ id?: string, desc?: string }',
			default: '-',
			description: 'SVG description for accessibility'
		},
		{
			prop: 'ariaLabel',
			type: 'string',
			default: 'Icon-specific',
			description: 'Aria label for the icon'
		}
	];
	const modules = import.meta.glob('./md/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});
</script>

<DocPage>
	<H1>Svelte Animated Icons</H1>
	<P>
		A collection of animated SVG icons for Svelte with enhanced customization, flexible event
		handling, and improved state management. Each icon supports sophisticated animation transitions,
		accessibility features, and granular control.
	</P>

	<H2>Features</H2>

	<List tag="ul">
		<Li>🎨 Advanced customization (colors, sizes, stroke widths)</Li>
		<Li>✨ Draw transition animations</Li>
		<Li>🎯 Full TypeScript support</Li>
		<Li>🔄 Flexible event handling</Li>
		<Li>♿ Enhanced accessibility features</Li>
		<Li>🎮 Multiple animation trigger options</Li>
	</List>

	<H2>Installation</H2>

	<HighlightCompo
		codeLang="ts"
		code={modules['./md/installation.md'] as string}
		clipboardClass="top-2"
	/>

	<H2>Usage</H2>

	<HighlightCompo codeLang="ts" code={modules['./md/usage.md'] as string} clipboardClass="top-2" />

	<h3>With Custom Properties</h3>

	<HighlightCompo
		codeLang="ts"
		code={modules['./md/custom-properties.md'] as string}
		clipboardClass="top-2"
	/>

	<H2>Props</H2>
	<Table items={tableItems} />

	<H2>Types</H2>
	<HighlightCompo codeLang="ts" code={modules['./md/types.md'] as string} clipboardClass="top-2" />

	<H2>Accessibility Props Example</H2>

	<HighlightCompo
		codeLang="ts"
		code={modules['./md/title-and-description.md'] as string}
		clipboardClass="top-2"
	/>

	<H2>Accessibility</H2>

	<P>
		All icons include proper ARIA attributes and support custom titles and descriptions. They are
		keyboard accessible when used with click events.
	</P>

	<H2>Browser Support</H2>

	<P>Works in all modern browsers that support SVG and CSS animations.</P>

	<H2>Contributing</H2>
	<P>
		Contributions are welcome! Please read our contributing guidelines before submitting a pull
		request. Create a new icons in `src/lib/custom` directory.
	</P>

	<H2>License</H2>

	<P>MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</P>
</DocPage>
