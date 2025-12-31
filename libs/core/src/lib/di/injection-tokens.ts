import { InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to reference the document object.
 */
export const DOCUMENT_REF = new InjectionToken<Document>('DOCUMENT_REF', {
  providedIn: 'root',
  factory: () => document,
});

/**
 * Injection token that can be used to reference the window object.
 */
export const WINDOW_REF = new InjectionToken<Window>('WINDOW_REF', {
  providedIn: 'root',
  factory: () => window,
});
