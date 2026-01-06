# Signal Store Enhancement

**Date**: 2026-01-05
**Objective**: Enhance `SignalStore` to support modern Angular primitives (`linkedSignal`, `resource`, `effect`) and implement a "Setup Store" pattern.

## Transcript Summary

The user requested an enhancement to the existing `signal-store` to make it a viable, lightweight alternative to NgRx. Key requirements included:

- **Setup Pattern**: Co-locating state, selectors, and methods.
- **Resource Integration**: Seamless support for async data fetching.
- **Linked Signals**: Support for dependent writable state.
- **Effects**: Integration of side effects within the store setup.
- **Demo**: A showcase component to demonstrate these features.

## Acceptance Criteria

- [x] `createSignalStore` supports a `setup` function.
- [x] `patchState` utility is available for immutable updates.
- [x] Store supports `computed`, `linkedSignal`, `resource`, and `effect`.
- [x] Showcase includes a functional demo of the enhanced store.
- [x] Demo uses `resource` for async search simulation.
- [x] Demo uses `linkedSignal` for input binding.

## Implementation Steps

- [x] Enhance `signal-store.ts` in `libs/core`.
- [x] Update `signal-store.spec.ts` with comprehensive tests.
- [x] Create `SignalStoreDemoComponent` in `apps/showcase`.
- [x] Add `/signals` route to `showcase`.
- [ ] **Fix Lint Errors**: Resolve accessiblity and hygiene issues.
- [ ] **Visualize State**: Implement `SignalStateVisualizer` (Remediation Feature).
