---
title: Semantic & Attribute-Based Architecture
description: Semantic HTML first, zero div policy, and host-level styling.
---

## 1. Semantic & Attribute-Based Architecture

- **Semantic HTML First (Zero Div/Span Policy)**: Native elements (e.g., `<button>`, `<dialog>`, `<article>`, `<section>`, `<fieldset>`) are the primary building blocks. The use of `<div>` and `<span>` is strictly discouraged and should only be used as a last resort when no semantic alternative exists.
- **Host-Level Semantic Selectors**: Components MUST use attribute-based selectors paired with the appropriate native tag (e.g., `article[card-item]`, `section[app-root]`, `header[nav-rail]`). This avoids "element bloat" and ensures the component _is_ the building block in the DOM.
- **Host Bindings over Wrapper Divs**: Use the `host` property in the `@Component` decorator to apply ARIA roles, labels, and semantic attributes directly to the host element, eliminating the need for internal wrapper divs just for accessibility metadata.
- **Style the Host**: Do not use wrapper `div`s (like `.container`) inside component templates. Apply all layout, padding, and structural styling directly to the component host using `:host` in the SCSS file.
- **Zero Prefixes**: No `mat-`, `cdk-`, or custom library prefixes. Use attributes for variants. _Note: This intentionally bypasses standard Angular selector prefix linting in favor of semantic HTML._
- **Platform over Polyfill**: Use native CSS features like Anchor Positioning, Popover API, and the `inert` attribute.
- **Signal-Native Architecture**: Built from the ground up with Angular Signals (`input`, `output`, `model`) and zoneless change detection.
- **Zero Class Styling**: Avoid "class soup." Use `:host` and structural selectors (e.g., `:host > header`, `:host > section > article`) combined with CSS nesting. Use `:has()` for contextual styling.
- **Clean Component Logic (No Inline Markup/Styles)**: All components MUST use `templateUrl` and `styleUrl`. Inline `template` or `styles` properties in the `@Component` decorator are forbidden to ensure compatibility with HTML formatters (Prettier) and clear separation of concerns.
- **No Inline Styles (`style="..."`)**: Direct use of the `style` attribute in HTML templates is strictly forbidden.
