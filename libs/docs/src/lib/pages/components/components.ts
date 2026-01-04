import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '@basenative/ui-glass';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import { forkJoin, map, switchMap } from 'rxjs';

// Custom Angular Grammar
// Custom Angular Grammar
Prism.languages['angular-html'] = Prism.languages.extend('markup', {});

type PrismGrammarWithTag = Prism.Grammar & {
  tag: {
    inside: Prism.Grammar;
  };
};

const tag = (Prism.languages['angular-html'] as unknown as PrismGrammarWithTag)
  .tag;
const originalInside = tag.inside;

tag.inside = {}; // clear it first to control order

const angularAttributes = {
  'structural-directive': {
    pattern: /\*[\w-]+(?=\s*=?)/,
    alias: 'keyword',
  },
  binding: {
    pattern: /\[[\w-.]+\](?=\s*=?)/,
    alias: 'function',
  },
  event: {
    pattern: /\([\w-.]+\)(?=\s*=?)/,
    alias: 'variable',
  },
};

// Rebuild tag.inside: Angular attributes FIRST, then standard attributes
Object.assign(tag.inside, angularAttributes, originalInside);

Prism.languages.insertBefore('angular-html', 'tag', {
  'control-flow': {
    pattern:
      /@(?:if|for|switch|case|default|else|defer|loading|placeholder|error|empty)\b/,
    alias: 'keyword',
  },
  interpolation: {
    pattern: /\{\{[^}]+\}\}/,
    inside: {
      delimiter: {
        pattern: /^\{\{|\}\}$/,
        alias: 'punctuation',
      },
      rest: Prism.languages['typescript'],
    },
  },
});

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      // Auto-detect HTML to be angular-html for better highlighting
      if (lang === 'html' || lang === 'angular') lang = 'angular-html';

      if (lang && Prism.languages[lang]) {
        return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(text, Prism.languages[lang], lang)}</code></pre>`;
      }
      return `<pre><code class="language-${lang || 'plaintext'}">${text}</code></pre>`;
    },
  },
});

interface ComponentDoc {
  id: string;
  title: string;
  description: string;
  icon?: string;
  content: string;
}

import { PreviewComponent } from '../../components/preview/preview.component';

@Component({
  selector: 'docs-components',
  standalone: true,
  imports: [CommonModule, IconComponent, PreviewComponent],
  templateUrl: './components.html',
  styleUrl: './components.css',
  encapsulation: ViewEncapsulation.None,
})
export class ComponentsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  selectedId = toSignal(
    this.route.queryParams.pipe(map((params) => params['component'] ?? null)),
  );

  items = signal<ComponentDoc[]>([]);

  view = computed(() => {
    const id = this.selectedId();
    if (!id) return { mode: 'list' as const, items: this.items() };
    const doc = this.items().find((i) => i.id === id);
    return { mode: 'detail' as const, doc };
  });

  constructor() {
    this.http
      .get<
        {
          file: string;
          slug: string;
          icon?: string;
          title?: string;
          description?: string;
        }[]
      >('assets/components/manifest.json')
      .pipe(
        switchMap((manifest) => {
          const requests = manifest.map((item) =>
            this.http
              .get('assets/components/' + item.file, { responseType: 'text' })
              .pipe(
                map((text) => {
                  const parsed = this.parseDoc(text, item.slug);
                  return {
                    ...parsed,
                    title: item.title || parsed.title,
                    description: item.description || parsed.description,
                    icon: item.icon,
                  };
                }),
              ),
          );
          return forkJoin(requests);
        }),
      )
      .subscribe((docs) => {
        this.items.set(docs);
      });
  }

  select(id: string) {
    const nav = () =>
      this.router.navigate([], {
        queryParams: { component: id },
        queryParamsHandling: 'merge',
      });

    if (!('startViewTransition' in document)) {
      nav();
      return;
    }
    (
      document as Document & { startViewTransition: (cb: () => void) => void }
    ).startViewTransition(() => {
      nav();
    });
  }

  back() {
    const nav = () =>
      this.router.navigate([], {
        queryParams: { component: null },
        queryParamsHandling: 'merge',
      });

    if (!('startViewTransition' in document)) {
      nav();
      return;
    }
    (
      document as Document & { startViewTransition: (cb: () => void) => void }
    ).startViewTransition(() => {
      nav();
    });
  }

  private parseDoc(text: string, slug: string): ComponentDoc {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

    if (!match) {
      return {
        id: slug,
        title: slug,
        description: '',
        content: marked.parse(text) as string,
      };
    }

    const frontMatter = match[1];
    const content = match[2];

    const titleMatch = frontMatter.match(/title:\s*(.*)/);
    const descMatch = frontMatter.match(/description:\s*(.*)/);

    return {
      id: slug,
      title: titleMatch ? titleMatch[1].trim() : slug,
      description: descMatch ? descMatch[1].trim() : '',
      content: marked.parse(content.trim()) as string,
    };
  }
}
