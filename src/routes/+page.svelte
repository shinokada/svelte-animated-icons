<script lang="ts">
  import { H1, H2, H3, DocPage, Code, CodeWrapper } from 'runes-webkit';
  import { HighlightCompo } from 'svelte-rune-highlight';
  import { P, Table, List, Li } from 'flowbite-svelte';
  import { AddColumnAfterFlowbite } from '$lib';

  let { data } = $props();

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
      default: '-',
      description: 'Aria label for the icon'
    },
    {
      prop: 'focusable',
      type: "'true' | 'false' | 'auto'",
      default: 'false',
      description: 'Whether the icon is keyboard-focusable'
    }
  ];
  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
</script>

<DocPage div2Class="lg:pb-4 xl:pb-8">
  <H1>Svelte Animated Icons</H1>
  <P>
    A collection of animated SVG icons for Svelte with enhanced customization, flexible event
    handling, and improved state management. Each icon supports sophisticated animation transitions,
    accessibility features, and granular control.
  </P>

  <H2>Features</H2>

  <List tag="ul">
    <Li>🚀 {data.fileCount} icons</Li>
    <Li>🎨 Advanced customization (colors, sizes, stroke widths)</Li>
    <Li>✨ Draw transition animations</Li>
    <Li>🎯 Full TypeScript support</Li>
    <Li>🔄 Flexible event handling</Li>
    <Li>♿ Enhanced accessibility features</Li>
    <Li>🎮 Multiple animation trigger options</Li>
  </List>

  <H2>Installation</H2>

  <HighlightCompo lang="ts" code={modules['./md/installation.md'] as string} />

  <H2>Usage</H2>

  <HighlightCompo lang="ts" code={modules['./md/usage.md'] as string} />

  <h3>With Custom Properties</h3>

  <HighlightCompo lang="ts" code={modules['./md/custom-properties.md'] as string} />

  <H2>Props</H2>
  <Table items={tableItems} color="purple" />

  <H2>Types</H2>
  <HighlightCompo lang="ts" code={modules['./md/types.md'] as string} />

  <H2>Accessibility</H2>

  <H3>Decorative Icons</H3>

  <p>
    By default, icons have no <Code>aria-label</Code>. This is intentional - when icons are used
    next to text or as decorative elements, they don't need labels as screen readers will ignore
    them.
  </p>

  <HighlightCompo lang="ts" code={modules['./md/a11y-decorative.md'] as string} />

  <H3>Standalone Icons</H3>

  <p>
    When icons are used without accompanying text (e.g., icon-only buttons), you should provide an
    accessible label using the <Code>ariaLabel</Code> prop:
  </p>

  <HighlightCompo lang="ts" code={modules['./md/a11y.md'] as string} />

  <H3>Rich Descriptions</H3>

  <p>
    For complex icons that need detailed descriptions, use <Code>title</Code> and <Code>desc</Code> props.
    The <Code>title</Code> provides a short label, while <Code>desc</Code> offers a longer description:
  </p>

  <HighlightCompo lang="ts" code={modules['./md/a11y-2.md'] as string} />

  <CodeWrapper>
    <AddColumnAfterFlowbite
      title={{ id: 'my-title', title: 'App store' }}
      desc={{ id: 'my-descrip', desc: 'The shape of a red app store' }}
      color="red"
    />
  </CodeWrapper>

  <p class="mt-4">
    <strong>Note:</strong> When using <Code>title</Code>, you don't need <Code>ariaLabel</Code> as the
    title will be used automatically via <Code>aria-labelledby</Code>.
  </p>

  <H3>Focusable</H3>

  <p>
    Icons are not keyboard-focusable by default (<Code>focusable="false"</Code>). If you need to
    change this behavior, use the <Code>focusable</Code> prop:
  </p>

  <HighlightCompo lang="ts" code={modules['./md/a11y-focusable.md'] as string} />

  <H2>Browser Support</H2>

  <P>Works in all modern browsers that support SVG and CSS animations.</P>

  <H2>Contributing</H2>
  <P>
    Contributions are welcome! Please read our contributing guidelines before submitting a pull
    request. Create a new icons in `src/lib/custom` directory.
  </P>

  <H2>License</H2>

  <P
    >MIT License - see the <a
      href="https://github.com/shinokada/svelte-animated-icons/blob/main/LICENSE">LICENSE</a
    > file for details.</P
  >
</DocPage>
