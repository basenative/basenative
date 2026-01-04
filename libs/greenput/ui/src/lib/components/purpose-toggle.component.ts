import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Purpose } from '@greenput/domain';

@Component({
  selector: 'greenput-purpose-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="toggle-container" [class.essential]="purpose().isEssential">
      <input
        type="checkbox"
        [checked]="checked() || purpose().isEssential"
        [disabled]="purpose().isEssential"
        (change)="onToggle($event)"
        aria-describedby="purpose-desc"
      />
      <span class="toggle-label">{{ purpose().name }}</span>
    </label>
    <p id="purpose-desc" class="description">{{ purpose().description }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 1rem;
      }
      .toggle-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
        cursor: pointer;
      }
      .toggle-container.essential {
        cursor: not-allowed;
        opacity: 0.8;
      }
      .description {
        font-size: 0.9rem;
        color: #666;
        margin: 0.25rem 0 0 1.5rem;
      }
    `,
  ],
})
export class PurposeToggleComponent {
  purpose = input.required<Purpose>();
  checked = input<boolean>(false);
  toggled = output<boolean>();

  onToggle(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggled.emit(isChecked);
  }
}
