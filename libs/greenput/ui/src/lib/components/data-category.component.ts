import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DataCategory } from '@greenput/domain';

@Component({
  selector: 'greenput-data-category',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="category-card"
      [class.sensitive]="category().sensitivity === 'high'"
    >
      <div class="header">
        <span class="name">{{ category().name }}</span>
        <span class="badge" [class]="category().sensitivity"
          >{{ category().sensitivity }} sensitivity</span
        >
      </div>
      <p class="description">{{ category().description }}</p>

      @if (category().examples.length > 0) {
        <div class="examples">
          Since for example:
          <ul>
            @for (ex of category().examples; track ex) {
              <li>{{ ex }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .category-card {
        border: 1px solid var(--color-border-glass);
        padding: 1rem;
        border-radius: var(--radius-md);
        margin-bottom: 0.5rem;
        background: var(--color-surface-glass);
        color: var(--color-text-main);
      }
      .category-card.sensitive {
        border-left: 4px solid #d32f2f;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .name {
        font-weight: 600;
        color: var(--color-text-main);
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 4px;
        text-transform: uppercase;
      }
      .badge.high {
        background: rgba(255, 235, 238, 0.2);
        color: #ef5350;
        border: 1px solid rgba(255, 235, 238, 0.1);
      }
      .badge.medium {
        background: rgba(255, 243, 224, 0.2);
        color: #ffa726;
        border: 1px solid rgba(255, 243, 224, 0.1);
      }
      .badge.low {
        background: rgba(232, 245, 233, 0.2);
        color: #66bb6a;
        border: 1px solid rgba(232, 245, 233, 0.1);
      }

      .description {
        color: var(--color-text-main);
      }

      .examples {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        margin-top: 0.5rem;
      }
      ul {
        margin: 0;
        padding-left: 1.2rem;
      }
    `,
  ],
})
export class DataCategoryExplainerComponent {
  category = input.required<DataCategory>();
}
