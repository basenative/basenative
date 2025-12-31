import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InputComponent,
  WizardComponent,
  WizardStepComponent,
} from '@basenative/forms';

@Component({
  selector: 'article[forms-demo]',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    WizardComponent,
    WizardStepComponent,
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms {
  email = '';
}
