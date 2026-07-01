# Progress Tracker

- **Phase 0 — Foundations** (Completed)
- **Phase 1 — Careers, About, Industries, & Services** (Completed)

## Current Goal

- Launch, verify, and maintain SEO indexing, subpage architectures, and responsive layout polish.

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
- **Database Client & Persistence Setup:** Built client and server clients with `@supabase/ssr`. Created `leads` schema in Supabase with RLS insert policies and Server Actions (`createLeadAction`) to persist contact form details before page transition.
- **Cal.com React Embed Integration:** Installed `@calcom/embed-react` and implemented dynamic calendar loading on `/book` with client prefill query routing.
- **Real-Time Booking Status Synchronization:** Set up `"bookingSuccessful"` iframe listeners and custom Server Actions (`updateLeadStatusAction`) paired with a secure RLS update constraint (`status = 'pending_booking' WITH CHECK status = 'booked'`) to transition lead records to `booked` instantly upon scheduling.
- **Next.js Production Compilation:** Ran verified production builds compiling successfully with 0 compilation errors or warning outputs.
- **Careers Portal & Supabase Sync:** Created Careers route (`app/careers/page.tsx`) in light theme with PDF uploader, connected application forms to `careers` database schema in Supabase with RLS policies, and added Server Actions (`createCareerAction`).
- **About Page Integration:** Created About route (`app/about/page.tsx`) in light theme featuring teamwork / strategy custom illustrations (`mission_teamwork.webp`, `vision_strategy.webp`), a responsive values section, and primary blue branded heading styles.
- **Industries Verticals:** Created Industries route (`app/industries/page.tsx`) in light theme highlighting Aerospace, Automotive, Utilities, Machinery, High-Tech, and Medical Devices with key focus area pills.
- **Services Pillar & Dynamic Routes:** Built the Services page (`app/services/page.tsx`) and the dynamic detail page template (`app/services/[slug]/page.tsx`) as Next.js Server Components. Integrated balanced 2-column grids for all service capabilities with zero vertical whitespace.
- **Google Search Console Setup:** Created dynamic sitemap (`sitemap.ts`) and crawling crawler constraints (`robots.ts`) serving custom Search Console feeds.
- **Button Cursor & LCP Preloading:** Added `cursor-pointer` to global button variants (`button.tsx`) and added `priority` preloading to the primary homepage LCP card image (`case_thermal.webp`).
- **Authenticated Admin Panel & Dynamic CMS:** Created the admin panel at `/admin` featuring:
  - Auth login (`/admin/login`) and secure routing via Next.js 16's `proxy.ts` rules.
  - Interactive datatables with inline editing/deleting for inbound leads (`/admin/leads`) and candidates (`/admin/applications`).
  - Blogs and Case Studies listing, authoring, and modifying interfaces (`/admin/blogs`, `/admin/case-studies`).
- **Dynamic Public Feeds:** Connected `/blog` and `/case-studies` along with their dynamic nested `[slug]` pages to query directly from the Supabase `blogs` and `case_studies` tables.


## In Progress

- Verifying production-ready deployments.

## Next Up

1. **Transactional Email Scopes:** Integrate Resend triggers for lead tracking logs.
2. **Automated Analytics:** Integrate custom analytics tag scripts.

## Open Questions

- **Company Contact Data:** Confirm the exact registered office address, phone number, and support email for page displays and schema structures.
- **SMTP Provider:** Confirm Resend as the transaction email dispatcher.
- **Analytics Choice:** Determine if Google Analytics 4 is preferred over a privacy-first choice (e.g. Plausible).
- **ISO 9001 Badge:** Clarify whether the ISO 9001 certification badge is placeholder or if the company has active credentials.

## Architecture Decisions

- **Supabase SSR:** Adopted cookie-based validation utilizing `@supabase/ssr` to maintain secure user state across Next.js Server Components.
- **Server Component Pre-rendering:** Refactored dynamic `/services/[slug]` detail routes into Next.js Server Components to facilitate crawler indexing and meta header generation.
