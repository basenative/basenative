import { signal, computed, Signal } from '@angular/core';

export type SignalStore<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown
    ? T[K]
    : Signal<T[K]>;
} & {
  $update: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  $state: Signal<T>;
};

/**
 * Creates a lightweight signal-based store.
 */
export function createSignalStore<T extends object>(
  initialState: T,
): SignalStore<T> {
  const state = signal(initialState);

  const store = {
    $state: state.asReadonly(),
    $update: (updater: Partial<T> | ((state: T) => Partial<T>)) => {
      state.update((current) => {
        const partial =
          typeof updater === 'function'
            ? (updater as (state: T) => Partial<T>)(current)
            : updater;
        return { ...current, ...partial };
      });
    },
  } as SignalStore<T>;

  // Create readonly signals for each property
  for (const key of Object.keys(initialState)) {
    (store as Record<string, unknown>)[key] = computed(
      () => state()[key as keyof T],
    );
  }

  return store;
}
