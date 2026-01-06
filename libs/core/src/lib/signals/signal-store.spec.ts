import { computed, effect, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createSignalStore, patchState } from './signal-store';

interface TestState {
  count: number;
  name: string;
  items: string[];
}

describe('createSignalStore', () => {
  it('should create a store with initial state', () => {
    const store = createSignalStore<TestState>({
      count: 0,
      name: 'test',
      items: [],
    });

    expect(store.count()).toBe(0);
    expect(store.name()).toBe('test');
    expect(store.items()).toEqual([]);
  });

  it('should expose $state as readonly signal', () => {
    const store = createSignalStore({ count: 5 });
    expect(store.$state().count).toBe(5);
  });

  it('should update state with partial object using $update', () => {
    const store = createSignalStore<TestState>({
      count: 0,
      name: 'initial',
      items: [],
    });

    store.$update({ count: 10 });
    expect(store.count()).toBe(10);
    expect(store.name()).toBe('initial'); // unchanged
  });

  it('should update state with updater function using $update', () => {
    const store = createSignalStore({ count: 5 });

    store.$update((state) => ({ count: state.count + 1 }));
    expect(store.count()).toBe(6);
  });

  describe('Setup API', () => {
    it('should allow derived state (selectors)', () => {
      const store = createSignalStore({ count: 2 }, (state) => ({
        double: computed(() => state().count * 2),
      }));

      expect(store.double()).toBe(4);
      store.$update({ count: 3 });
      expect(store.double()).toBe(6);
    });

    it('should allow methods (actions) via patchState', () => {
      const store = createSignalStore(
        { count: 0 },
        (state, { patchState }) => ({
          increment: () => patchState(state, (s) => ({ count: s.count + 1 })),
          setCount: (count: number) => patchState(state, { count }),
        }),
      );

      store.increment();
      expect(store.count()).toBe(1);

      store.setCount(10);
      expect(store.count()).toBe(10);
    });

    it('should support side effects using effect()', () => {
      let effectCount = 0;
      TestBed.runInInjectionContext(() => {
        const store = createSignalStore({ count: 0 }, (state) => {
          effect(() => {
            // Read signal to track dependency
            if (state().count >= 0) {
              effectCount++;
            }
          });
          return {};
        });

        // Effect runs initially
        TestBed.flushEffects();
        expect(effectCount).toBe(1);

        // Update state
        store.$update({ count: 1 });
        TestBed.flushEffects();
        expect(effectCount).toBe(2);
      });
    });
  });

  describe('patchState Utility', () => {
    it('should work as standalone utility', () => {
      const state = signal({ val: 1 });
      patchState(state, { val: 2 });
      expect(state().val).toBe(2);

      patchState(state, (s) => ({ val: s.val + 1 }));
      expect(state().val).toBe(3);
    });
  });
});
