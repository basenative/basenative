import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ConsentReceipt, ConsentStateMachine, Purpose } from '@greenput/domain';
import { PurposeToggleComponent } from './purpose-toggle.component';

@Component({
  selector: 'greenput-disclosure',
  standalone: true,
  imports: [CommonModule, PurposeToggleComponent],
  template: `
    <div
      class="disclosure-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="title"
    >
      <h2 id="title">We value your privacy logic</h2>
      <p>
        We do not collect data without an explicit reason. Please review and
        choose what you are comfortable sharing. Refusal is always respected.
      </p>

      <section class="purposes">
        @for (p of purposes(); track p.id) {
          <greenput-purpose-toggle
            [purpose]="p"
            [checked]="p.isEssential || isPurposeSelected(p.id)"
            (toggled)="updatePurpose(p.id, $event)"
          />
        }
      </section>

      <div class="actions">
        <button class="btn-refuse" (click)="refuseAll()">
          Refuse non-essential
        </button>
        <button class="btn-accept" (click)="confirm()">Confirm choices</button>
      </div>
    </div>
  `,
  styles: [
    `
      .disclosure-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        border: 1px solid #eee;
      }
      h2 {
        margin-top: 0;
      }
      .actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }
      button {
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        border: none;
        font-weight: bold;
        cursor: pointer;
      }
      .btn-refuse {
        background: transparent;
        border: 2px solid #ccc;
        color: #555;
      }
      .btn-accept {
        background: #008800; /* Greenput Green */
        color: white;
      }
    `,
  ],
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
    this.confirmed.emit(this._stateMachine.state.currentReceipt!);
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
    this.confirmed.emit(this._stateMachine.state.currentReceipt!);
  }
}
