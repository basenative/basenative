import { createSignalStore } from './signal-store';

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

  it('should update state with partial object', () => {
    const store = createSignalStore<TestState>({
      count: 0,
      name: 'initial',
      items: [],
    });

    store.$update({ count: 10 });
    expect(store.count()).toBe(10);
    expect(store.name()).toBe('initial'); // unchanged
  });

  it('should update state with updater function', () => {
    const store = createSignalStore({ count: 5 });

    store.$update((state) => ({ count: state.count + 1 }));
    expect(store.count()).toBe(6);
  });

  it('should merge updates, not replace', () => {
    const store = createSignalStore<TestState>({
      count: 1,
      name: 'hello',
      items: ['a'],
    });

    store.$update({ name: 'world' });
    expect(store.count()).toBe(1);
    expect(store.name()).toBe('world');
    expect(store.items()).toEqual(['a']);
  });

  it('should handle array updates', () => {
    const store = createSignalStore({ items: ['a', 'b'] });

    store.$update({ items: ['a', 'b', 'c'] });
    expect(store.items()).toEqual(['a', 'b', 'c']);
  });
});
