import { Directive, effect, input, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusTrap]',
  standalone: true,
})
export class FocusTrap {
  enabled = input(true);

  private previouslyFocused: HTMLElement | null = null;
  private el = inject(ElementRef).nativeElement as HTMLElement;

  constructor() {
    effect(() => {
      if (this.enabled()) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  private activate() {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.setSiblingsInert(true);

    // Focus first focusable element
    const first = this.el.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }

  private deactivate() {
    this.setSiblingsInert(false);
    this.previouslyFocused?.focus();
  }

  private setSiblingsInert(inert: boolean) {
    const parent = this.el.parentElement;
    if (!parent) return;

    Array.from(parent.children).forEach((sibling) => {
      if (sibling !== this.el && sibling instanceof HTMLElement) {
        sibling.inert = inert;
      }
    });
  }
}
