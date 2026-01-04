import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Revocation } from '@greenput/domain';

@Component({
  selector: 'greenput-revocation-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h3>Revocation History</h3>
      @if (history().length === 0) {
        <p class="empty">No revocations on file.</p>
      }

      <ul class="timeline">
        @for (rev of history(); track rev.timestamp) {
          <li class="event">
            <span class="date">{{ rev.timestamp | date: 'short' }}</span>
            <div class="details">
              <strong>Revoked Receipt:</strong>
              {{ rev.receiptId.substring(0, 8) }}...
              @if (rev.reason) {
                <p class="reason">"{{ rev.reason }}"</p>
              }
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .history-container {
        padding: 1rem;
      }
      .timeline {
        list-style: none;
        padding: 0;
      }
      .event {
        border-left: 2px solid var(--color-border-glass);
        padding-left: 1rem;
        margin-bottom: 1rem;
        position: relative;
        color: var(--color-text-main);
      }
      .event::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-text-muted);
      }
      .date {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
      .reason {
        font-style: italic;
        margin: 0.25rem 0 0;
      }
    `,
  ],
})
export class RevocationHistoryComponent {
  history = input.required<Revocation[]>();
}
