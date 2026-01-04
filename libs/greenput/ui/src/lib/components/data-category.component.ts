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
        border: 1px solid #eee;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 0.5rem;
        background: #f9f9f9;
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
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 4px;
        text-transform: uppercase;
      }
      .badge.high {
        background: #ffebee;
        color: #c62828;
      }
      .badge.medium {
        background: #fff3e0;
        color: #ef6c00;
      }
      .badge.low {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .examples {
        font-size: 0.85rem;
        color: #666;
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
