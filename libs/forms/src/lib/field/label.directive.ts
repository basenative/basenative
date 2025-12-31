import { Directive } from '@angular/core';

@Directive({
  selector: 'legend[label], label[label]',
  standalone: true,
  host: {
    class: 'semantic-label',
  },
})
export class LabelDirective {}
