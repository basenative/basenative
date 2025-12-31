import { Directive, computed, input } from '@angular/core';

/**
 * Marks an element as an anchor point for positioned content.
 * Uses CSS anchor-name to establish the anchor.
 *
 * @example
 * <button anchor="my-anchor">Trigger</button>
 * <div anchored="my-anchor">Positioned content</div>
 */
@Directive({
  selector: '[anchor]',
  standalone: true,
  host: {
    '[style.anchor-name]': 'anchorName()',
  },
})
export class Anchor {
  /**
   * Unique identifier for this anchor point
   */
  readonly anchor = input.required<string>();

  protected readonly anchorName = computed(() => `--${this.anchor()}`);
}
