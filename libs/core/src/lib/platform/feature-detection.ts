/**
 * Browser feature support detection
 */
export const SUPPORTS = {
  anchorPositioning:
    typeof CSS !== 'undefined' && CSS.supports('anchor-name', '--test'),
  popover:
    typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype,
  containerQueries:
    typeof CSS !== 'undefined' && CSS.supports('container-type', 'inline-size'),
  hasSelector: typeof CSS !== 'undefined' && CSS.supports('selector(:has(*))'),
  startingStyle: typeof CSS !== 'undefined' && CSS.supports('@starting-style'),
  fieldSizing:
    typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content'),
  dialog: typeof HTMLDialogElement !== 'undefined',
  inert: typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype,
} as const;

export type SupportedFeature = keyof typeof SUPPORTS;
