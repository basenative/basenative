import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'glass-og-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-graph-preview.component.html',
  styleUrl: './open-graph-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenGraphPreviewComponent {
  title = input<string>('');
  description = input<string>('');
  image = input<string>('');
  url = input<string>('');
}
