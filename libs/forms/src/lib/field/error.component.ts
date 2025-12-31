import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'output[error]',
  standalone: true,
  templateUrl: './error.component.html',
  styleUrls: ['./field.css'], // Share styles
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'semantic-error',
    role: 'alert',
  },
})
export class ErrorComponent {}
