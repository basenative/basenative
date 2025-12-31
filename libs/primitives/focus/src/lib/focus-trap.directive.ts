import {
  Directive,
  ElementRef,
  OnDestroy,
  Input,
  inject,
  booleanAttribute,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[focusTrap]',
  standalone: true,
})
export class FocusTrapDirective implements OnDestroy {
  private element = inject(ElementRef);
  private document = inject(DOCUMENT);
  private previouslyFocused: HTMLElement | null = null;
  private focusableSelector =
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

  @Input({ transform: booleanAttribute })
  set focusTrap(value: boolean) {
    if (value) {
      this.enable();
    } else {
      this.disable();
    }
  }

  ngOnDestroy() {
    this.disable();
  }

  private enable() {
    this.previouslyFocused = this.document.activeElement as HTMLElement;
    const firstFocusable = this.element.nativeElement.querySelector(
      this.focusableSelector,
    ) as HTMLElement;
    if (firstFocusable) {
      firstFocusable.focus();
    }
    this.element.nativeElement.addEventListener('keydown', this.handleKeydown);
  }

  private disable() {
    this.element.nativeElement.removeEventListener(
      'keydown',
      this.handleKeydown,
    );
    if (
      this.previouslyFocused &&
      this.document.body.contains(this.previouslyFocused)
    ) {
      this.previouslyFocused.focus();
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableChildren = Array.from(
      this.element.nativeElement.querySelectorAll(this.focusableSelector),
    ) as HTMLElement[];
    const first = focusableChildren[0];
    const last = focusableChildren[focusableChildren.length - 1];

    if (event.shiftKey) {
      if (this.document.activeElement === first) {
        last.focus();
        event.preventDefault();
      }
    } else {
      if (this.document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  };
}
