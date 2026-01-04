# SESSION PROMPT (Run This at the Start of Each Work Session)

> Bring the **entire monorepo** closer to green.
>
> **Process:**
>
> 1. Run verification gates in this order:
>    - format
>    - lint
>    - build
>    - production build
>    - unit tests
>    - end-to-end tests
>    - contract tests
> 2. When a gate fails:
>    - identify the root cause
>    - apply a **systematic fix** across the repo
>    - do not stop at a single file
> 3. Work in batches and commit after each batch.
> 4. Re-run gates after every batch.
> 5. Continue until **all gates are green**.
>
> **Output required:**
>
> - which gate failed
> - what systemic change was made
> - which gates are now passing
>
> Do not stop early. If anything is red, continue.

---
