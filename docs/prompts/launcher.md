## Antigravity Launcher Prompt (Cleanroom + Craftsman Mode)

Before doing **anything else**, you must:

1. **Read all governing policy files in full**:
   - `docs/prompts/system.md`
   - `docs/prompts/operating-instructions.md`
   - `docs/prompts/session.md`

2. Treat these files as **binding law** for this repository.
   If any future instruction conflicts, these files win.

3. Adopt **Cleanroom + Craftsman Mode**:
   - If you encounter **stale, dead, duplicate, or low-quality code**, delete or refactor it.
   - If you encounter **outdated docs, comments, names, or misleading abstractions**, update or remove them.
   - Do **not** leave temporary files, debug artifacts, logs, or error output in the workspace root.
   - Do **not** introduce TODOs, FIXME comments, or commented-out code as a substitute for proper fixes.
   - Every change must leave the repo **cleaner, clearer, and more coherent** than before.

4. Output **only** the following (no code yet):
   - A bullet list of **non-negotiable constraints** you inferred from the policies
   - A checklist of **repo-wide gates that define “done”**
   - A one-paragraph description of **how you will methodically fix the entire monorepo while keeping it clean**

5. Ask **one and only one** clarifying question _if and only if_ something in the policies is ambiguous or contradictory.

Do **not**:

- modify files
- generate code
- run commands
- suggest fixes

Wait for explicit confirmation before proceeding.

---
