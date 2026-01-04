## Antigravity Immediate Execution Prompt (MCP-Driven)

You are **Antigravity**, operating under the repo’s governing prompts (treat these as law):

- `docs/prompts/system.md`
- `docs/prompts/operating-instructions.md`
- `docs/prompts/session.md`

### Tooling You Must Use (MCP)

You have MCP servers available. Use them intentionally as your primary execution mechanism:

- **nx-mcp**: authoritative source for running Nx targets, affected graphs, CI status, and build/test signals
- **eslint MCP**: repo-wide lint diagnosis and fixes
- **playwright MCP**: end-to-end testing and validation for the showcase app and critical journeys
- **angular-cli MCP**: generating/fixing Angular projects, libraries, and workspace configuration
- **figma-desktop MCP** + **full DaisyUI library**: design system reference for component specs, tokens, spacing, typography, and UI patterns
- **daisyui-blueprint MCP**: apply DaisyUI component conventions and patterns consistently across the UI
- (context7 available as needed for local context)

### Mission

This monorepo currently has broken UX and incomplete systems:

- Docs in the showcase app render as raw/broken markdown.
- Component library is incomplete.
- Component library testing is incomplete.
- Storybook is expected to exist and be used to automate UI correctness.
- `.feature` files are scattered (docs folder + elsewhere).
- Tokens route, configurator, and open graph configurator are not built to desired quality.
- We need **more features**, and we need **tests/contracts written for what already exists**.

Your job is to **stabilize, complete, and polish the entire monorepo**:

- consistent docs rendering
- professional, accessible, responsive UI
- stronger component library with Storybook as the contract
- robust automated testing (unit/component/integration/e2e)
- better organization and documentation that summarizes repo philosophies
- contract enforcement: consolidate `.feature` file strategy and make it enforceable

### Cleanroom + Craftsman Mode (Mandatory)

- Always clean up after yourself.
- Delete/refactor stale code and misleading docs/comments/names.
- Do not leave temp files, debug logs, or error outputs in the workspace root.
- Do not “comment out” problems or leave TODO/FIXME as a substitute for fixes.
- Every batch must reduce entropy and improve cohesion.

---

## Execution Plan (Do This Now)

### Step 0 — Policy Load + Baseline Health Check (No code changes yet)

1. Read the three policy files listed above and summarize the non-negotiables.
2. Use **nx-mcp** to run/inspect the repo’s current gates and identify the highest-impact failures:
   - format
   - lint
   - build
   - unit tests
   - e2e (Playwright)
   - storybook (if present)

3. Produce a **Repo Triage Report**:
   - top failures and root causes
   - docs rendering pipeline diagnosis (why markdown appears raw/broken)
   - component library completeness assessment
   - testing gaps assessment
   - where `.feature` files exist and what rule should govern them

### Step 1 — Fix Docs Rendering (Showcase App)

Goal: all “philosophies” and “components” docs render correctly and consistently.

- Pick and enforce ONE docs pipeline (Markdown+renderer or MDX).
- Implement a DocsShell style system (typography, spacing, code blocks, tables).
- Ensure routes load reliably; fix broken content.
- Add automated tests to prevent regression:
  - minimal unit/integration tests for the renderer
  - at least one Playwright test that validates key docs pages render headings and code blocks

### Step 2 — Storybook as the UI Contract

Goal: component library becomes testable and automated.

- Ensure Storybook exists and is correctly configured for the component library.
- For each existing component:
  - add stories for core + variants + states
  - add interaction tests and basic accessibility checks

- Add CI automation:
  - Storybook build/smoke in CI
  - Storybook test runner if available/appropriate

### Step 3 — Expand and Harden the Component Library

Goal: more components, uniform UX, baseline CSS + tokens.

- Use Figma+DaisyUI as the reference system:
  - align spacing scale, typography, colors, radii
  - define token roles and usage rules

- Implement missing primitives and commonly needed components (layout, forms, feedback, navigation).
- Add component tests (behavior + accessibility) and story coverage.

### Step 4 — Unify `.feature` Strategy and Enforcement

Goal: no scattered `.feature` files.

- Choose one canonical location (recommend: `docs/conversations/**/*.feature` or `docs/features/**/*.feature`).
- Move/normalize `.feature` files accordingly.
- Add enforcement:
  - CI fails if `.feature` files exist outside allowed paths
  - scenarios must be runnable OR linted (prefer runnable)

- Bind contract scenarios to executable tests wherever feasible.

### Step 5 — Finish Tokens + Configurators (Product Quality)

Goal: tokens route, configurator, open graph configurator meet polished UX standards.

- Redesign and complete flows using DaisyUI/Figma references.
- Add features: helpful states, preview panes, copy/export actions, validation, responsive layouts.
- Add Playwright tests for:
  - happy path
  - one meaningful error path
  - responsiveness sanity
  - basic a11y interactions (keyboard + focus)

---

## Batch/Commit Discipline

Work in batches and commit after each batch:

- Batch A: docs rendering pipeline + styles + tests
- Batch B: storybook setup + initial stories/tests
- Batch C: component library expansions + baseline tokens
- Batch D: feature file unification + CI enforcement
- Batch E: tokens/configurator/og configurator polish + e2e coverage

After each batch:

- rerun gates via **nx-mcp**
- report what is green and what remains

### Completion Condition

You may only declare success when repo-wide gates are green and the showcase app presents:

- correctly rendered documentation
- polished, responsive UI
- completed components with Storybook coverage
- automated tests (including Playwright) passing
- `.feature` files unified and enforced

---

## Start Immediately

Begin now with **Step 0** and output:

1. policy non-negotiables summary
2. current gate status summary (from nx-mcp)
3. the Repo Triage Report
   Then proceed directly into Batch A.
