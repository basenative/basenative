---
title: Button
description: The primary interactive element for the Glass system.
---

### Usage

The `ButtonComponent` is a standalone component that can be used as an element or an attribute on `button` and `a` tags.

```html
<button variant="primary">Click Me</button>
<a href="#" variant="ghost">Link Button</a>
```

### Variants

Buttons come in several flavors to denote hierarchy:

- **Primary**: Default style.
- **Secondary**: Muted look.
- **Ghost**: Minimalist look (formerly Glass).
- **Danger**: Destructive actions.

```html
<button variant="secondary">Secondary</button>
<button variant="ghost">Ghost</button>
<button variant="danger">Delete</button>
```

### Sizes

Available in `sm`, `md` (default), `lg`, and `icon`.

```html
<button size="sm">Small</button>
<button size="lg">Large</button>
<button size="icon"><span icon name="close"></span></button>
```
