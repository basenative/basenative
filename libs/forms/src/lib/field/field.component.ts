import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'fieldset[field]',
  standalone: true,
  templateUrl: './field.component.html',
  styleUrls: ['./field.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'semantic-fieldset',
  },
})
export class FieldComponent {}
