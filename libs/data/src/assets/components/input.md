---
title: Input
description: Accessible input field wrapper with validation styles.
---

### Usage

The `Input` component is a wrapper that handles labels and error messages for standard HTML input elements.

```html
<label input-wrapper label="Email Address" error="Invalid email">
  <input type="email" placeholder="user@example.com" />
</label>
```

### Inputs

| Name    | Type     | Description                                 |
| :------ | :------- | :------------------------------------------ |
| `label` | `string` | **Required**. The label text for the input. |
| `error` | `string` | Optional error message to display.          |

### Selectors

- **Wrapper**: `label[input-wrapper]`
