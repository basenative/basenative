# Focus Trap

A primitive directive that traps focus within a DOM element. Essential for modals, dialogs, and specific accessibility patterns.

## Usage

```html
<div [focusTrap]="isOpen">
  <button>Inside</button>
  <button>Inside</button>
</div>
```

## Features

- **Traps Tab key**: Cycles focus between the first and last focusable elements.
- **Return Focus**: Returns focus to the previously focused element when destroyed or disabled.
- **Initial Focus**: Automatically focuses the first focusable element when enabled.
