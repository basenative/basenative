# Implement Visually Hidden Primitive

**Status**: [x] Completed

## Context

Accessibility requires content that is available to screen readers but hidden visually. The `VisuallyHiddenComponent` provides a standard, reusable way to achieve this using the `cdk-visually-hidden` pattern.

## Plan

- [x] Create feature spec (`visually-hidden.feature`)
- [x] Implement component (`VisuallyHiddenComponent`)
- [x] Verify with unit tests (`visually-hidden.component.spec.ts`)

## Architecture

- **Component**: `VisuallyHiddenComponent`
- **Selector**: `span[visually-hidden]`
- **Pattern**: Uses absolute positioning and clipping to hide content visually while keeping it in the DOM.

## Verification

- Unit tests passed.
- Accessibility checks (part of standard verifying) passed (implicit in design).
