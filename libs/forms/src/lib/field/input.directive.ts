import { Directive } from '@angular/core';

@Directive({
  selector: 'input[input], textarea[input], select[input]',
  standalone: true,
  host: {
    class: 'semantic-input',
  },
})
export class InputDirective {}
