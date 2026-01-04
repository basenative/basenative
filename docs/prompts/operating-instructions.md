# Antigravity Operating Instructions (CTFD + Nx Monorepo)

## Purpose

Antigravity is responsible for **bringing the entire monorepo to a professional, production-ready state** using **Conversational Test-First Development (CTFD)**.
Conversation is the source of truth. Executable tests are the definition of done.

This repository is treated as a **single system**, not a collection of files. Partial fixes are failures.

---

## Core Rules (Non-Negotiable)

1. **Conversation → Contract → Code → Proof**
   - Every meaningful change must be represented by:
     - a human-readable plan (conversation + progress)
     - an executable contract (tests / scenarios)

   - Acceptance criteria map **1:1** to executable scenarios.

2. **Repo-Wide Completion Condition**
   - Work is _not complete_ until the **entire monorepo is green**:
     - format check
     - lint
     - build
     - production build
     - unit tests
     - end-to-end tests
     - contract tests (Gherkin if present)

3. **No Single-File Fixes**
   - Fix root causes, not symptoms.
   - Prefer shared configs, generators, codemods, and patterns.
   - Assume similar issues exist elsewhere unless proven otherwise.

4. **Incremental, Auditable Progress**
   - Work in logical batches.
   - Commit after each batch.
   - Progress must be resumable without external context.

5. **If It Can’t Be Tested, It Isn’t Specified**
   - Surface ambiguity immediately.
   - Convert assumptions into explicit scenarios or defer intentionally.

---

## Required Artifacts

### 1. CTFD Planning Artifacts

For each major slice of work:

- `docs/conversations/conv-YYYYMMDD-HHMMSS.md`
  - conversation transcript
  - acceptance criteria
  - implementation steps (checkboxes)

- Matching executable contract (e.g. `.feature`, test file, or equivalent)

### 2. Architecture

- High-level architecture diagram
- Written explanation of:
  - data ingestion pipeline
  - analytical/query layer
  - application read path
  - state management
  - observability and quality gates
  - real-world efficacy (clear, non-hype language)

### 3. Validation Evidence

Publish results showing:

- application functionality
- data correctness
- pipeline run status
- data quality checks

---

## Data + Application Scope (Cloud-Agnostic)

- Ingest product data from:
  `https://fakestoreapi.com/products`
- Use a **managed/serverless ingestion pattern** (cloud-agnostic).
- Store data in a **queryable analytical store**.
- Build a **modern web application** that:
  - displays products in a card layout
  - includes search and sorting
  - is responsive and accessible
  - uses semantic HTML + modern Angular
  - manages state via Angular Signals

- Use **Nano Banana** to generate logo and/or product image concepts
  (or deterministic placeholders if image generation is external).

---

## Nx Monorepo Discipline

- Prefer `nx affected` workflows and caching.
- Maintain uniform formatting, linting, and build rules.
- Extract shared UI, data access, and state patterns into libraries.
- Treat Nx as the enforcement engine for correctness and performance.

---

## Definition of Done

A task is complete **only when**:

- The contract passes
- All verification gates pass
- Results and evidence are published
- Architecture and intent remain aligned

---
