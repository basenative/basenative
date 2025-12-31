import { coerceBooleanProperty } from './boolean';

describe('coerceBooleanProperty', () => {
  it('should return true for true boolean', () => {
    expect(coerceBooleanProperty(true)).toBe(true);
  });

  it('should return false for false boolean', () => {
    // false stringifies to 'false', which matches the exclusion string
    expect(coerceBooleanProperty(false)).toBe(false);
  });

  it('should return true for empty string (attribute presence)', () => {
    expect(coerceBooleanProperty('')).toBe(true);
  });

  it('should return false for "false" string', () => {
    expect(coerceBooleanProperty('false')).toBe(false);
  });

  it('should return true for "true" string', () => {
    expect(coerceBooleanProperty('true')).toBe(true);
  });

  it('should return true for any non-false string', () => {
    expect(coerceBooleanProperty('yes')).toBe(true);
    expect(coerceBooleanProperty('1')).toBe(true);
    expect(coerceBooleanProperty('anything')).toBe(true);
  });

  it('should return false for null', () => {
    expect(coerceBooleanProperty(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(coerceBooleanProperty(undefined)).toBe(false);
  });

  it('should return true for numbers', () => {
    expect(coerceBooleanProperty(0)).toBe(true);
    expect(coerceBooleanProperty(1)).toBe(true);
    expect(coerceBooleanProperty(-1)).toBe(true);
  });
});
