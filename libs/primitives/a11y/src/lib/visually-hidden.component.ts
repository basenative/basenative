import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'span[visually-hidden]',
  standalone: true,
  templateUrl: './visually-hidden.component.html',
  styleUrl: './visually-hidden.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisuallyHiddenComponent {}
