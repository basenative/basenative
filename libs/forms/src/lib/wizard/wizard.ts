import {
  Component,
  contentChildren,
  signal,
  effect,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStepComponent } from './wizard-step/wizard-step';

@Component({
  selector: 'section[wizard]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard.html',
  styleUrl: './wizard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WizardComponent {
  steps = contentChildren(WizardStepComponent);
  currentStepIndex = signal(0);

  constructor() {
    effect(() => {
      const index = this.currentStepIndex();
      this.steps().forEach((step, i) => step.isActive.set(i === index));
    });
  }

  next() {
    if (this.currentStepIndex() < this.steps().length - 1) {
      this.currentStepIndex.update((i) => i + 1);
    }
  }

  prev() {
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update((i) => i - 1);
    }
  }
}
