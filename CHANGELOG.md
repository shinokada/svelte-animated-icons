# svelte-animated-icons

## 0.7.0

### Minor Changes

## Changed

- Refactored component to simplify event handling and improve accessibility
- Removed separate iconsvg snippet and consolidated SVG rendering
- Simplified prop interface by removing unnecessary props:

  - Removed role prop (now dynamically set based on event)
  - Removed enableFocusStyles and related focus styling props
  - Removed focusOutlineWidth, focusOutlineColor, focusOutlineOffset, and focusOutlineStyle

## Added

- Introduced isAnimating state to prevent multiple simultaneous animations
- Added dynamic event handlers using $derived to handle different event types more cleanly
- Improved logic to prevent animation when event is set to 'none'

## Removed

- Deleted complex focus styling CSS and dynamic focus style calculations
- Removed the wrapper <div> elements for different event types
- Removed buttonId and associated accessibility attributes
- Deleted positioning styles on the SVG element

## Improvements

- Simplified component structure
- More flexible event handling
- Better state management for animations
- Reduced code complexity

## 0.6.2

### Patch Changes

- fix: add enableFocusStyles
- fix: make the focus outline scale with icon size

## 0.6.1

### Patch Changes

- fix: .svg-icon to style
- fix: add a prop, class:className

## 0.6.0

### Minor Changes

- Replaced the <button> with a <div> that has proper ARIA attributes:
  - Added role="button" for interactive versions
  - Added role="img" for non-interactive version
  - Added tabindex="0" to make it focusable
  - Added appropriate aria-label
- Added keyboard support:
  - Added keyboard event handler for the Enter key
  - Added focus styles in CSS
  - Maintained keyboard accessibility
- Improved the structure:
  - Removed nested button structure
  - Moved all button-like styles to the icon-wrapper
  - Added focus styles for better accessibility

## 0.5.2

### Patch Changes

- fix: differences between the button and inner div when hovering
  - Using display: inline-flex on the button ensures it only takes up the exact space of its content
  - Setting line-height: 0 removes any extra vertical space
  - Changing the placeholder to display: flex provides better size control and alignment

## 0.5.1

### Patch Changes

- style: use display: inline-flex on the button ensures it only takes up the exact space of its content
  style: set line-height: 0 removes any extra vertical space
  style: change placeholder to display: flex provides better size control and alignment

## 0.5.0

### Minor Changes

- feat: use svelte snippet

## 0.4.0

### Minor Changes

- feat: iconicons

## 0.3.1

### Patch Changes

- fix: duration, delay

## 0.3.0

### Minor Changes

- feat: flowbite

## 0.2.0

### Minor Changes

- feat: heroicons
