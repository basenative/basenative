import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ConsentReceipt } from '@greenput/domain';

@Component({
  selector: 'greenput-receipt-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="receipt-card">
      <div class="header">
        <span class="title">Consent Receipt</span>
        <span class="version">v{{ receipt().policyVersion }}</span>
      </div>

      <div class="hash-row">
        <code>{{ shortHash() }}</code>
        <button (click)="copyHash()" title="Copy full hash">📋</button>
      </div>

      <div class="meta">
        <div class="row">
          <strong>Date:</strong> {{ receipt().timestamp | date: 'medium' }}
        </div>
        <div class="row"><strong>ID:</strong> {{ receipt().id }}</div>
      </div>

      <div class="purposes">
        <h4>Agreed Purposes:</h4>
        <ul>
          @for (p of acceptedPurposes(); track p.key) {
            <li class="granted">✅ {{ p.key }}</li>
          }
          @for (p of deniedPurposes(); track p.key) {
            <li class="denied">❌ {{ p.key }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .receipt-card {
        background: var(--color-surface-glass);
        border: 1px solid var(--color-border-glass);
        padding: 1.5rem;
        border-radius: var(--radius-md);
        font-family: var(--font-mono);
        max-width: 400px;
        color: var(--color-text-main);
      }
      .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--color-border-glass);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
      }
      .title {
        font-weight: bold;
        font-size: 1.1rem;
      }
      .hash-row {
        background: var(--color-surface-glass-hover);
        padding: 0.5rem;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        border: 1px solid var(--color-border-glass);
      }
      .purposes ul {
        padding-left: 1rem;
      }
      .granted {
        color: green;
      }
      .denied {
        color: red;
      }
    `,
  ],
})
export class ConsentReceiptViewerComponent {
  receipt = input.required<ConsentReceipt>();

  shortHash = computed(() => this.receipt().hash.substring(0, 16) + '...');

  acceptedPurposes = computed(() => {
    return Object.entries(this.receipt().purposes)
      .filter(([_, status]) => status === 'granted')
      .map(([key]) => ({ key }));
  });

  deniedPurposes = computed(() => {
    return Object.entries(this.receipt().purposes)
      .filter(([_, status]) => status === 'denied')
      .map(([key]) => ({ key }));
  });

  copyHash() {
    navigator.clipboard.writeText(this.receipt().hash);
  }
}
