import { computed, signal, effect, untracked, Signal } from '@angular/core';

export interface ComputedAsyncOptions<T> {
  initialValue?: T;
  requireSync?: boolean;
}

/**
 * Creates a signal that tracks an async computation.
 * Handles Promises and Observables.
 */
export function computedAsync<T>(
  computation: () => Promise<T> | T,
  options: ComputedAsyncOptions<T> = {},
): Signal<T | undefined> {
  const source = signal<T | undefined>(options.initialValue);

  effect(() => {
    const promiseOrValue = computation();

    if (promiseOrValue instanceof Promise) {
      untracked(() => {
        promiseOrValue.then((value) => source.set(value));
      });
    } else {
      untracked(() => {
        source.set(promiseOrValue);
      });
    }
  });

  return computed(() => source());
}
