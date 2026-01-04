Add Terraform IaC for Cloudflare so the BaseNative showcase deployment can run Greenput remotely with real services, not fake methods.

Context

- The showcase frontend deploys on Cloudflare Pages.
- Greenput libs exist but are not integrated into an app route yet.
- There are placeholder or fake methods where real storage, verification, and audit should exist.
- We need real remote infrastructure and clean environment configuration.

Non-negotiable process

- Do not interrupt the current Batch 4 config fix. Finish it and get gates green first.
- After gates are green, proceed with Batch 5 (showcase integration) and Batch 6 (IaC).
- Keep the repo clean. No TODOs, no commented-out code, no root clutter.
- Produce proof: commands run, outputs, and verification gates.

Batch 5: Showcase integration

- Add a real route/page in the showcase app, example /greenput/consent
- Render the full consent flow components
- Replace fake methods with real calls to an API surface (worker endpoints)
- Add a minimal smoke test that the route renders

Batch 6: Terraform IaC for Cloudflare
Create an infra folder and Terraform modules that provision and configure:

1. Cloudflare Pages project for the showcase app
   - Build settings, framework preset if applicable
   - Environment variables for API base URLs and any public IDs
   - Preview and production environment support

2. Cloudflare Worker for Greenput API
   - Endpoints to support:
     - create consent receipt
     - get consent receipt by id or hash
     - revoke consent
     - list history
     - verify consent state for a subject
   - Enforce that no tracking or writes occur without explicit consent state
   - CORS configuration for the Pages domain

3. Data storage
   Choose the best fit from Cloudflare primitives and implement it:

- D1 for relational storage of receipts and revocations
- KV only for non-sensitive caching if needed
- R2 only if you need blob storage later
  Default: Use D1 for receipts, revocations, processors, purposes, retention policies.

4. Optional but recommended

- Cloudflare Turnstile for abuse prevention on public endpoints
- Cloudflare Queues if you add async event hooks later
- DNS records if needed for custom domains

Terraform requirements

- Use official Cloudflare Terraform provider
- Use workspaces or environment-specific vars for dev, preview, prod
- Do not hardcode secrets. Use variables and document how to set them.
- Provide outputs: pages URL, worker URL, D1 database name/id, turnstile site key if used
- Add a concise README in infra explaining:
  - prerequisites
  - how to authenticate to Cloudflare
  - how to plan/apply
  - how to destroy safely
  - how the frontend connects to the worker

Repo wiring

- Add npm scripts or nx targets to run terraform fmt, validate, plan, apply from the repo root
- Add CI-friendly commands but do not set up CI unless already present

Proof and validation

- After provisioning, update the showcase app env vars and verify:
  - the consent route works in preview and prod
  - creating a receipt returns a deterministic id and hash
  - revocation works and is visible in history
  - tests and gates are green

Deliverables

- infra/terraform code with modules and environments
- worker code (if it belongs
