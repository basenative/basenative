---
title: List
description: Semantic list with glass styling and semantic items.
---

### Usage

The `List` component styles standard `ul` or `ol` elements and their items.

```html
<ul list>
  <li item>
    <span>Item 1</span>
  </li>
  <li item>
    <span>Item 2</span>
  </li>
</ul>
```

### Interactive Items

List items can also be interactive elements like buttons or links.

```html
<div list>
  <button item>Interactive Button Item</button>
  <a item href="#">Link Item</a>
</div>
```

### Selectors

- **List**: `ul[list]`, `ol[list]`
- **Item**: `li[item]`, `a[item]`, `button[item]`
