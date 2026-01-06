import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SignalStore } from '@basenative/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';

@Component({
  selector: 'section[signal-state-visualizer]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-state-visualizer.component.html',
  styleUrls: ['./signal-state-visualizer.component.css'],
})
export class SignalStateVisualizerComponent<T extends object> {
  store = input.required<SignalStore<T>>();
  private sanitizer = inject(DomSanitizer);

  formattedState = computed(() => {
    const s = this.store().$state();
    return JSON.stringify(s, null, 2);
  });

  highlightedState = computed(() => {
    const raw = this.formattedState();
    // Prism's JSON grammar might be 'json' or 'JSON' depending on version/bundle.
    // 'prismjs/components/prism-json' registers 'json'.
    const highlighted = Prism.highlight(raw, Prism.languages['json'], 'json');
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  });
}
