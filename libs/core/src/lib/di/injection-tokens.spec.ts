import { TestBed } from '@angular/core/testing';
import { DOCUMENT_REF, WINDOW_REF } from './injection-tokens';

describe('Injection Tokens', () => {
  describe('DOCUMENT_REF', () => {
    it('should provide document by default', () => {
      TestBed.configureTestingModule({});
      const doc = TestBed.inject(DOCUMENT_REF);
      expect(doc).toBe(document);
    });
  });

  describe('WINDOW_REF', () => {
    it('should provide window by default', () => {
      TestBed.configureTestingModule({});
      const win = TestBed.inject(WINDOW_REF);
      expect(win).toBe(window);
    });
  });
});
