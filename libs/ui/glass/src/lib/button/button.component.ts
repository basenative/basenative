import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[bn], a[bn], button[variant], a[variant]',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrl: './button.component.css',
  host: {
    '[attr.variant]': 'variant',
    '[attr.size]': 'size',
  },
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger' =
    'primary';
  @Input() size: 'sm' | 'md' | 'lg' | 'icon' = 'md';
}
