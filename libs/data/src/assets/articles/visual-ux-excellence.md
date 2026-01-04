---
title: Visual & UX Excellence
description: Apple-level polish, motion-first, and JS-native control.
---

## 3. Visual & UX Excellence

- **Apple-Level Polish**: High-quality typography (Inter/system stacks), balanced whitespace, and subtle shadows.
- **Motion-First**: Every interaction should feel fluid using standardized easing (e.g., `cubic-bezier(0.21, 1.02, 0.48, 1)`).
- **Responsive & Accessible**: Use of `clamp()` for typography and semantic HTML for built-in accessibility.
- **Theming**: First-class support for dark mode using **JS-Native control**. Toggling is driven by a `ThemeService` that manages the `.dark` class on the root element, bypassing conflicting CSS media queries to ensure manual overrides always "win" over system preferences.
