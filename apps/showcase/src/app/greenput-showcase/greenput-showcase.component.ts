import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
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
  RevocationHistoryComponent,
} from '@greenput/ui';

@Component({
  selector: 'app-greenput-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConsentReceiptViewerComponent,
    RevocationHistoryComponent,
    DataCategoryExplainerComponent,
  ],
  template: `
    <div class="greenput-showcase-container">
      <header>
        <h1>ServiceConnect</h1>
        <p>Get matched with top-rated local pros.</p>
      </header>

      <!-- PHASE 1: LEAD INTAKE (The "Consent" Event) -->
      @if (!currentReceipt()) {
        <section class="lead-form-section">
          <h2>Request a Quote</h2>
          <form (ngSubmit)="submitLead()" #leadForm="ngForm">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="formData.name"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="formData.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="details">Project Details</label>
              <textarea
                id="details"
                name="details"
                [(ngModel)]="formData.details"
                required
              ></textarea>
            </div>

            <div class="consent-disclosure">
              <p>
                <strong>Transparency Notice:</strong> By clicking "Get Quotes",
                you authorize us to:
              </p>
              <ul>
                <li>Store your contact details (Retention: 90 days)</li>
                <li>Share this request with up to 3 verified providers</li>
              </ul>
              <p class="small">
                We do not sell your data to ad networks. You can export or
                revoke this data at any time.
              </p>
              <!-- Portability/Audit Pre-check -->
              <div class="audit-preview">
                <small>Data Categories: {{ getCategoryNames() }}</small>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="!leadForm.form.valid"
            >
              Get Quotes
            </button>
          </form>
        </section>
      }

      <!-- PHASE 2: CONSENT DASHBOARD (Post-Submission) -->
      @if (currentReceipt()) {
        <section class="success-dashboard">
          <div class="success-message">
            <h2>Request Sent!</h2>
            <p>
              Your data was securely processed. Here is your proof of consent.
            </p>
          </div>

          <greenput-receipt-viewer
            [receipt]="currentReceipt()!"
          ></greenput-receipt-viewer>

          <div class="data-controls">
            <h3>Your Data Protocol</h3>
            <div class="button-group">
              <button class="btn btn-outline" (click)="exportData()">
                ⬇️ Export My Data (JSON)
              </button>
              <button class="btn btn-warning" (click)="revokeConsent()">
                🚫 Revoke & Delete
              </button>
            </div>
          </div>
        </section>
      }

      <!-- HISTORY & EDUCATION -->
      @if (revocationHistory().length > 0) {
        <section class="history-section">
          <h3>History</h3>
          <greenput-revocation-history
            [history]="revocationHistory()"
          ></greenput-revocation-history>
        </section>
      }

      <section class="info-section">
        <h3>How we handle your data</h3>
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
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: var(--font-sans);
        background: var(--color-surface-panel);
        color: var(--color-text-main);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        border: 1px solid var(--color-border-glass);
      }
      header {
        text-align: center;
        margin-bottom: 2rem;
      }
      h1 {
        margin-bottom: 0.5rem;
      }
      h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .form-group {
        margin-bottom: 1rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--color-text-main);
      }
      input,
      textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid var(--color-border-glass);
        background: var(--color-surface-glass);
        color: var(--color-text-main);
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-family: inherit;
      }

      .consent-disclosure {
        background: var(--color-surface-glass);
        padding: 1rem;
        border-radius: var(--radius-md);
        margin: 1.5rem 0;
        font-size: 0.9rem;
        border-left: 4px solid #2ecc71;
      }
      .consent-disclosure ul {
        padding-left: 1.2rem;
        margin: 0.5rem 0;
      }
      /* Ensure text in disclosure is readable */
      .consent-disclosure p,
      .consent-disclosure li {
        color: var(--color-text-main);
      }
      .small {
        font-size: 0.85rem;
        opacity: 0.8;
      }

      .btn {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.1s;
      }
      .btn:active {
        transform: scale(0.98);
      }
      .btn-primary {
        background: #2ecc71;
        color: white;
        width: 100%;
      }
      .btn-primary:disabled {
        background: var(--color-surface-glass-hover);
        color: var(--color-text-muted);
        cursor: not-allowed;
      }
      .btn-outline {
        background: transparent;
        border: 2px solid #2ecc71;
        color: #2ecc71;
      }
      .btn-warning {
        background: #e74c3c;
        color: white;
      }

      .success-message {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background: rgba(
          46,
          204,
          113,
          0.1
        ); /* Transparent tint for dark mode compat */
        border-radius: var(--radius-md);
        color: #2ecc71;
      }

      .button-group {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
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
  private http = inject(HttpClient);

  formData = {
    name: '',
    email: '',
    details: '',
  };

  // Domain Configuration
  readonly purposes: Purpose[] = [
    {
      id: 'lead-intake',
      name: 'Service Matching',
      description: 'Find providers for your project.',
      isEssential: true,
    },
    {
      id: 'communication',
      name: 'Communication',
      description: 'Allow providers to contact you.',
      isEssential: true,
    },
  ];

  readonly categories: DataCategory[] = [
    {
      id: 'contact',
      name: 'Contact Info',
      description: 'Name, Email',
      sensitivity: 'medium',
      examples: ['John Doe', 'john@example.com'],
    },
    {
      id: 'project',
      name: 'Project Details',
      description: 'Scope and requirements',
      sensitivity: 'low',
      examples: ['Rewiring a house'],
    },
  ];

  private stateMachine = new ConsentStateMachine('v1.0-lead-flow');

  // Signals
  readonly currentReceipt = signal<ConsentReceipt | undefined>(undefined);
  readonly revocationHistory = signal<Revocation[]>([]);

  getCategoryNames(): string {
    return this.categories.map((c) => c.name).join(', ');
  }

  async submitLead() {
    // 1. "Action is Consent" - We record the consent *because* they submitted the form
    const consentMap: Record<string, 'granted'> = {};
    for (const p of this.purposes) {
      consentMap[p.id] = 'granted';
    }

    await this.stateMachine.grant(consentMap);

    // 2. Generate Receipt (Local State)
    const receipt = this.stateMachine.state.currentReceipt;

    if (receipt) {
      this.currentReceipt.set(receipt);

      // 3. Persist to Cloudflare Worker (Remote)
      try {
        const payload = {
          formData: this.formData,
          purposes: consentMap,
        };

        console.log('Submitting to:', environment.apiUrl);
        const remoteReceipt = await firstValueFrom(
          this.http.post<ConsentReceipt>(
            `${environment.apiUrl}/leads`,
            payload,
          ),
        );

        console.log('Remote Receipt Confirmed:', remoteReceipt);
      } catch (err) {
        console.error('Failed to submit lead to remote:', err);
        // Don't alert for now, just log. We want the UI to be responsive.
      }
    }
  }

  exportData() {
    const exportPacket = {
      user_data: this.formData,
      consent_receipt: this.currentReceipt(),
      exported_at: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportPacket, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greenput-data-export-${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  revokeConsent() {
    this.stateMachine.revoke('User initiated revocation via Dashboard');
    const revocation = this.stateMachine.state.lastRevocation;
    if (revocation) {
      this.revocationHistory.update((h) => [revocation, ...h]);
    }
    this.currentReceipt.set(undefined);
    this.formData = { name: '', email: '', details: '' }; // Clear data on revocation
  }
}
