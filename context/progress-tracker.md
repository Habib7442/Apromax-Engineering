# Progress Tracker

## Current Phase

- **Phase 0 — Foundations** (In Progress)

## Current Goal

- Establish the core project configuration, style files, database interfaces, and SEO setup.

## Completed

- Created the core `context/` documentation files:
  - `project-overview.md`
  - `architecture.md`
  - `ui-context.md` (Locked styling details based on `DESIGN.md`)
  - `code-standards.md`
  - `ai-workflow-rules.md`
  - `progress-tracker.md`
- **Styling Config:** Configured color tokens and font variables (Sora and Inter) in `app/globals.css` and `app/layout.tsx`.
- **Social Icons Integration:** Incorporated `/public/social-icons` images in the brand footer layout.
- **Decomposed Landing Layout:** Separated page views into modular segments under `components/marketing/` (Header, Hero, TrustBar, ServicesGrid, Stats, WhyChooseUs, FeaturedCases, Process, Testimonials, CTABand, Footer).
- **Assembled Homepage:** Structured `app/page.tsx` with modular nodes. Passed linter verification successfully with 0 errors/warnings.
- **Positioning Reframing:** Realigned sitemaps, SEO configurations (`seo.ts`), PRD, and landing components to reflect the **Managed Engineering Services** orchestrator business model.

## In Progress

- Completing Phase 0 foundation setup.

## Next Up

1. **Styling Config:** Update custom variables in `app/globals.css` with colors, typography, and corner radius tokens.
2. **Database Clients:** Implement Supabase client (`lib/supabase/client.ts`), server (`lib/supabase/server.ts`), and middleware configurations.
3. **SEO Helper:** Create `lib/seo.ts` with metadata, schemas, and keyword targets.
4. **Layout Components:** Build Header, Footer, and CTABand templates.

## Open Questions

- **Company Contact Data:** Confirm the exact registered office address, phone number, and support email for page displays and schema structures.
- **SMTP Provider:** Confirm Resend as the transaction email dispatcher.
- **Analytics Choice:** Determine if Google Analytics 4 is preferred over a privacy-first choice (e.g. Plausible).
- **ISO 9001 Badge:** Clarify whether the ISO 9001 certification badge is placeholder or if the company has active credentials.

## Architecture Decisions

- **Supabase SSR:** Adopted cookie-based validation utilizing `@supabase/ssr` to maintain secure user state across Next.js Server Components.
