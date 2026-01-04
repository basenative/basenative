# Anchor Positioning

A primitive directive for positioning elements relative to a trigger element.

## Usage

```angular-html
<button #trigger (click)="menuOpen = !menuOpen">Open Menu</button>
@if (menuOpen) {
  <div [anchor]="trigger" anchorPlacement="bottom">Menu Content</div>
}
```

## Features

- **Declarative Association**: Link anchor to trigger via input.
- **Placements**: helper for top/bottom/left/right positioning.
- **Fixed Positioning**: Uses absolute/fixed positioning relative to the viewport/trigger.

## Inputs

- `[anchor]`: The Trigger element (HTMLElement).
- `[anchorPlacement]`: 'top' | 'bottom' | 'left' | 'right' (default: 'bottom').
