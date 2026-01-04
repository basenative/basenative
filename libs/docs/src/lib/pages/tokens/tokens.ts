import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tokens } from '@basenative/tokens';
import { Configurator } from '@basenative/ui-glass';

@Component({
  selector: 'article[tokens-page]',
  standalone: true,
  imports: [CommonModule, Configurator],
  templateUrl: './tokens.html',
  styleUrl: './tokens.css',
})
export class TokensPage {
  protected Object = Object;

  flatTokens = computed(() => {
    const groups: Record<
      string,
      { name: string; shortName: string; value: string; type: string }[]
    > = {};

    const traverse = (obj: Record<string, unknown>, prefix = '-') => {
      for (const key in obj) {
        if (key.startsWith('$')) continue;
        const val = obj[key] as Record<string, unknown>;
        const name = `${prefix}-${this.camelToKebab(key)}`;

        if (val && typeof val === 'object' && '$value' in val) {
          const tv = val as unknown as TokenValue;
          const groupName = prefix.split('-')[2] || 'other';
          if (!groups[groupName]) groups[groupName] = [];
          groups[groupName].push({
            name: name,
            shortName: key,
            value: tv.$value,
            type: tv.$type,
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
}

interface TokenValue {
  $value: string;
  $type: string;
}
