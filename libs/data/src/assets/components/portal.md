# Portal

A primitive directive that renders content into the `document.body` (or a specific outlet). Solves z-index and overflow clipping issues.

## Usage

```html
<ng-template [portal]="isOpen">
  <div class="modal">I am attached to the body!</div>
</ng-template>
```

## Features

- **Project to Body**: Moves the template content to be a direct child of `<body>`.
- **Automatic Cleanup**: Removes content when destroyed or toggled off.
