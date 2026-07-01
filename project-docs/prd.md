# Product Requirements Document (PRD)
## AproMax Engineering LLP — Corporate Website & Content Admin Panel

**Version:** 1.0
**Date:** July 2026
**Owner:** AproMax Engineering LLP
**Prepared as:** Build documentation (developer-ready)
**Stack:** Next.js (App Router) · Supabase (Postgres + Auth + Storage + RLS) · Zustand · TypeScript · Tailwind CSS · shadcn/ui

---

## 0. How to read this document

This PRD is written so an engineer can build the site end-to-end without further discovery. It contains: goals, positioning, audience, competitive context, full information architecture, page-by-page specs, a complete admin/CMS spec, the Supabase data model (with SQL + RLS), the technical architecture, the design system (tokens derived from the AproMax logo), SEO/performance requirements (paired with the companion `seo.ts` file), and a phased delivery plan.

Anything marked **[CMS]** is content the admin panel must manage. Anything marked **[Assumption]** should be confirmed with stakeholders but has a safe default.

---

## 1. Background & Problem Statement

**AproMax Engineering LLP** is a managed engineering services partner and specialist orchestrator. Registered as an Indian LLP (LLPIN ACJ-2244, incorporated 30 August 2024, Assam, India), it delivers engineering design, simulation, and software projects to clients in India, the Middle East, and the **United States and other global markets** through a vetted global network of expert specialists.

**Current state:**
- Existing site (apromaxeng.com) is a single, thin marketing page built on Next.js + Tailwind + shadcn/ui. It lists services as one long flat list, has a basic contact form, and stub routes for `/about`, `/services`, `/careers`, `/blogs`, `/contact`.
- There is **no CMS** — content changes require code edits.
- Traffic today is concentrated in Saudi Arabia (~62%) and India (~38%); the company wants to **win US/global B2B buyers**, where the visual and credibility bar is higher.

**Problem:** The current site does not read as a credible partner for US enterprise/mid-market engineering buyers, cannot be updated by non-developers, and is not structured or optimized to rank and convert in the US market.

**This project delivers:**
1. A **US-market-grade** marketing website (light theme, brand-consistent) that communicates capability, credibility, and outcomes.
2. A **secure admin panel** so the team can publish blogs, case studies, services, jobs, testimonials, and site content without a developer.
3. A **content model + SEO foundation** designed to rank for US/global engineering-services intent.

---

## 2. Goals & Non-Goals

### 2.1 Business goals
- Reposition AproMax as a credible **managed engineering services partner** and orchestrator for US/EU/GCC buyers, leveraging a vetted specialist network.
- Generate qualified inbound leads (consultation requests, RFQs) and job applications.
- Enable self-serve content publishing (SEO/thought-leadership engine).

### 2.2 Product goals
- Ship a fast, accessible, SEO-strong marketing site with a clear service architecture.
- Provide a robust, role-gated CMS covering all dynamic content.
- Establish a design system derived from the AproMax logo, delivered as a **light theme** (dark theme optional, see §11.7).

