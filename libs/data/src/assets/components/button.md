---
title: Button
description: The primary interactive element for the Glass system.
---

### Usage

The `ButtonComponent` is a semantic directive that enriches standard HTML button elements.

```html
<button bn>Click Me</button>
```

### Variants

Buttons come in several flavors to denote hierarchy:

- **Primary**: Default style.
- **Secondary**: Muted look.
- **Glass**: High translucency.
- **Danger**: Destructive actions.

```html
<button bn variant="secondary">Secondary</button>
<button bn variant="glass">Glass</button>
<button bn variant="danger">Delete</button>
```

### Sizes

Available in `sm`, `md` (default), and `lg`.

```html
<button bn size="sm">Small</button> <button bn size="lg">Large</button>
```
