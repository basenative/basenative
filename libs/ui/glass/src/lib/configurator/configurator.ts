import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, tokens } from '@basenative/tokens';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '@basenative/forms';

@Component({
  selector: 'section[configurator]',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent],
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
})
export class Configurator {
  theme = inject(ThemeService);
  protected Object = Object;

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

  // --- Preview Canvas Logic ---
  scale = signal(1);
  pan = signal({ x: 0, y: 0 });
  isDragging = false;
  dragStart = { x: 0, y: 0 };

  startDrag(event: MouseEvent) {
    // Only drag if clicking directly on the container or essentially "empty" space
    // We don't want to drag if interacting with a component inside
    if ((event.target as HTMLElement).closest('.preview-sticky')) {
      // Optional: allow dragging from the card itself? Figma allows dragging from empty space.
      // For now, let's allow dragging everywhere as long as event isn't prevented?
      // Actually, typically you hold space to drag in Figma, or use middle click.
      // User asked for "drag around inside".
    }

    this.isDragging = true;
    this.dragStart = {
      x: event.clientX - this.pan().x,
      y: event.clientY - this.pan().y,
    };
    event.preventDefault(); // Prevent text selection
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    this.pan.set({
      x: event.clientX - this.dragStart.x,
      y: event.clientY - this.dragStart.y,
    });
  }

  endDrag() {
    this.isDragging = false;
  }

  zoomIn() {
    this.scale.update((s) => Math.min(s + 0.1, 3));
  }

  zoomOut() {
    this.scale.update((s) => Math.max(s - 0.1, 0.5));
  }

  resetView() {
    this.scale.set(1);
    this.pan.set({ x: 0, y: 0 });
  }
}
