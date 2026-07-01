# AI Workflow Rules

## Approach

Implement the AproMax corporate website incrementally following a spec-driven flow. Review context parameters before writing any logic or creating database actions. Refrain from making speculative architectural modifications.

## Scoping Rules

- Work on one feature unit at a time. Do not attempt to tackle multiple phases in a single turn.
- Separate UI modifications, backend database functions, and notification setups into distinct execution steps.
- Avoid deploying unused libraries or drafting speculative code structures.

## When to Split Work

If a feature unit involves multiple files across different boundaries:
1. Implement the database changes and verify the schema (e.g. Supabase migration scripts, RLS policies).
2. Create the backend services or Server Actions and verify typing.
3. Build the UI views, wire the state handlers, and conduct visual verification.

If a code change cannot be built and manually verified within a single turn, split the scope further.

## Handling Missing Requirements

- Do not guess or fabricate details about project behavior that are not outlined in the PRD or context files.
- If styling details or user interactions are ambiguous, check `ui-context.md` or `DESIGN.md`.
- Document any missing parameters or open questions in `context/progress-tracker.md` to flag them for user feedback.

## Protected Files

- `components/ui/*` — Do not rewrite or modify default shadcn component skeletons unless specifically instructed to add customized behaviors.
- `node_modules/` — Do not modify.

## Keeping Docs in Sync

- Update `context/progress-tracker.md` after completing a milestone or encountering a blocker.
- If a database schema update occurs, record it in the database tracking logs and update `context/architecture.md`.
- If styling colors or spacing sizes undergo a change, update `context/ui-context.md`.

## Before Completing a Step

1. Confirm the code builds without errors (`npm run build`).
2. Run the linter (`npm run lint`) to confirm there are no syntax or formatting issues.
3. Verify that the changes operate correctly without violating any invariants in `architecture.md`.
4. Update the `context/progress-tracker.md` to log what has been completed.
