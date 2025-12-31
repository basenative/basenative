import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

@Directive({
  selector: '[scroll]',
  standalone: true,
  host: {
    style:
      'overflow: auto; display: block; scrollbar-width: thin; scrollbar-color: var(--glass-border) transparent;',
  },
})
export class ScrollDirective {
  // Simple directive to enforce scroll styles and behaviors
  // Could track scroll position or emit events
}
