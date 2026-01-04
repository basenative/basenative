import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Purpose } from '@greenput/domain';

@Component({
  selector: 'div[greenput-purpose-toggle]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purpose-toggle.component.html',
  styleUrl: './purpose-toggle.component.scss',
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
