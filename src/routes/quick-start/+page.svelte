<script lang="ts">
  import { HighlightCompo, H1, H2 } from 'runes-webkit';
  import { P, Table, List, Li } from 'svelte-5-ui-lib';
  const tableItems = [
    { prop: 'size', type: 'number', default: '24', description: 'Icon size in pixels' },
    {
      prop: 'color',
      type: 'string',
      default: 'currentColor',
      description: 'Icon color (any valid CSS color)'
    },
    {
      prop: 'strokeWidth',
      type: 'number',
      default: '1,5',
      description: 'Width of the icon strokes'
    },
    {
      prop: 'event',
      type: "'onmouseenter'|'onclick'",
      default: "'onmouseenter'",
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
      default: 'duration: 800, delay: 0',
      description: 'Svelte transition parameters'
    },
    { prop: 'title', type: 'object', default: '-', description: 'SVG title for accessibility' },
    {
      prop: 'desc',
      type: 'object',
      default: '-',
      description: 'SVG description for accessibility'
    },
    { prop: 'ariaLabel', type: 'string', default: '-', description: 'Aria label for the icon' }
  ];
  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
</script>

<H1>Svelte Animated Icons (Heroicons)</H1>
<P>
  A collection of animated SVG icons for Svelte with customizable draw transitions, events, and
  accessibility features. Each icon supports hover/click animations, customizable colors, sizes, and
  stroke widths.
</P>

<H2>Features</H2>

<List tag="ul">
  <Li>🎨 Customizable colors, sizes, and stroke widths</Li>
  <Li>✨ Animated draw transitions on hover or click</Li>
  <Li>♿ Built-in accessibility features</Li>
  <Li>🎯 TypeScript support</Li>
  <Li>🔄 Configurable animation timing</Li>
  <Li>🎮 Multiple event trigger options</Li>
</List>

<H2>Installation</H2>

<HighlightCompo codeLang="ts" code={modules['./md/installation.md'] as string} />

<H2>Usage</H2>

<HighlightCompo codeLang="ts" code={modules['./md/usage.md'] as string} />

<h3>With Custom Properties</h3>

<HighlightCompo codeLang="ts" code={modules['./md/custom-properties.md'] as string} />

<H2>Props</H2>
<Table {tableItems}/>

<H2>Types</H2>
<HighlightCompo codeLang="ts" code={modules['./md/types.md'] as string} />

<h3>Title and Description Props</h3>

<HighlightCompo codeLang="ts" code={modules['./md/title-and-description.md'] as string} />

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
  request.
</P>

<H2>License</H2>

<P>MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</P>
