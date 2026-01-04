import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  ConsentReceipt,
  ConsentStateMachine,
  DataCategory,
  Purpose,
  Revocation,
} from '@greenput/domain';
import {
  ConsentReceiptViewerComponent,
  DataCategoryExplainerComponent,
  DisclosureComponent,
  RevocationHistoryComponent,
} from '@greenput/ui';

@Component({
  selector: 'app-greenput-showcase',
  standalone: true,
  imports: [
    CommonModule,
    DisclosureComponent,
    ConsentReceiptViewerComponent,
    RevocationHistoryComponent,
    DataCategoryExplainerComponent,
  ],
  template: `
    <div class="greenput-showcase-container">
      <header>
        <h1>Greenput Consent Platform</h1>
        <p>Ethical, purpose-driven consent management.</p>
      </header>

      <section class="status-panel">
        <h2>
          System Status:
          <span [class]="stateStatus()">{{ stateStatus() | uppercase }}</span>
        </h2>

        @if (currentReceipt()) {
          <div class="active-receipt-banner">
            Permissions Active (Version: {{ currentReceipt()?.policyVersion }})
          </div>
        }
      </section>

      <div class="main-flow">
        @if (
          stateStatus() === 'unknown' ||
          stateStatus() === 'prompted' ||
          stateStatus() === 'revoked'
        ) {
          <section class="disclosure-section">
            <h3>Consent Request</h3>
            <greenput-disclosure
              [purposes]="purposes"
              (confirmed)="onConsentConfirmed($event)"
            ></greenput-disclosure>
          </section>
        }

        @if (stateStatus() === 'consented' && currentReceipt()) {
          <section class="dashboard-section">
            <greenput-receipt-viewer
              [receipt]="currentReceipt()!"
            ></greenput-receipt-viewer>

            <div class="actions">
              <button class="btn btn-warning" (click)="revokeConsent()">
                Revoke All Consent
              </button>
            </div>
          </section>
        }

        @if (lastRevocation()) {
          <section class="history-section">
            <greenput-revocation-history
              [history]="revocationHistory()"
            ></greenput-revocation-history>
          </section>
        }
      </div>

      <section class="info-section">
        <h3>Data Categories Explained</h3>
        <div class="categories-grid">
          @for (cat of categories; track cat.id) {
            <greenput-data-category [category]="cat"></greenput-data-category>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .greenput-showcase-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: sans-serif;
        background: #f9f9f9;
        border-radius: 8px;
      }
      header {
        margin-bottom: 2rem;
        text-align: center;
      }
      .status-panel {
        padding: 1rem;
        background: white;
        border-radius: 4px;
        margin-bottom: 2rem;
        border: 1px solid #eee;
      }
      .status-panel span.unknown {
        color: orange;
      }
      .status-panel span.consented {
        color: green;
      }
      .status-panel span.revoked {
        color: red;
      }

      .actions {
        margin-top: 1rem;
        text-align: right;
      }
      .btn {
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      .btn-warning {
        background: #fee;
        border: 1px solid red;
        color: red;
      }

      .categories-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
      }
    `,
  ],
})
export class GreenputShowcaseComponent {
  // Domain Data Setup
  readonly purposes: Purpose[] = [
    {
      id: 'essential',
      name: 'Core Functionality',
      description: 'Required for security and load balancing.',
      isEssential: true,
    },
    {
      id: 'analytics',
      name: 'Usage Analytics',
      description: 'Helps us improve performance.',
      isEssential: false,
    },
    {
      id: 'personalization',
      name: 'Personalization',
      description: 'Remembers your preferences.',
      isEssential: false,
    },
  ];

  readonly categories: DataCategory[] = [
    {
      id: 'identifiers',
      name: 'Identifiers',
      description: 'IP Address, Session ID',
      examples: ['192.168.1.1', 'sess_123'],
      sensitivity: 'low',
    },
    {
      id: 'activity',
      name: 'Usage Data',
      description: 'Page views and clicks',
      examples: ['Clicked button A', 'Viewed page B'],
      sensitivity: 'medium',
    },
  ];

  // Logic
  private stateMachine = new ConsentStateMachine('v1.0-showcase');

  // Reactive State
  // Note: specific ChangeDetection not set, using default for showcase simplicity,
  // but signals used for rendering.
  readonly stateStatus = signal(this.stateMachine.state.status);
  readonly currentReceipt = signal<ConsentReceipt | undefined>(undefined);
  readonly lastRevocation = signal(this.stateMachine.state.lastRevocation);
  readonly revocationHistory = signal<Revocation[]>([]); // Simple tracking for demo

  onConsentConfirmed(receipt: ConsentReceipt) {
    console.log('Consent Confirmed:', receipt);
    this.refreshState();
  }

  revokeConsent() {
    this.stateMachine.revoke('User explicitly revoked via Showcase UI');
    this.refreshState();
    // Update history
    const revocation = this.lastRevocation();
    if (revocation) {
      this.revocationHistory.update((h) => [...h, revocation]);
    }
  }

  private refreshState() {
    const s = this.stateMachine.state;
    this.stateStatus.set(s.status);
    this.currentReceipt.set(s.currentReceipt);
    this.lastRevocation.set(s.lastRevocation);
  }
}
