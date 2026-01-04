import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'article[greenput-showcase]',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConsentReceiptViewerComponent,
    RevocationHistoryComponent,
    DataCategoryExplainerComponent,
  ],
  templateUrl: './greenput-showcase.component.html',
  styleUrl: './greenput-showcase.component.css',
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
