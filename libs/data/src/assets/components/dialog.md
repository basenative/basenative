# Dialog

A headless dialog service for rendering modals and overlays.

## Usage

```typescript
@Component({ ... })
class MyComponent {
  dialog = inject(DialogService);
  @ViewChild('myDialog') template: TemplateRef<unknown>;

  open() {
    this.dialogRef = this.dialog.open(this.template);
  }
}
```

```html
<ng-template #myDialog>
  <div class="dialog-content">
    <h1>Hello World</h1>
    <button (click)="dialogRef.close()">Close</button>
  </div>
</ng-template>
```

## Features

- **Programmatic Control**: Open/Close via service.
- **Overlay Management**: Handles backdrop and z-index automatically.
- **Cleanup**: Destroys views and removes elements on close.
