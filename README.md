# Svelte Animated Icons

A collection of animated SVG icons for Svelte with enhanced customization, flexible event handling, and improved state management. Each icon supports sophisticated animation transitions, accessibility features, and granular control.

## Features

- 🎨 Advanced customization (colors, sizes, stroke widths)
- ✨ Draw transition animations
- 🎯 Full TypeScript support
- 🔄 Flexible event handling
- ♿ Enhanced accessibility features
- 🎮 Multiple animation trigger options

## Installation

```bash
pnpm i -D svelte-animated-icons
```

## Usage

```svelte
<script>
  import { AddColumnAfterFlowbite } from 'svelte-animated-icons';
</script>

<AddColumnAfterFlowbite />
```

### With Custom Properties

```svelte
<script>
  import { AddColumnAfterFlowbite } from 'svelte-animated-icons';
</script>

<AddColumnAfterFlowbite
  size={32}
  color="#ff0000"
  strokeWidth={2}
  event="click"
  pauseDuration={300}
  transitionParams={{
    duration: 800,
    delay: 0
  }}
/>
```

## Props

| Prop             | Type                            | Default                     | Description                            |
| ---------------- | ------------------------------- | --------------------------- | -------------------------------------- |
| size             | number                          | 24                          | Icon size in pixels                    |
| color            | string                          | 'currentColor'              | Icon color (any valid CSS color)       |
| strokeWidth      | number                          | 2                           | Width of the icon strokes              |
| event            | 'hover' \| 'click' \| 'none'    | 'hover'                     | Event that triggers the animation      |
| pauseDuration    | number                          | 300                         | Pause duration between animations (ms) |
| transitionParams | object                          | { duration: 500, delay: 0 } | Svelte transition parameters           |
| title            | { id?: string, title?: string } | -                           | SVG title for accessibility            |
| desc             | { id?: string, desc?: string }  | -                           | SVG description for accessibility      |
| ariaLabel        | string                          | -                           | Aria label for the icon                |
| focusable        | true/false/auto                 | false                       | Whether the icon is keyboard-focusable |

## Accessibility Props Example

```svelte
<AddColumnAfterFlowbite
  title={{
    id: 'add-column-title',
    title: 'Add Column Icon'
  }}
  desc={{
    id: 'add-column-desc',
    desc: 'An icon to add a column with animated transition'
  }}
/>
```

## Accessibility

Icons include comprehensive ARIA attributes, support custom titles/descriptions, and are fully keyboard accessible.

## Browser Support

Works in all modern browsers that support SVG and CSS animations.

## Development

### Setup

```bash
git clone git@github.com:shinokada/svelte-animated-icons.git
cd svelte-animated-icons
pnpm install
```

### Running Tests

```bash
pnpm test:e2e
pnpm test
```

### Building

```bash
pnpm build
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
