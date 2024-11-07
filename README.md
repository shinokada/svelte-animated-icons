# Svelte Animated Icons

A collection of animated SVG icons for Svelte with customizable draw transitions, events, and accessibility features. Each icon supports hover/click animations, customizable colors, sizes, and stroke widths.

## Features

- 🎨 Customizable colors, sizes, and stroke widths
- ✨ Animated draw transitions on hover or click
- ♿ Built-in accessibility features
- 🎯 TypeScript support
- 🔄 Configurable animation timing
- 🎮 Multiple event trigger options

## Installation

```bash
pnpm i -D svelte-animated-icons
```

## Usage

```svelte
<script>
  import { ArrowDown } from 'svelte-animated-icons';
</script>

<ArrowDown />
```

### With Custom Properties

```svelte
<script>
  import { ArrowDown } from 'svelte-animated-icons';
</script>

<ArrowDown
  size={32}
  color="#ff0000"
  strokeWidth={2}
  event="onclick"
  pauseDuration={300}
  transitionParams={{
    duration: 800,
    delay: 0
  }}
/>
```

## Props

| Prop             | Type                        | Default                     | Description                            |
| ---------------- | --------------------------- | --------------------------- | -------------------------------------- |
| size             | number                      | 24                          | Icon size in pixels                    |
| color            | string                      | 'currentColor'              | Icon color (any valid CSS color)       |
| strokeWidth      | number                      | 1.5                         | Width of the icon strokes              |
| event            | 'onmouseenter' \| 'onclick' | 'onmouseenter'              | Event that triggers the animation      |
| pauseDuration    | number                      | 300                         | Pause duration between animations (ms) |
| transitionParams | object                      | { duration: 800, delay: 0 } | Svelte transition parameters           |
| title            | object                      | -                           | SVG title for accessibility            |
| desc             | object                      | -                           | SVG description for accessibility      |
| ariaLabel        | string                      | -                           | Aria label for the icon                |

### Title and Description Props

```svelte
<ArrowDown
  title={{
    id: "ArrowDown-title",
    title: "ArrowDown Icon"
  }}
  desc={{
    id: "ArrowDown-desc",
    desc: "A ArrowDown icon that animates on hover"
  }}
/>
```

## Accessibility

All icons include proper ARIA attributes and support custom titles and descriptions. They are keyboard accessible when used with click events.

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