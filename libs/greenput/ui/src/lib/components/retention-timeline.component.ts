import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RetentionPeriod } from '@greenput/domain';

@Component({
  selector: 'div[greenput-retention-timeline]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retention-timeline.component.html',
  styleUrl: './retention-timeline.component.scss',
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
