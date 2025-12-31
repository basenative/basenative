import { Directive, computed, input } from '@angular/core';
import { AnchorPosition } from '../models/anchor-position';

/**
 * Positions an element relative to an anchor using CSS anchor positioning.
 * Automatically handles viewport collision and flipping.
 *
 * @example
 * <div anchored="my-anchor" position="bottom">Content</div>
 */
@Directive({
  selector: '[anchored]',
  standalone: true,
  host: {
    '[attr.popover]': 'popover() ? "auto" : null',
    '[style.position-anchor]': 'positionAnchor()',
    '[style.inset-area]': 'insetArea()',
    '[style.position-visibility]': '"anchors-visible"',
    '[style.margin]': 'offset() ? offset() + "px" : null',
  },
})
export class Anchored {
  /**
   * ID of the anchor to position relative to
   */
  readonly anchored = input.required<string>();

  /**
   * Preferred position relative to anchor
   */
  readonly position = input<AnchorPosition>('bottom');

  /**
   * Whether to use popover API for automatic layering
   */
  readonly popover = input(true);

  /**
   * Offset distance from anchor in pixels
   */
  readonly offset = input<number>(8);

  protected readonly positionAnchor = computed(() => `--${this.anchored()}`);
  protected readonly insetArea = computed(() => this.position());
}
