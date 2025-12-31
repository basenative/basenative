import {
  Component,
  ElementRef,
  input,
  model,
  output,
  effect,
  inject,
} from '@angular/core';

/**
 * Enhances native <dialog> element with Material Design styling and signal-based API.
 *
 * @example
 * <dialog modal [(open)]="isOpen">
 *   <header>
 *     <h2>Dialog Title</h2>
 *   </header>
 *   <p>Content</p>
 *   <footer>
 *     <button (click)="isOpen.set(false)">Close</button>
 *   </footer>
 * </dialog>
 */
@Component({
  selector: 'dialog[modal]',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  host: {
    '(close)': 'handleClose($event)',
    '(cancel)': 'handleCancel($event)',
  },
})
export class DialogComponent {
  private elementRef = inject(ElementRef<HTMLDialogElement>);

  /**
   * Controls whether the dialog is open
   */
  open = model(false);

  /**
   * Whether clicking the backdrop closes the dialog
   */
  closeOnBackdrop = input(true);

  /**
   * Emits when the dialog closes with its return value
   */
  closed = output<string>();

  constructor() {
    // Sync open signal with native dialog state
    effect(() => {
      const dialog = this.elementRef.nativeElement;
      if (!dialog) return;

      if (this.open() && !dialog.open) {
        dialog.showModal();
      } else if (!this.open() && dialog.open) {
        dialog.close();
      }
    });
  }

  /**
   * Programmatically close the dialog
   */
  close(returnValue?: string): void {
    this.elementRef.nativeElement.close(returnValue);
  }

  protected handleClose(event: Event): void {
    this.open.set(false);
    const dialog = event.target as HTMLDialogElement;
    this.closed.emit(dialog.returnValue);
  }

  protected handleCancel(event: Event): void {
    if (!this.closeOnBackdrop()) {
      event.preventDefault();
    }
  }
}
