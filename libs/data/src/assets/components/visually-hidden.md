# Visually Hidden

A utility component that hides content visually while keeping it available to screen readers.

## Usage

```html
<span visually-hidden>This text is only for screen readers.</span>
```

## Accessibility

This component applies standard "sr-only" styles:

- `position: absolute`
- `width: 1px; height: 1px`
- `clip: rect(0,0,0,0)`

This ensures the content is removed from the visual flow but remains in the DOM for AT.
