# Code Standards

## General Principles

- **Single Responsibility:** Keep components, hooks, and helpers focused on a single task. Avoid compounding unrelated features.
- **Fail Fast:** Validate data parameters at structural boundaries immediately (e.g. user input, API parameters, database returns).
- **Maintain Comments:** Preserve original comments and documentation unless they are specifically deprecated by architectural revisions.

## TypeScript

- **Strict Typing:** Set compiler constraints to strict. Avoid code statements using `any` or placeholder types.
- **Explicit Interfaces:** Define typed models for API return states, data structures, and component props.
- **Shared Schemas:** Reuse Zod data-validation structures across both client forms and server actions.

## Next.js (App Router)

- **Default to Server Components:** Use React Server Components (RSC) to handle page layouts and initial data fetches.
- **Client Components Gating:** Use `'use client'` only when utilizing DOM event listeners, state hooks, or browser-specific objects (like Zustand).
- **Server Actions:** Perform mutations through Server Actions. Encapsulate actions in try-catch statements and return typed results `{ success: boolean; data?: any; error?: string }`.

## Styling & Theme

- **Tailwind CSS v4 Standard:** Do not use hardcoded hex values or inline styles for themed colors. Utilize the custom CSS variables configured in `app/globals.css`.
- **Responsive Classes:** Build layouts with mobile-first styling principles (`sm:`, `md:`, `lg:`).
- **Border Radius:** Adhere to the locked border radius scale (e.g., standard inputs/buttons use `rounded-md` matching `0.75rem`).

## API Routes & Mutation Security

- **Inputs Verification:** Validate inputs with Zod schemas before running database or auth operations.
- **Auth Guarding:** Every administrative server action must verify that the requesting user possesses a valid session and correct profile role.
- **Error Formatting:** Return predictable response payloads:
  ```json
  {
    "success": false,
    "error": "Detailed reason for validation failure"
  }
  ```

## File Organization

- `app/` — Next.js page files, layouts, and routing endpoints.
- `components/` — Client-side buttons, form panels, and layouts.
- `components/ui/` — Standard shadcn component files.
- `lib/` — Supabase clients, Zod schemas, email managers, and utilities.
- `stores/` — Zustand store hook scripts.
