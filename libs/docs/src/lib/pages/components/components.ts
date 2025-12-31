import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { marked } from 'marked';
import { IconComponent } from '@basenative/ui/glass';

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
