/**
 * Coerces a data-bound value (typically a string) to a boolean.
 */
export function coerceBooleanProperty(value: unknown): boolean {
  return value != null && `${value}` !== 'false';
}

export type BooleanInput = string | boolean | null | undefined;
