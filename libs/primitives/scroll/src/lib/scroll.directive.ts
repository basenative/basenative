import { Directive } from '@angular/core';

@Directive({
  selector: '[scroll]',
  standalone: true,
  host: {
    style:
      'overflow: auto; display: block; scrollbar-width: thin; scrollbar-color: var(--color-border-glass) transparent;',
  },
})
export class ScrollDirective {
  // Simple directive to enforce scroll styles and behaviors
  // Could track scroll position or emit events
}