### 2.3 Success metrics (targets for first 6 months post-launch)
| Metric | Baseline | Target |
|---|---|---|
| Lighthouse Performance (mobile) | n/a | ≥ 90 |
| Lighthouse SEO / Best Practices / A11y | n/a | ≥ 95 |
| Core Web Vitals (LCP / INP / CLS) | n/a | Pass (LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Organic US sessions / mo | ~0 | Growing MoM; first US keywords ranked |
| Consultation form conversion rate | n/a | ≥ 2.5% of sessions |
| Content publish time (blog post, no dev) | impossible | < 15 min via admin |

### 2.4 Non-goals (v1)
- E-commerce / online payments.
- Client login portal / project dashboards (future phase).
- Full multi-language localization (architect for it — §14.5 — but ship English only).
- Native mobile apps.

---

## 3. Target Audience & Personas

1. **US/Global Procurement & Engineering Managers (primary).** Evaluating outsourced engineering/CAD/CAE partners. Care about: capability depth, quality process, IP security/NDA, communication, time-zone overlap, case evidence. Entry pages: Home, Services, Case Studies, About/Trust.
2. **Startup / Product Founders (secondary).** Need product design + prototyping + software. Care about: end-to-end concept-to-prototype, speed, cost. Entry: Services (Design, Prototype, App Dev), Case Studies.
3. **Plant / Industrial buyers (GCC & India).** Need plant, control systems, simulation. Care about: domain expertise, safety, compliance.
4. **Job seekers / contract engineers.** Care about: open roles, remote-friendly culture. Entry: Careers.
5. **The AproMax content editor/admin (internal).** Non-technical; must publish and edit everything through the admin panel.

---

## 4. Competitive & Market Context

**Comparable/benchmark firms** (used for design & credibility patterns, not feature-copying):
- *Large ER&D:* Cyient, L&T Technology Services, Tata Elxsi, Quest Global, ALTEN.
- *Closest peers (CAD/CAE outsourcing):* Hitech CADD Services, TrueCADD.
- *US product-design studios:* Delve (Bresslergroup), Synectic.

**US-market patterns adopted as requirements (see §7–§11):**
- Full-viewport hero: **one outcome-led headline** + one supporting line + primary CTA. No paragraph in the hero.
- Services grouped into **5–6 named pillars** (icon + one-liner + "Learn more"), never a flat list.
- **Industries-served** section with sector tiles → sector landing content.
- **Case studies** framed as *Problem → Solution → Measurable Result*.
- **Quantified stats bar**, **certifications** (target ISO 9001), **client/tech logos**, **testimonials** as trust signals.
- Nav: `Services · Industries · Case Studies · About · Insights (Blog) · Contact (button)`.
- Repeated CTAs: **"Get a Free Consultation" / "Talk to an Expert."**
- Restrained palette, generous whitespace (80–120px section padding), sans-serif type, product/CAD-render imagery over stock photos, subtle scroll/counter motion.

> **Credibility guardrail:** AproMax is young (founded 2024, small team). **Do not fabricate stats or client logos.** All trust numbers are **[CMS]**-driven so only true figures are shown. Where hard numbers are thin, lead with capability, network capacity, process, tools (SolidWorks, Autodesk Inventor, FEA/CFD), disciplines covered, and regions served. Recommend pursuing ISO 9001 and displaying the badge once earned.

---

## 5. Brand & Positioning

- **Name / meaning:** "AproMax" = *Approach Maximum* — approaching maximum potential in every project.
- **Positioning statement (proposed):** *"AproMax Engineering is a managed engineering services partner and specialist orchestrator. We scope, coordinate, and quality-check engineering, simulation, and custom software projects globally through a vetted network of specialists — providing a single accountable point of contact."*
- **Value pillars:** Single Accountable Partner · Vetted Specialist Network · Managed QA & Delivery · IP-Safe & NDA-First · Cost-Effective Global Scaling.
- **Voice:** Confident, precise, plain-spoken. Outcome-oriented. Avoid jargon soup; name capabilities by the value they create.
- **Primary CTA copy:** "Get a Free Consultation." Secondary: "Talk to an Engineer" / "Request a Quote."

---

## 6. Information Architecture (Sitemap)

```
/                         Home
/services                 Services overview (6 pillars)
/services/[slug]          Service pillar / detail page            [CMS]
/industries               Industries overview
/industries/[slug]        Industry detail page                     [CMS]
/case-studies             Case studies / portfolio index          [CMS]
/case-studies/[slug]      Case study detail                        [CMS]
/about                    About / Who we are / team / trust
/careers                  Careers index (open roles)               [CMS]
/careers/[slug]           Job detail + application form            [CMS]
/blog                     Insights/blog index (was /blogs)         [CMS]
/blog/[slug]              Blog post detail                         [CMS]
/blog/category/[slug]     Blog category archive                    [CMS]
/contact                  Contact / consultation request
/privacy-policy           Legal                                    [CMS]
/terms-of-service         Legal                                    [CMS]
/sitemap.xml              Auto-generated
/robots.txt               Auto-generated

ADMIN (auth-gated, noindex)
/admin                    Dashboard
/admin/login              Auth
/admin/blog               Manage posts
/admin/case-studies       Manage case studies
/admin/services           Manage services
/admin/industries         Manage industries
/admin/careers            Manage jobs + view applications
/admin/testimonials       Manage testimonials
/admin/team               Manage team members
/admin/clients            Manage client/tech logos
/admin/stats              Manage homepage stat counters
/admin/leads              View contact/consultation submissions
/admin/media              Media library (Supabase Storage)
/admin/pages              Editable page content blocks (home hero, about, legal)
/admin/settings           Site settings, nav, SEO defaults, redirects
/admin/users              Admin user management (owner only)
```

**Redirects:** `/blogs → /blog`, `/blogs/* → /blog/*`. Keep old routes 301'd to preserve any existing equity.

---

## 7. Page-by-Page Specification (Marketing site)

Global elements on every marketing page:
- **Header/nav** (sticky, condenses on scroll): logo → `/`; links `Services` (mega-menu of pillars), `Industries`, `Case Studies`, `About`, `Insights`; **Contact** as filled primary button; theme toggle optional. Mobile: hamburger → full-screen drawer.
- **Footer:** logo + one-line pitch; columns for Services, Company, Resources; contact block (email, phone `+91 95373 30099`, HQ Assam, India); social (LinkedIn); newsletter signup [CMS toggle]; legal links; copyright with dynamic year; ISO/cert badges when present.
- **Floating/repeating CTA band** before footer: "Ready to build with AproMax? — Get a Free Consultation."

### 7.1 Home (`/`)
Sections in order:
1. **Hero** — outcome headline (e.g., *"Engineering that takes your product from idea to reality."*), one supporting sentence, primary CTA "Get a Free Consultation" + secondary "Explore Services." Right/background: subtle CAD-render or engineered-hardware visual (video allowed but must be lightweight, poster image, `prefers-reduced-motion` fallback). All hero copy **[CMS]** via `/admin/pages`.
2. **Trust bar** — client/tech logos strip (grayscale) + optional "Trusted by teams in the US, GCC & India" line. **[CMS]**; hidden if empty.
3. **Stats counters** — 3–4 animated counters (e.g., Projects delivered, Disciplines, Countries served, On-time delivery %). **[CMS]**; only render provided values.
4. **Service pillars** — 6 cards (Engineering, Design, Web & App Development, Analysis & Simulation, Prototyping & Development, Specialized Services). Icon + name + one-liner + "Learn more" → `/services/[slug]`.
5. **Why AproMax** — 3–4 value props (Multidisciplinary, End-to-end, Global/IP-safe, Cost-effective quality) with short supporting copy.
6. **Featured case studies** — 2–3 cards (image, industry tag, one-line result) → `/case-studies/[slug]`. **[CMS]**; section hidden if none.
7. **Industries** — sector tiles (Automotive, Energy & Utilities, Industrial Equipment, Consumer Products, Plant/Process, Electronics). → `/industries/[slug]`.
8. **Process** — 4–5 step "How we work" (Discover → Design → Analyze/Validate → Build/Deliver → Support).
9. **Testimonials** — quote carousel. **[CMS]**; hidden if none.
10. **Latest insights** — 3 most recent blog posts. **[CMS]**.
11. **CTA band** + footer.

### 7.2 Services overview (`/services`)
- Intro header (H1 + short lede). Grid of the 6 pillars with descriptions and sub-service chips. Each pillar → detail page. Cross-links to Industries and Case Studies. CTA band.

### 7.3 Service detail (`/services/[slug]`) **[CMS]**
Template fields: hero (title, subtitle, hero image), overview (rich text), **capabilities list** (sub-services — e.g., under Engineering: Mechanical, Electrical, Civil, Electronics, Control Systems, Plant, Automotive, Energy & Utilities, Industrial Equipment), **tools/tech used** (SolidWorks, Autodesk Inventor, FEA/CFD tools), **deliverables**, **related case studies** (relation), **FAQ** (drives FAQPage schema), CTA. SEO fields per page.

**Seed the 6 pillars & sub-services** (from current offering):
- **Engineering** — Mechanical, Electrical, Civil, Electronics, Control Systems, Plant, Automotive, Energy & Utilities, Industrial Equipment.
- **Design** — CAD Design, 3D Modeling, Product Design, Industrial Design, UX/UI.
- **Web & App Development** — Website design/dev, Responsive, E-commerce, Mobile (React Native/Flutter), Enterprise apps, Custom apps.
- **Analysis & Simulation** — Structural, Thermal, FEA, CFD.
- **Prototyping & Development** — Prototype development, Product testing, Custom software (Python/Java/JS/C++).
- **Specialized Services** — Reverse Engineering, Value Engineering, Failure Analysis, IP Development.

### 7.4 Industries (`/industries`, `/industries/[slug]`) **[CMS]**
Overview grid + detail template: sector intro, typical challenges, relevant services (relations), sector case studies, CTA, SEO fields.

### 7.5 Case Studies (`/case-studies`, `/case-studies/[slug]`) **[CMS]**
- Index: filterable grid (by service pillar, industry) — filters stored in **Zustand** UI store. Card: cover image, title, industry/service tags, one-line outcome.
- Detail template: hero (title, client [optional/anonymizable], industry, services), **Challenge / Approach / Solution / Results (with metrics)** sections, gallery (Storage images), tools used, related services, testimonial (optional), CTA. SEO + OG image per study.

### 7.6 About (`/about`)
Company story ("Approach Maximum"), mission/values, **team** grid **[CMS]** (photo, name, role, bio, LinkedIn), capabilities/tools, certifications & memberships **[CMS]**, locations/regions served, CTA. Editable intro blocks via `/admin/pages`.

### 7.7 Careers (`/careers`, `/careers/[slug]`) **[CMS]**
- Index: list of open roles (title, type: full-time/contract/remote, location, department) with filters (Zustand). "Life at AproMax" content block.
- Detail: role description (rich text), responsibilities, requirements, location/type, **application form** (name, email, phone, portfolio/LinkedIn URL, resume upload → Storage, cover note). Submissions stored + email notification to HR. JobPosting schema per role.

### 7.8 Blog / Insights (`/blog`, `/blog/[slug]`, `/blog/category/[slug]`) **[CMS]**
- Index: featured post + paginated grid; category & tag filters; search (client filter or Supabase text search). 
- Post detail: cover, title, author (from team), published date, reading time, rich content (headings, images, code, callouts, embeds), tags, related posts, share buttons, prev/next. Article + BreadcrumbList schema.
- Draft/scheduled/published states; only published are public.

### 7.9 Contact (`/contact`)
- H1 + reassurance copy (response time, NDA-friendly). **Consultation form:** First name, Last name, Work email, Company, Region (select), Service of interest (select, seeded from services), Budget (optional), Message, consent checkbox. On submit → store in `leads`, send email to sales + autoresponder to user, success state. Spam protection (honeypot + rate limit + optional Turnstile/hCaptcha). Sidebar: email, phone, HQ, hours, LinkedIn, embedded map (optional, lazy-loaded).

### 7.10 Legal (`/privacy-policy`, `/terms-of-service`) **[CMS]**
Rich-text pages editable in admin. Include cookie/analytics disclosure.

### 7.11 System pages
Custom **404** and **500** with brand styling + helpful links. **Loading skeletons** for CMS-driven lists.

---

## 8. Admin Panel / CMS Specification

### 8.1 Principles
- Auth-gated at `/admin/*`, `noindex`, not in sitemap.
- Role-based: **owner**, **admin**, **editor** (see §8.4).
- Every dynamic content type from §7 is fully CRUD-manageable.
- Autosave-friendly forms with **React Hook Form + Zod** validation; optimistic UI where safe. Editor/session UI state in **Zustand**.
- All destructive actions confirm; content supports **Draft / Published / Archived** status and `published_at` scheduling where relevant.

### 8.2 Modules (features per content type)
| Module | Capabilities |
|---|---|
| **Dashboard** | Counts (posts, leads, applications this week), recent leads, quick "New post/case study" actions, publish status overview. |
| **Blog** | List (search, filter by status/category), create/edit with rich-text editor (Tiptap) or MDX, cover image picker, category & tag management, author select, SEO fields (title/description/OG), slug auto + editable, draft/schedule/publish, duplicate, delete. |
| **Case Studies** | CRUD, structured fields (challenge/approach/solution/results-metrics), gallery upload, relations to services/industries, featured toggle, SEO fields. |
| **Services** | CRUD pillars + sub-services (capabilities), icon picker, tools list, FAQ builder, ordering (drag to reorder), SEO fields. |
| **Industries** | CRUD, relations to services & case studies, ordering, SEO fields. |
| **Careers** | CRUD jobs (status open/closed), fields for type/location/department, rich description; **Applications inbox** (view, filter, status: new/reviewing/shortlisted/rejected, download resume, notes). |
| **Testimonials** | CRUD (quote, author, role, company, avatar, rating, featured). |
| **Team** | CRUD (name, role, photo, bio, socials, order, visible). |
| **Clients/Tech logos** | CRUD (name, logo, url, type: client/tech, order, visible). |
| **Stats** | CRUD homepage counters (label, value, suffix, order). |
| **Leads** | Read/manage contact & consultation submissions (status, assignee note, export CSV). Read-only capture; no public edit. |
| **Media** | Upload/browse/delete assets in Supabase Storage; alt text; copy URL; used by all pickers. |
| **Pages** | Edit static-but-editable content blocks: Home hero + section copy, About intro, CTA band text, footer pitch, legal pages. Field-based (not free code). |
| **Settings** | Site title/tagline, logo, contact info (email/phone/address/hours), social links, nav items & mega-menu, SEO defaults, analytics IDs, redirects, feature toggles (newsletter, map), maintenance mode. |
| **Users** | (owner only) invite/manage admin users & roles. |

### 8.3 Rich content editing
- Use **Tiptap** (ProseMirror) for blog/case-study/legal rich text → store as JSON (portable) or sanitized HTML. Support headings, lists, bold/italic/links, images (from Media), blockquote, code block, callout, embed (YouTube/LinkedIn), tables. Render with a hardened renderer (sanitize; no arbitrary script). MDX is an acceptable alternative if the team is technical, but Tiptap is recommended for non-devs.

### 8.4 Auth & roles
- **Supabase Auth** (email/password; magic link optional). No public signup — admins are invite-only (owner creates users; or seeded via Supabase dashboard for first owner).
- `profiles` table holds `role` (`owner | admin | editor`).
  - **owner:** everything incl. user management + settings + delete.
  - **admin:** all content + leads + settings (no user mgmt/delete-users).
  - **editor:** create/edit content (blog, case studies, etc.), cannot manage settings/users or delete others' published content.
- Enforce roles **both** in UI (hide/disable) and in **RLS policies** (source of truth). Never trust client.
- Admin routes protected via middleware (redirect unauthenticated to `/admin/login`) + server-side session checks in every admin server action/route handler.

---

## 9. Data Model (Supabase / Postgres)

> Conventions: all tables have `id uuid default gen_random_uuid() primary key`, `created_at timestamptz default now()`, `updated_at timestamptz` (via trigger). Slugs are unique where public. Enums implemented as Postgres enums or `text` + check constraints.

### 9.1 Tables (summary)
| Table | Key columns |
|---|---|
| `profiles` | `id (=auth.uid)`, `email`, `full_name`, `role`, `avatar_url` |
| `services` | `slug`, `title`, `subtitle`, `icon`, `summary`, `body(jsonb)`, `tools(text[])`, `order`, `status`, `seo(jsonb)` |
| `service_capabilities` | `service_id`, `name`, `description`, `order` |
| `industries` | `slug`, `title`, `summary`, `body(jsonb)`, `icon`, `order`, `status`, `seo(jsonb)` |
| `case_studies` | `slug`, `title`, `client_name`, `is_client_anonymous`, `cover_url`, `industry_id`, `challenge`, `approach`, `solution`, `results(jsonb metrics[])`, `body(jsonb)`, `gallery(jsonb)`, `tools(text[])`, `featured`, `status`, `published_at`, `seo(jsonb)` |
| `case_study_services` | join: `case_study_id`, `service_id` |
| `posts` | `slug`, `title`, `excerpt`, `cover_url`, `body(jsonb)`, `author_id`, `category_id`, `reading_time`, `featured`, `status`, `published_at`, `seo(jsonb)` |
| `categories` | `slug`, `name`, `description` |
| `tags` | `slug`, `name` |
| `post_tags` | join: `post_id`, `tag_id` |
| `jobs` | `slug`, `title`, `department`, `employment_type`, `location`, `is_remote`, `description(jsonb)`, `requirements(jsonb)`, `status(open/closed)`, `posted_at`, `seo(jsonb)` |
| `applications` | `job_id`, `first_name`, `last_name`, `email`, `phone`, `portfolio_url`, `resume_url`, `cover_note`, `status`, `created_at` |
| `testimonials` | `quote`, `author_name`, `author_role`, `company`, `avatar_url`, `rating`, `featured`, `visible`, `order` |
| `team_members` | `name`, `role`, `photo_url`, `bio`, `linkedin_url`, `order`, `visible` |
| `clients` | `name`, `logo_url`, `url`, `type(client/tech)`, `order`, `visible` |
| `stats` | `label`, `value`, `suffix`, `prefix`, `order`, `visible` |
| `leads` | `first_name`, `last_name`, `email`, `company`, `region`, `service_interest`, `budget`, `message`, `source`, `status`, `created_at` |
| `media` | `path`, `url`, `alt`, `width`, `height`, `mime`, `size`, `uploaded_by` |
| `pages` | `key (home/about/legal/...)`, `content(jsonb blocks)` |
| `settings` | singleton `id=1`, `data(jsonb)` (contact, social, nav, seo defaults, toggles) |
| `redirects` | `source`, `destination`, `permanent(bool)` |

### 9.2 Example SQL (excerpt — posts, profiles, RLS)
```sql
create type user_role as enum ('owner','admin','editor');
create type content_status as enum ('draft','published','archived');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role user_role not null default 'editor',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_url text,
  body jsonb,                       -- Tiptap/MDX JSON
  author_id uuid references profiles(id),
  category_id uuid references categories(id),
  reading_time int,
  featured boolean default false,
  status content_status not null default 'draft',
  published_at timestamptz,
  seo jsonb,                        -- { title, description, ogImage, noindex }
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index on posts (status, published_at desc);

-- updated_at trigger (apply to all content tables)
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger trg_posts_updated before update on posts
  for each row execute function set_updated_at();

-- Helper: is the current user staff?
create or replace function is_staff() returns boolean as $$
  select exists(select 1 from profiles p where p.id = auth.uid()
                and p.role in ('owner','admin','editor'));
$$ language sql security definer stable;

-- RLS
alter table posts enable row level security;

-- Public can read only published posts
create policy "public reads published posts" on posts
  for select using (status = 'published');

-- Staff can read everything
create policy "staff reads all posts" on posts
  for select using (is_staff());

-- Staff can write
create policy "staff insert posts" on posts
  for insert with check (is_staff());
create policy "staff update posts" on posts
  for update using (is_staff()) with check (is_staff());

-- Only owner/admin can delete
create policy "admins delete posts" on posts
  for delete using (exists(select 1 from profiles p
      where p.id = auth.uid() and p.role in ('owner','admin')));
```

### 9.3 RLS pattern for all content tables
- **Public read** = `status = 'published'` (and `published_at <= now()` where scheduled). Tables without status (testimonials, team, stats, clients) use `visible = true`.
- **Staff read** all rows.
- **Insert/Update** = `is_staff()`.
- **Delete** = owner/admin only.
- **`leads` & `applications`:** **public INSERT allowed** (from forms), **no public SELECT** (staff read only). Consider inserting via a server action using the service role instead, so anon key can't enumerate. Recommended: form submissions go through a **Next.js server action / route handler** using the **service role key (server-only)**, keeping RLS locked to staff for reads.
- **`media`, `settings`, `redirects`, `pages`:** staff read/write; `settings`/`pages`/published-relevant reads may be public-read where needed for rendering (e.g., `settings` public fields, `pages`, `team`, `stats`). Split sensitive settings into a separate row/table if needed.

### 9.4 Storage buckets
- `public-media` (public read) — blog covers, case-study images, team photos, logos, OG images.
- `resumes` (private) — application resumes; access via signed URLs from admin only.
- Enforce file-type/size limits (images ≤ 5MB, resumes ≤ 10MB, allowed mime types) in upload handler.

---

## 10. Technical Architecture

### 10.1 Stack & key libraries
- **Next.js (App Router, latest)** — Server Components by default; Route Handlers + **Server Actions** for mutations/forms; ISR/on-demand revalidation for CMS content.
- **TypeScript** everywhere (strict).
- **Supabase** — Postgres (data), Auth (admin), Storage (media/resumes), RLS (authz). Use `@supabase/ssr` for cookie-based auth in App Router. Generate typed DB client via `supabase gen types typescript`.
- **Zustand** — client-side state: nav/mobile-menu, theme, case-study/blog/careers **filters**, admin editor UI state (unsaved-changes, sidebar), toast/notifications. (Server data is fetched in Server Components / server actions; Zustand is for UI/ephemeral state, not the source of truth.)
- **Tailwind CSS + shadcn/ui** — matches current stack; design tokens in §11. **lucide-react** icons (already used).
- **React Hook Form + Zod** — all forms + shared validation schemas (reused client + server).
- **Tiptap** — rich text editor for CMS.
- **next/image**, **next/font** (Inter + display font), **next-sitemap** or custom `sitemap.ts`/`robots.ts`.
- **Email:** Resend (or Supabase + SMTP) for lead/application notifications + autoresponders. React Email for templates.
- **Analytics:** Google Analytics 4 (or Plausible/Umami for privacy) + Google Search Console + optional Vercel Analytics. IDs stored in settings/env.
- **Spam:** honeypot + Cloudflare Turnstile (or hCaptcha) on public forms; rate-limit route handlers.
- **Hosting:** Vercel (recommended) or Node host; Supabase cloud. CI on GitHub.

### 10.2 Suggested folder structure
```
src/
  app/
    (marketing)/
      layout.tsx  page.tsx (home)
      services/[slug]/page.tsx  services/page.tsx
      industries/[slug]/page.tsx  industries/page.tsx
      case-studies/[slug]/page.tsx  case-studies/page.tsx
      blog/[slug]/page.tsx  blog/page.tsx  blog/category/[slug]/page.tsx
      careers/[slug]/page.tsx  careers/page.tsx
      about/page.tsx  contact/page.tsx
      (legal)/privacy-policy/page.tsx  terms-of-service/page.tsx
    admin/
      layout.tsx (auth guard)  page.tsx (dashboard)
      login/page.tsx
      blog/…  case-studies/…  services/…  industries/…
      careers/…  testimonials/…  team/…  clients/…
      stats/…  leads/…  media/…  pages/…  settings/…  users/…
    api/  (route handlers: contact, apply, revalidate, og)
    sitemap.ts  robots.ts  opengraph-image.tsx
  components/  (ui/, marketing/, admin/, shared/)
  lib/
    supabase/ (server.ts, client.ts, middleware.ts, types.ts)
    seo.ts               <-- companion file (see seo.ts)
    validations/ (zod schemas)
    email/ (resend, templates)
  stores/  (zustand: ui.ts, filters.ts, editor.ts)
  content/ (static seed data for services/industries if desired)
  styles/ (globals.css with CSS vars/tokens)
  middleware.ts  (admin auth + redirects)
```

### 10.3 Data fetching & caching
- Marketing pages use **Server Components** reading from Supabase (anon client, RLS-enforced) with `generateStaticParams` + **ISR** (`revalidate`) for `[slug]` routes; **on-demand revalidation** (`revalidatePath`/tag) triggered by admin publish (via server action or webhook) so edits go live fast.
- `generateMetadata` per route pulls from CMS `seo` fields, falling back to `seo.ts` defaults.
- Admin pages are dynamic (no caching), authenticated.

### 10.4 Forms & mutations
- Public forms (contact, apply, newsletter) → **server actions / route handlers** using server-side Supabase (service role) to insert into `leads`/`applications`, then send email. Validate with shared Zod schema; verify captcha; honeypot; rate limit by IP.
- Admin CRUD → server actions with session + role checks; revalidate affected paths on success.

### 10.5 Security
- Service-role key **server-only** (never shipped to client). Anon key + RLS for public reads.
- All admin mutations re-check role server-side.
- Sanitize rich text on render. CSP headers, `X-Frame-Options`, HSTS via `next.config`/middleware.
- Signed URLs for private resume downloads. Input validation everywhere. Audit trail (`updated_by`) optional.

---

## 11. Design System (Light Theme)

### 11.1 Brand color derivation (from AproMax logo)
The logo mark is a two-tone blue "M": a bright electric blue grading into a deep ultramarine, with a near-black wordmark. Sampled values:
- Bright electric blue: **#0860F0**
- Deep ultramarine: **#0008B8**
- Wordmark: near-black **#0A0A0A**

### 11.2 Palette (light theme)
| Token | Hex | Use |
|---|---|---|
| `primary` / brand blue | **#0A5CF0** (from #0860F0) | Primary actions, links, accents |
| `primary-hover` | #0A4FD1 | Hover/active |
| `primary-foreground` | #FFFFFF | Text on primary |
| `deep` / ultramarine | **#0A1F8F** (refined #0008B8) | Headlines accent, dark sections, gradient end |
| `accent` / cyan | **#06B6D4** | Sparingly, for gradient CTA (blue→cyan) & highlights |
| `background` | #FFFFFF | Page background |
| `surface` / muted | #F5F7FA | Cards, alt sections |
| `surface-2` | #EEF2F7 | Nested surfaces |
| `border` | #E2E8F0 | Hairlines, dividers, inputs |
| `foreground` | #0B1220 | Primary text (near-black, slight blue) |
| `muted-foreground` | #64748B | Secondary text |
| `success` | #16A34A | Form success |
| `warning` | #D97706 | Warnings |
| `destructive` | #DC2626 | Errors/delete |

**Gradients:** hero/CTA accent = `linear-gradient(90deg, #0A5CF0 0%, #06B6D4 100%)` (mirrors current Book Now button). Deep section background = `linear-gradient(135deg, #0A1F8F, #0A5CF0)` for occasional dark-on-blue bands (footer CTA), text white.

### 11.3 CSS variables / Tailwind tokens (drop into `globals.css`)
```css
:root{
  --background:0 0% 100%;
  --foreground:222 47% 8%;
  --card:0 0% 100%;
  --muted:210 33% 97%;
  --muted-foreground:215 16% 47%;
  --border:214 32% 91%;
  --input:214 32% 91%;
  --primary:222 93% 49%;          /* #0A5CF0 */
  --primary-foreground:0 0% 100%;
  --secondary:230 88% 30%;        /* deep #0A1F8F */
  --accent:189 94% 43%;           /* cyan #06B6D4 */
  --ring:222 93% 49%;
  --radius:0.75rem;
}
/* Optional dark theme kept for the existing toggle — see §11.7 */
```
Map these in `tailwind.config` `theme.extend.colors` using `hsl(var(--…))` (shadcn convention).

### 11.4 Typography
- **Sans (UI/body):** Inter (via `next/font`), weights 400/500/600/700. Body 16–18px, line-height 1.6.
- **Display (headlines):** Inter Tight or Sora or Space Grotesk for engineered/technical feel; large scale.
- **Type scale:** H1 clamp(2.5rem, 5vw, 4rem); H2 ~2.25rem; H3 ~1.5rem; consistent modular scale. Tight tracking on display, normal on body.
- Headlines in `foreground`; use `primary` only for accent words/eyebrows.

### 11.5 Layout, spacing, components
- Container max-width ~1200–1280px; 4/8px spacing system; section vertical padding 80–120px desktop / 48–64px mobile.
- Cards: `--radius` 12px, subtle border + soft shadow on hover, no heavy drop shadows.
- Buttons: primary (solid blue / gradient option), secondary (outline), ghost. 44px min touch target.
- Reusable components: `Section`, `Container`, `SectionHeading` (eyebrow + title + lede), `ServiceCard`, `StatCounter`, `CaseStudyCard`, `IndustryTile`, `TestimonialCarousel`, `LogoStrip`, `CTABand`, `PostCard`, `Breadcrumbs`, `FAQAccordion`, form fields.

### 11.6 Motion & imagery
- Subtle: fade/slide-in on scroll (respect `prefers-reduced-motion`), counter animation for stats, mega-menu transitions. No autoplay audio; hero video muted + lazy + poster.
- Imagery: CAD renders, precision hardware, engineers at work — **not** generic handshake stock. Provide art-direction note in admin/media guidelines. Consistent grayscale treatment for logo strip.

### 11.7 Theme requirement
- **Ship light theme as default and primary.** The current site has a dark/light toggle; **retain the toggle as optional** but ensure light is default and fully polished. If timeline is tight, dark theme can be deferred (design tokens above already leave room via CSS vars).

### 11.8 Accessibility
- WCAG 2.1 AA: color contrast ≥ 4.5:1 for text (verify blue on white and white on blue — #0A5CF0 on white passes for large/UI; use `foreground` for body). Keyboard nav, focus-visible rings (`--ring`), semantic landmarks, alt text (enforced in Media), skip-to-content link, ARIA on menus/accordions/carousels, form labels + error messaging.

---

## 12. SEO & Content Strategy (paired with `seo.ts`)

The companion **`seo.ts`** file provides typed site config, metadata builders, JSON-LD schema generators, and keyword sets. Requirements it satisfies:

- **Metadata:** per-route `title`/`description`/canonical/robots via `generateMetadata`, using CMS `seo` fields → falling back to `seo.ts` defaults and templates (`%s | AproMax Engineering`).
- **Open Graph / Twitter:** defaults + per-page OG images (dynamic `opengraph-image.tsx` for blog/case studies).
- **Structured data (JSON-LD):**
  - `Organization` + `ProfessionalService`/`LocalBusiness` (name, logo, url, sameAs LinkedIn, contactPoint, areaServed: US + Global, address Assam IN).
  - `WebSite` (+ SearchAction).
  - `Service` per service page; `BreadcrumbList` sitewide.
  - `Article` for blog posts; `FAQPage` where FAQs exist; `JobPosting` for careers.
- **Sitemaps & robots:** dynamic `sitemap.ts` enumerating published CMS routes + `robots.ts` (allow all except `/admin`, `/api`). Submit to Google Search Console.
- **Keyword targeting (US/global intent):** "engineering services company," "CAD design services," "FEA CFD simulation services," "product design and development," "mechanical engineering outsourcing," "reverse engineering services," "plant engineering services," "outsourced engineering partner USA," etc. — mapped to service/industry pages. (Full sets in `seo.ts`.)
- **Performance-as-SEO:** image optimization (`next/image`, AVIF/WebP), font `display: swap`, code-splitting, no layout shift, lazy-load below-fold/video, edge caching/ISR.
- **Content ops:** blog engine for thought leadership; internal linking (services ↔ industries ↔ case studies ↔ posts); canonical management; 301 redirects (`/blogs`→`/blog`).
- **Hreflang/i18n-ready** (English default now).

---

## 13. Integrations
- **Email/notifications:** Resend (transactional) — lead alert to sales, application alert to HR, user autoresponders, newsletter (optional Mailchimp/Buttondown).
- **Analytics:** GA4 + Google Search Console; optional privacy-first Plausible.
- **Captcha:** Cloudflare Turnstile.
- **Maps:** optional embedded Google Map on Contact (lazy).
- **Social:** LinkedIn (primary) — link + optional post feed embed on Insights.

---

## 14. Non-Functional Requirements
1. **Performance:** Lighthouse ≥ 90/95; Core Web Vitals pass; TTFB low via ISR/edge.
2. **Security:** RLS enforced; service key server-only; CSP + security headers; sanitized rich text; signed URLs for resumes; rate limiting; dependency updates.
3. **Accessibility:** WCAG 2.1 AA.
4. **SEO:** as §12.
5. **Reliability:** graceful empty states; error boundaries; form retry; DB backups (Supabase).
6. **Scalability/i18n:** architecture supports adding locales and content volume without redesign.
7. **Maintainability:** typed DB client, shared Zod schemas, documented components, seed script for initial content.
8. **Privacy/Compliance:** cookie consent + privacy policy; store leads/applications lawfully; resume retention policy.
9. **Browser support:** last 2 versions of major browsers; mobile-first responsive (360px → 1440px+).

## 14.5 i18n note
Route via `app/[locale]` or middleware later; keep copy in CMS/dictionaries. Not built in v1.

---

## 15. Environment Variables (`.env` contract)
```
NEXT_PUBLIC_SITE_URL=https://apromaxeng.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only
RESEND_API_KEY=
CONTACT_NOTIFY_EMAIL=             # sales inbox
HR_NOTIFY_EMAIL=                  # careers inbox
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_GA_ID=
```

---

## 16. Delivery Plan (Phased)

**Phase 0 — Foundations (wk 1):** Repo, Next.js + TS + Tailwind + shadcn, design tokens (§11), Supabase project, schema + RLS + storage buckets, typed client, auth + admin guard, base layout/nav/footer, `seo.ts` wired.

**Phase 1 — Marketing core (wk 2–3):** Home, Services overview + detail (seeded 6 pillars), About, Contact (with server action + email + captcha), legal pages, SEO metadata + sitemap/robots + JSON-LD, redirects. Launchable MVP.

**Phase 2 — CMS + dynamic content (wk 3–5):** Admin dashboard, Blog (Tiptap) + index/detail, Case Studies + index/detail, Industries, Testimonials/Team/Clients/Stats, Media library, Pages editor, Settings, Leads inbox, on-demand revalidation.

**Phase 3 — Careers + polish (wk 5–6):** Careers index/detail + application form + resume upload + HR notifications + Applications inbox; testimonials/stats on home; motion polish; a11y audit; performance pass; analytics; QA across breakpoints.

**Phase 4 — Launch:** Content seeding (real services text, first case studies/posts), 301s from old routes, Search Console + sitemap submit, monitoring, handoff docs.

---

## 17. Assumptions & Open Questions
- **[Assumption]** English-only v1; light theme primary; dark theme optional.
- **[Assumption]** Company address shown as "Assam, India" (registered office Karimganj/Cachar; LinkedIn lists Guwahati) — **confirm exact public address** and phone/email for the Contact page & schema.
- **[Q]** Which real trust numbers/stats and client names may we display? Any signed NDAs limiting client naming (→ use "anonymized" toggle on case studies)?
- **[Q]** Do you have ISO 9001 (or plan to)? Display badge when earned.
- **[Q]** Preferred email provider (Resend vs existing SMTP) and destination inboxes?
- **[Q]** Analytics preference (GA4 vs privacy-first)?
- **[Q]** Confirm the 6-pillar grouping and naming, and any services to add/remove.
- **[Q]** Newsletter needed at launch, and provider?
- **[Q]** Blog authorship — single voice or multiple authors (team-based)?

---

*End of PRD v1.0*