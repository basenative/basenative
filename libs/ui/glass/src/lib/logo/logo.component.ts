import { Component, numberAttribute, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'figure[logo]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  static nextId = 0;
  readonly id = `logo-${++LogoComponent.nextId}`;
  @Input({ transform: numberAttribute }) size = 32;
}
