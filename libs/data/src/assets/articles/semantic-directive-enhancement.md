---
title: Semantic Directive Enhancement
description: Core philosophy and architectural principles for the modern Angular CDK.
order: 1
---

### The Semantic Directives Approach

The BaseNative framework completely reimagines how Angular applications interface with the DOM. Instead of encapsulating native functionality within opaque custom components (e.g., `<bn-button>`), we strictly enforce a **Directive-First Architecture**.

#### 1. Semantic HTML First

We respect the browser's built-in accessibility and keyboard navigation features by extending native elements.

- **Bad**: `<bn-button label="Submit"></bn-button>` - Hides the button implementation, harder to style, accessibility requires transparent forwarding.
- **Good**: `<button variant="primary" type="submit">Submit</button>` - Fully accessible, standard Events, easy to style.

#### 2. Platform Over Polyfill

We prioritize platform-native APIs over heavy JavaScript libraries.

- **Floating UI**: We use the native CSS **Anchor Positioning API** (with polyfills only where strictly required) instead of shipping 50kb of positioning JS.
- **Dialogs & Popovers**: We leverage `<dialog>` and the **Popover API** for top-layer interactions.
- **Inert**: We use the `inert` attribute for focus trapping instead of custom focus-manager services.

#### 3. Signal-Native State

All directives are built from the ground up using **Angular Signals**.

- **Zoneless**: Designed to work without `zone.js`, relying on `signal` updates to trigger fine-grained DOM changes.
- **Performance**: Change detection is local to the directive, not the entire component tree.

#### 4. Structural Styling

We reject utility-class soup (e.g., `class="btn btn-primary p-4 rounded-lg"`). Instead, we use **Structural CSS**.

- Styles are applied via attribute selectors: `button[variant] { ... }`.
- Variants are controlled via host binding: `[variant="ghost"]`.
- This keeps templates clean and semantic.
