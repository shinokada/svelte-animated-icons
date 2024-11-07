<script lang="ts">
  import AcademicCap from './AcademicCap.svelte';
</script>

<AcademicCap size={50} color="blue" />

<AcademicCap size={50} color="red" event="onclick" />

<AcademicCap size={50} color="green" event="onmouseenter" />

<h1>Svelte Animated Icons</h1>

<p>
  A collection of animated SVG icons for Svelte with customizable draw transitions, events, and
  accessibility features. Each icon supports hover/click animations, customizable colors, sizes, and
  stroke widths.
</p>

<h2>Features</h2>

<ul>
  <li>🎨 Customizable colors, sizes, and stroke widths</li>
  <li>✨ Animated draw transitions on hover or click</li>
  <li>♿ Built-in accessibility features</li>
  <li>🎯 TypeScript support</li>
  <li>🔄 Configurable animation timing</li>
  <li>🎮 Multiple event trigger options</li>
</ul>

<h2>Installation</h2>

<pre><code>pnpm i -D svelte-animated-icons</code></pre>

<h2>Usage</h2>

<h3>With Custom Properties</h3>

<h2>Props</h2>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>size</td>
      <td>number</td>
      <td>24</td>
      <td>Icon size in pixels</td>
    </tr>
    <tr>
      <td>color</td>
      <td>string</td>
      <td>'currentColor'</td>
      <td>Icon color (any valid CSS color)</td>
    </tr>
    <tr>
      <td>strokeWidth</td>
      <td>number</td>
      <td>1.5</td>
      <td>Width of the icon strokes</td>
    </tr>
    <tr>
      <td>event</td>
      <td>'onmouseenter' | 'onclick'</td>
      <td>'onmouseenter'</td>
      <td>Event that triggers the animation</td>
    </tr>
    <tr>
      <td>pauseDuration</td>
      <td>number</td>
      <td>300</td>
      <td>Pause duration between animations (ms)</td>
    </tr>
    <tr>
      <td>transitionParams</td>
      <td>object</td>
      <td> duration: 800, delay: 0 </td>
      <td>Svelte transition parameters</td>
    </tr>
    <tr>
      <td>title</td>
      <td>object</td>
      <td>-</td>
      <td>SVG title for accessibility</td>
    </tr>
    <tr>
      <td>desc</td>
      <td>object</td>
      <td>-</td>
      <td>SVG description for accessibility</td>
    </tr>
    <tr>
      <td>ariaLabel</td>
      <td>string</td>
      <td>-</td>
      <td>Aria label for the icon</td>
    </tr>
  </tbody>
</table>

<h3>Title and Description Props</h3>

<h2>Accessibility</h2>

<p>
  All icons include proper ARIA attributes and support custom titles and descriptions. They are
  keyboard accessible when used with click events.
</p>

<h2>Browser Support</h2>

<p>Works in all modern browsers that support SVG and CSS animations.</p>

<h2>Development</h2>

<h3>Setup</h3>

<pre><code
    >git clone git@github.com:shinokada/svelte-animated-icons.git
cd svelte-animated-icons
pnpm install
</code></pre>

<h3>Running Tests</h3>

<pre><code
    >pnpm test:e2e
pnpm test
</code></pre>

<h3>Building</h3>

<pre><code>pnpm build</code></pre>

<h2>Contributing</h2>

<p>
  Contributions are welcome! Please read our contributing guidelines before submitting a pull
  request.
</p>

<h2>License</h2>

<p>MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
