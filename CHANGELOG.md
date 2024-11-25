# svelte-animated-icons

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
