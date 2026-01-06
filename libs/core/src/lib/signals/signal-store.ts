import { computed, signal, Signal, WritableSignal } from '@angular/core';

export type SignalStore<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown
    ? T[K]
    : Signal<T[K]>;
} & {
  $update: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  $state: Signal<T>;
};

export type SignalStoreUpdate<T> = Partial<T> | ((state: T) => Partial<T>);

/**
 * Updates a signal state immutably.
 * Can be used as a standalone utility or inside store methods.
 */
export function patchState<T>(
  stateSignal: WritableSignal<T>,
  update: SignalStoreUpdate<T>,
): void {
  stateSignal.update((current) => {
    const partial =
      typeof update === 'function'
        ? (update as (state: T) => Partial<T>)(current)
        : update;
    return { ...current, ...partial };
  });
}

/**
 * Creates a lightweight signal-based store with optional setup logic.
 *
 * @param initialState The initial state object.
 * @param setup Optional setup function to define derived state, methods, and effects.
 */
export function createSignalStore<
  T extends object,
  Features extends object = object,
>(
  initialState: T,
  setup?: (
    state: WritableSignal<T>,
    helpers: { patchState: typeof patchState },
  ) => Features,
): SignalStore<T> & Features {
  const state = signal(initialState);
  const readonlyState = state.asReadonly();

  const $update = (updater: SignalStoreUpdate<T>) => patchState(state, updater);

  const baseStore = {
    $state: readonlyState,
    $update,
  } as unknown as SignalStore<T>;

  // Create readonly signals for each property (Classic API)
  for (const key of Object.keys(initialState)) {
    Object.defineProperty(baseStore, key, {
      get: () => computed(() => state()[key as keyof T]),
      enumerable: true,
    });
  }

  // Apply Setup Logic (New API)
  let features = {} as Features;
  if (setup) {
    features = setup(state, { patchState });
  }

  return { ...baseStore, ...features };
}
