# Architecture Context

## Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) + TypeScript | Application server, routing, Server Actions, ISR page caching |
| Database | Supabase (Postgres) | Structured storage for pages, posts, applications, and settings |
| Auth | Supabase Auth | Administrative role verification, token generation |
| Storage | Supabase Storage | File stores (resumes, blog covers, project screenshots) |
| Styling | Tailwind CSS v4 + shadcn/ui | Design tokens and component style frameworks |
| State | Zustand | Ephemeral browser state (filters, dialog states, menus) |
| Verification | React Hook Form + Zod | Form data checks and TypeScript schema bindings |
| Mailer | Resend | Dispatch lead and resume notification updates |

## System Boundaries

- `src/app/` — Pages and layout structures. Marketing directories are grouped under route directories; administrative tools live inside `/admin/`.
- `src/components/` — Reusable react UI nodes. Contains `ui/` for basic controls (shadcn templates), `marketing/` for corporate sections, and `admin/` for CMS editors.
- `src/lib/` — Functional helper modules. Contains Supabase client initializers, Resend notification templates, and validation structures.
- `src/stores/` — Zustand store hook scripts mapping global UI filters and state fields.
- `src/styles/` — Global styling variables.

## Storage Model

- **Postgres Database:** Captures metadata fields, categories, slugs, user profile roles, settings parameters, contact logs, and job definitions.
- **Supabase Storage:**
  - `public-media`: Public bucket storing images, logos, and testimonials avatars.
  - `resumes`: Private bucket storing candidate resumes. Access must only be granted through short-lived signed URLs.

## Auth and Access Model

- **Administrative Gate:** Admins sign in at `/admin/login` using email credentials. Signing up directly through a public registration endpoint is disabled.
- **Role Assignment:** User roles (`owner`, `admin`, `editor`) are documented in the `profiles` table.
  - `owner`: full capabilities including setting adjustments and user invite capabilities.
  - `admin`: data CRUD controls, form tracking, settings updates.
  - `editor`: content CRUD controls (blogs, case studies), no access to administrative configurations.
- **Access Verification:** Server actions and API routes must execute token validation routines before conducting write operations. RLS policies in Supabase enforce rules at the database engine level.

## Invariants

1. **Private Keys Isolation:** The Supabase `SERVICE_ROLE_KEY` must never be sent to the browser client or written to client-side files.
2. **Database Access RLS:** Every database table must enable Row Level Security (RLS). Public select permissions are restricted to published or visible rows (`status = 'published'` or `visible = true`).
3. **No Anonymous Submissions Select:** Public insert policies for leads and applications are restricted; select actions on these tables are restricted to staff roles only.
4. **On-Demand Cache Revalidation:** Content changes conducted in the admin panel must trigger `revalidatePath` or `revalidateTag` to refresh ISR page instances instantly.
5. **No Long-Running Actions:** API endpoints and server actions must not block on heavy background processes. Large processes should be scheduled asynchronously.
