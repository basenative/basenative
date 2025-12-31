import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'article[wizard-step]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-step.html',
  styleUrl: './wizard-step.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WizardStepComponent {
  title = input.required<string>();
  isActive = signal(false);
}
