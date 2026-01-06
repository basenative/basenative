import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { createSignalStore } from '@basenative/core';
import { FeatureLayoutComponent } from '@basenative/ui-glass';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { SignalStateVisualizerComponent } from '../visualizer/signal-state-visualizer.component';

// --- Types ---
interface DemoState {
  count: number;
  query: string;
}

// --- Mock API ---
const mockSearch = (q: string) =>
  new Promise<string[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          q
            ? [`Result for "${q}" 1`, `Result for "${q}" 2`]
            : ['No Query', 'Try typing...'],
        ),
      1000,
    ),
  );

// --- Store Setup ---
// --- Store Setup ---
export function createDemoStore() {
  return createSignalStore(
    { count: 0, query: '' } as DemoState,
    (state, { patchState }) => {
      // 1. Computed (Derived State)
      const double = computed(() => state().count * 2);
      const status = computed(() =>
        state().count > 5 ? 'High Count!' : 'Low Count',
      );

      // 2. Linked Signal (Dependent Writable State)
      const activeQuery = linkedSignal(() => state().query);

      // 3. Resource (Async State)
      const searchResults = resource({
        params: () => ({ q: activeQuery() }),
        loader: ({ params }) => mockSearch(params.q),
      });

      // 4. Effects
      effect(() => {
        console.log(`[DemoStore Effect] Count is: ${state().count}`);
      });

      // 5. Actions (Methods)
      const increment = () =>
        patchState(state, (s) => ({ count: s.count + 1 }));
      const decrement = () =>
        patchState(state, (s) => ({ count: s.count - 1 }));
      const setQuery = (q: string) => {
        patchState(state, { query: q });
        activeQuery.set(q);
      };

      return {
        double,
        status,
        activeQuery,
        searchResults,
        increment,
        decrement,
        setQuery,
      };
    },
  );
}

// ... (keep mockSearch and createDemoStore same as before)

@Component({
  selector: 'article[signal-store-demo]',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SignalStateVisualizerComponent,
    FeatureLayoutComponent,
  ],
  templateUrl: './signal-store-demo.component.html',
  styleUrls: ['./signal-store-demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalStoreDemoComponent {
  store = createDemoStore();
  viewMode = signal<'demo' | 'code'>('demo');

  readonly code = `export function createDemoStore() {
  return createSignalStore(
    { count: 0, query: '' } as DemoState,
    (state, { patchState }) => {
      // 1. Computed (Derived State)
      const double = computed(() => state().count * 2);
      const status = computed(() =>
        state().count > 5 ? 'High Count!' : 'Low Count',
      );

      // 2. Linked Signal (Dependent Writable State)
      const activeQuery = linkedSignal(() => state().query);

      // 3. Resource (Async State)
      const searchResults = resource({
        params: () => ({ q: activeQuery() }),
        loader: ({ params }) => mockSearch(params.q),
      });

      // 4. Effects
      effect(() => {
        console.log(\`[DemoStore Effect] Count is: \${state().count}\`);
      });

      // 5. Actions (Methods)
      const increment = () =>
        patchState(state, (s) => ({ count: s.count + 1 }));
      const decrement = () =>
        patchState(state, (s) => ({ count: s.count - 1 }));
      const setQuery = (q: string) => {
        patchState(state, { query: q });
        activeQuery.set(q);
      };

      return {
        double,
        status,
        activeQuery,
        searchResults,
        increment,
        decrement,
        setQuery,
      };
    },
  );
}`;

  private sanitizer = inject(DomSanitizer);
  highlightedCode = this.sanitizer.bypassSecurityTrustHtml(
    Prism.highlight(this.code, Prism.languages['typescript'], 'typescript'),
  );
}
