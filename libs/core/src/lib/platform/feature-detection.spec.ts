import { SUPPORTS, SupportedFeature } from './feature-detection';

describe('SUPPORTS feature detection', () => {
  it('should be a readonly object', () => {
    expect(typeof SUPPORTS).toBe('object');
  });

  it('should have anchorPositioning property', () => {
    expect(typeof SUPPORTS.anchorPositioning).toBe('boolean');
  });

  it('should have popover property', () => {
    expect(typeof SUPPORTS.popover).toBe('boolean');
  });

  it('should have containerQueries property', () => {
    expect(typeof SUPPORTS.containerQueries).toBe('boolean');
  });

  it('should have hasSelector property', () => {
    expect(typeof SUPPORTS.hasSelector).toBe('boolean');
  });

  it('should have startingStyle property', () => {
    expect(typeof SUPPORTS.startingStyle).toBe('boolean');
  });

  it('should have fieldSizing property', () => {
    expect(typeof SUPPORTS.fieldSizing).toBe('boolean');
  });

  it('should have dialog property', () => {
    expect(typeof SUPPORTS.dialog).toBe('boolean');
  });

  it('should have inert property', () => {
    expect(typeof SUPPORTS.inert).toBe('boolean');
  });

  it('should have all expected keys', () => {
    const expectedKeys: SupportedFeature[] = [
      'anchorPositioning',
      'popover',
      'containerQueries',
      'hasSelector',
      'startingStyle',
      'fieldSizing',
      'dialog',
      'inert',
    ];
    expect(Object.keys(SUPPORTS).sort()).toEqual(expectedKeys.sort());
  });
});
