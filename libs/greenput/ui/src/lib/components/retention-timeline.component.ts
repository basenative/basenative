import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RetentionPeriod } from '@greenput/domain';

@Component({
  selector: 'greenput-retention-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline-container">
      <div class="icon-clock" aria-hidden="true">🕒</div>
      <div class="content">
        <div class="duration">
          <strong>Kept for: </strong>
          <span class="highlight">{{ formatDuration() }}</span>
        </div>
        <div class="justification">{{ retention().justification }}</div>
        <div class="desc">{{ retention().description }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .timeline-container {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        border-top: 1px solid #f0f0f0;
        padding-top: 1rem;
        margin-top: 1rem;
      }
      .icon-clock {
        font-size: 1.5rem;
      }
      .duration {
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
      }
      .highlight {
        color: #008800;
        font-weight: bold;
      }
      .justification {
        font-size: 0.85rem;
        font-style: italic;
        color: #555;
      }
      .desc {
        font-size: 0.85rem;
        color: #777;
      }
    `,
  ],
})
export class RetentionTimelineComponent {
  retention = input.required<RetentionPeriod>();

  formatDuration = computed(() => {
    const r = this.retention();
    if (r.unit === 'forever') return 'Indefinitely';
    if (r.unit === 'session') return 'Until you close the tab';
    return `${r.value} ${r.unit}`;
  });
}
