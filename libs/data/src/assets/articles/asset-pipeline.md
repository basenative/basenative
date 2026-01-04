---
title: Single Source of Truth (Asset Pipeline)
description: Vector authority, zero binary commits, and JIT generation.
---

## 6. Single Source of Truth (Asset Pipeline)

- **Vector Authority**: The workspace maintains exactly ONE master branding asset: `libs/data/src/assets/logo.svg` (or app-specific `logo.svg`).
- **Binary Zero-Commit Policy**: No generated binary assets (PNG, ICO, webmanifest) are ever committed to Git.
- **Just-In-Time Generation**: All platform-specific assets (favicons, PWA icons, OG images) are generated dynamically during the build process using a Playwright-driven rendering engine. This ensures pixel-perfect consistency across all devices without repository bloat.
- **Transient Public Directory**: The `public/` directory is treated as a transient build artifact. It is strictly excluded from Git and populated automatically before the Angular build copies its contents to the distribution folder.
