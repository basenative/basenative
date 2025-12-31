import { coerceNumberProperty, _isNumberValue } from './number';

describe('coerceNumberProperty', () => {
  it('should return number for number input', () => {
    expect(coerceNumberProperty(42)).toBe(42);
    expect(coerceNumberProperty(0)).toBe(0);
    expect(coerceNumberProperty(-10)).toBe(-10);
  });

  it('should parse numeric strings', () => {
    expect(coerceNumberProperty('42')).toBe(42);
    expect(coerceNumberProperty('3.14')).toBe(3.14);
    expect(coerceNumberProperty('-5')).toBe(-5);
  });

  it('should return fallback for null', () => {
    expect(coerceNumberProperty(null)).toBe(0);
    expect(coerceNumberProperty(null, 100)).toBe(100);
  });

  it('should return fallback for undefined', () => {
    expect(coerceNumberProperty(undefined)).toBe(0);
    expect(coerceNumberProperty(undefined, 50)).toBe(50);
  });

  it('should return fallback for non-numeric strings', () => {
    expect(coerceNumberProperty('abc')).toBe(0);
    expect(coerceNumberProperty('hello', 99)).toBe(99);
  });

  it('should return fallback for mixed strings like "123hello"', () => {
    expect(coerceNumberProperty('123hello')).toBe(0);
  });

  it('should return fallback for empty string', () => {
    expect(coerceNumberProperty('')).toBe(0);
  });
});

describe('_isNumberValue', () => {
  it('should return true for numbers', () => {
    expect(_isNumberValue(42)).toBe(true);
    expect(_isNumberValue(0)).toBe(true);
    expect(_isNumberValue(-1)).toBe(true);
    expect(_isNumberValue(3.14)).toBe(true);
  });

  it('should return true for numeric strings', () => {
    expect(_isNumberValue('42')).toBe(true);
    expect(_isNumberValue('3.14')).toBe(true);
    expect(_isNumberValue('-5')).toBe(true);
  });

  it('should return false for non-numeric values', () => {
    expect(_isNumberValue(null)).toBe(false);
    expect(_isNumberValue(undefined)).toBe(false);
    expect(_isNumberValue('')).toBe(false);
    expect(_isNumberValue('abc')).toBe(false);
    expect(_isNumberValue('123hello')).toBe(false);
  });
});
