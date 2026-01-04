import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ConsentReceipt, ConsentStateMachine, Purpose } from '@greenput/domain';
import { PurposeToggleComponent } from './purpose-toggle.component';

@Component({
  selector: 'section[greenput-disclosure]',
  standalone: true,
  imports: [CommonModule, PurposeToggleComponent],
  templateUrl: './disclosure.component.html',
  styleUrl: './disclosure.component.scss',
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'title',
  },
})
export class DisclosureComponent {
  // Inputs
  purposes = input.required<Purpose[]>();
  policyVersion = input<string>('1.0.0');

  // Output
  confirmed = output<ConsentReceipt>();

  // Internal State
  private _stateMachine = new ConsentStateMachine(); // In real app, might be injected
  private _draftSelections = signal<Record<string, boolean>>({});

  // Computed
  isPurposeSelected(id: string): boolean {
    return this._draftSelections()[id] ?? false;
  }

  updatePurpose(id: string, value: boolean) {
    this._draftSelections.update((s) => ({ ...s, [id]: value }));
  }

  async refuseAll() {
    const purposes = this.purposes();
    await this._stateMachine.refuseAll(purposes);
    if (this._stateMachine.state.currentReceipt) {
      this.confirmed.emit(this._stateMachine.state.currentReceipt);
    }
  }

  async confirm() {
    const statuses: Record<string, 'granted' | 'denied'> = {};
    const selections = this._draftSelections();

    this.purposes().forEach((p) => {
      if (p.isEssential) {
        statuses[p.id] = 'granted';
      } else {
        statuses[p.id] = selections[p.id] ? 'granted' : 'denied';
      }
    });

    await this._stateMachine.grant(statuses);
    if (this._stateMachine.state.currentReceipt) {
      this.confirmed.emit(this._stateMachine.state.currentReceipt);
    }
  }
}
