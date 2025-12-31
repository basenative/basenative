import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'glass-og-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="og-card">
      <div class="og-image-container">
        @if (image()) {
          <img [src]="image()" alt="Preview" class="og-image" />
        } @else {
          <div class="og-placeholder">
            <span>No Image</span>
          </div>
        }
      </div>
      <div class="og-content">
        <h3 class="og-title">{{ title() || 'Page Title' }}</h3>
        <p class="og-description">
          {{ description() || 'Page description goes here...' }}
        </p>
        <div class="og-url">{{ url() || 'example.com' }}</div>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        container-type: inline-size;
      }

      .og-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        max-width: 524px; /* Typical standard width */
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
          Arial, sans-serif;
      }

      .og-image-container {
        aspect-ratio: 1.91 / 1;
        background: var(--color-surface-panel);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-bottom: 1px solid var(--color-border);
      }

      .og-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .og-placeholder {
        color: var(--color-text-muted);
        font-size: 0.875rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
      }

      .og-content {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .og-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.25;
      }

      .og-description {
        font-size: 14px;
        color: var(--color-text-muted);
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }

      .og-url {
        font-size: 12px;
        color: var(--color-text-muted);
        text-transform: uppercase;
        margin-top: 4px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenGraphPreviewComponent {
  title = input<string>('');
  description = input<string>('');
  image = input<string>('');
  url = input<string>('');
}
