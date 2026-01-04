---
title: Testing & Lifecycle (CTFD)
description: Conversational Test-First Development and strict verification.
---

## 4. Testing & Lifecycle (CTFD)

- **Conversational Test-First Development (CTFD)**: The conversation is the primary design artifact. Intent is compiled into a shared contract: a human-readable ticket (task + plan) and executable specs (Gherkin scenarios).
- **Test-First Architecture**: Development starts with Gherkin feature files (`.feature`) and Playwright test specs (or component unit tests mapping to scenarios). Implementation is complete only when all scenarios pass.
- **Gherkin Continuity**: Use Cucumber/Gherkin to define both user-facing requirements and automated test logic. This ensures documentation and code are locked in the same "semantic cycle."
- **Mock-First Integration**: External dependencies (API calls, browser APIs like `matchMedia`) must be mocked at the library level (`test-setup.ts`) to ensure the build pipeline remains decoupled and performant.
- **Verification before Push**: No code is pushed to the repository without a full workspace `build` and `test` run (`run-many`). Stale caches are cleared explicitly (`nx reset`) to prevent "Phantom Success."
