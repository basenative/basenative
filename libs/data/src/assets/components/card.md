---
title: Card
description: Semantic layout container with glass styling.
---

### Usage

The `Card` component uses a set of structural directives to compose a card layout.

```html
<article card>
  <header cardHeader>
    <h3>Card Title</h3>
  </header>
  <section cardContent>
    <p>Main content goes here.</p>
  </section>
  <footer cardFooter>
    <button bn>Action</button>
  </footer>
</article>
```

### Selectors

- **Container**: `article[card]`, `div[card]`
- **Header**: `header[cardHeader]`
- **Content**: `section[cardContent]`, `div[cardContent]`
- **Footer**: `footer[cardFooter]`
