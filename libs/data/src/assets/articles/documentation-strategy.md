---
title: Documentation & Content Strategy
description: Distillation workflow and systems engineering mindset.
---

## 5. Documentation & Content Strategy

### YAML Distillation Workflow

To maintain a "distilled" documentation experience, BaseNative uses a specific workflow for philosophical and conceptual content:

1.  **Drafting**: Technical deep-dives are initially captured in long-form Markdown (`.md`).
2.  **Distillation**: Relevant principles are extracted into concise, single-sentence statements.
3.  **YAML Conversion**: These statements are moved into `.yml` files with structured front matter for use in the dynamic documentation site.
4.  **Technical Completeness**: Contrary to "minimal distillation," documentation must maintain **technical completeness**. The YAML source should explain the "Why" and "How" in depth to provide a "Pro Tier" developer experience.
5.  **Runtime Ingestion**: Articles are served as static assets and fetched at runtime via `HttpClient`, allowing for a decoupled, manifest-driven documentation delivery system without complex build-time code generation.

### Systems Engineering Mindset

BaseNative isn't just a component library; it's a design system intended to scale across a monorepo.

- **Global over Local**: Solve problems at the library level (`libs/`) so they are automatically inherited by any application (`apps/`).
- **Apps as Skins**: The `apps/` directory should only contain minimal configuration and routing logic. All features and business logic must be abstracted into buildable libraries to ensure maximum reusability and testability.
- **Reusable Primitives**: Build small, focused primitives that can be composed into complex features.
- **Strict Source Separation**: Consistent directory structures and file separation (TS/HTML/CSS) are non-negotiable for system-wide predictability.
