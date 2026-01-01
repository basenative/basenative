import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, tokens } from '@basenative/tokens';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '@basenative/forms';
import { OpenGraphPreviewComponent } from '../open-graph-preview/open-graph-preview.component';

@Component({
  selector: 'section[configurator]',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    OpenGraphPreviewComponent,
  ],
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
})
export class Configurator {
  theme = inject(ThemeService);
  protected Object = Object;

  // Asset Configuration
  logoUrl = signal('assets/logo.svg');
  faviconUrl = signal('assets/logo.svg');
  appTitle = signal('BaseNative App');

  // Open Graph Configuration
  ogTitle = signal('BaseNative - Modern Angular Components');
  ogDescription = signal(
    'A glassmorphism-first component library for high-end web applications.',
  );
  ogImage = signal('assets/logo.svg');
  ogUrl = signal('https://basenative.com');

  // Flatten tokens for display
  flatTokens = computed(() => {
    const groups: Record<
      string,
      { name: string; value: string; type: string; cssVar: string }[]
    > = {};

    // Helper to traverse
    const traverse = (obj: Record<string, unknown>, prefix = '--') => {
      for (const key in obj) {
        if (key.startsWith('$')) continue;
        const val = obj[key] as Record<string, unknown>;
        const name = `${prefix}${prefix === '--' ? '' : '-'}${this.camelToKebab(key)}`;

        if (val && typeof val === 'object' && '$value' in val) {
          // It's a token
          const groupName = name.split('-')[2] || 'other'; // --color-x -> color
          if (!groups[groupName]) groups[groupName] = [];
          groups[groupName].push({
            name: name,
            value: val['$value'] as string,
            type: val['$type'] as string,
            cssVar: name,
          });
        } else if (val && typeof val === 'object') {
          traverse(val, name);
        }
      }
    };

    traverse(tokens as Record<string, unknown>);
    return groups;
  });

  camelToKebab(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }

  update(cssVar: string, event: Event) {
    const target = event.target as HTMLInputElement;
    this.theme.updateToken(cssVar, target.value);
  }
}
