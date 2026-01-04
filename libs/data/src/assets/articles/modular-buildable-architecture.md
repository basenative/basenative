---
title: Modular & Buildable Architecture
description: Isolation, defined tokens, and progressive enhancement.
---

## 2. Modular & Buildable Architecture

- **Library Isolation**: Organized into discrete, buildable libraries (core, tokens, primitives, forms, layout) within an Nx monorepo.
- **DTCG-First Tokens**: Design tokens are defined in a JSON file (`tokens.json`) following the Design Tokens Community Group (DTCG) standard. This JSON is the single source of truth for both code and design tools (Figma Sync).
- **Modern Defaults**: Standardizes on standalone APIs, esbuild, and zoneless Angular.
- **Progressive Enhancement**: Use feature detection to provide modern CSS-first paths with necessary fallbacks.
- **Tooling-First**: Strict TypeScript, linting, and Nx generators.
