# Project Overview - AproMax Engineering

## Overview

AproMax Engineering LLP is a managed engineering services partner and specialist orchestrator registered in India (incorporated August 2024, Assam). The firm delivers engineering design, simulation, and software services to clients globally (focusing on the United States) through a vetted network of engineering specialists. 

The goal of this project is to build a premium, US-market-grade corporate website that positions AproMax as a highly credible managed engineering services partner and orchestrator. In addition to the client-facing website, a secure Content Management System (CMS) admin panel will be implemented to let non-technical content managers update services, case studies, blogs, open job positions, client logos, and team details.

## Goals

1. **Brand Repositioning:** Establish a premium web presence using clear typography, structured grids, and outcome-led copy.
2. **Dynamic Content (CMS):** Build a complete admin dashboard for publishing and managing blogs, case studies, open roles, leads, and assets.
3. **Inbound Lead Generation:** Drive consultation requests and RFQs via optimized forms (recaptcha/Turnstile-protected).
4. **Performance & SEO:** Achieve Lighthouse Performance scores of $\ge 90$ on mobile and $\ge 95$ on SEO, A11y, and Best Practices.

## Core User Flow

1. **Land & Align:** A B2B prospect lands on the Home page, views the outcome-led hero statement, visual proof (CAD renders), and client trust logos.
2. **Discover Capabilities:** The user navigates to the `/services` section or `/services/[slug]` detail page to understand specific disciplines (Mechanical, Electrical, FEA/CFD, software dev).
3. **Validate Expertise:** The user visits `/case-studies` or `/case-studies/[slug]` to review challenge-approach-solution write-ups with concrete performance metrics.
4. **Initiate Contact:** The user fills out the consultation request on the `/contact` page.
5. **Form Submission Processing:** The form data is validated, stored in the database, and sent to sales admins via email (Resend).

## Features

### Public Marketing Site
- **Home (`/`):** Hero, trust logos strip, stat counters, 6 service pillars cards, value props, process phases, testimonials, and recent blogs list.
- **Services Overview (`/services`):** Directory card grid detailing the 6 main engineering pillars.
- **Service Detail (`/services/[slug]`):** Detailed overview, lists of capabilities, tools used (e.g. SolidWorks, FEA/CFD), related case studies, and FAQs.
- **Industries (`/industries`, `/industries/[slug]`):** Grid and detail views showing specific sectors served and typical challenges.
- **Case Studies Index & Detail (`/case-studies`, `/case-studies/[slug]`):** Filterable portfolio index (by pillar and industry) with case details.
- **Careers Index & Detail (`/careers`, `/careers/[slug]`):** List of open jobs, filters, detail specifications, and job application forms (including PDF resume upload).
- **Blog (`/blog`, `/blog/[slug]`, `/blog/category/[slug]`):** Searchable and filterable insights archive with category feeds.
- **Contact Page (`/contact`):** Custom consultation request form with validation, captcha protection, and regional indicators.
- **Legal Pages (`/privacy-policy`, `/terms-of-service`):** Clean, editable content blocks.

### Admin CMS Panel (`/admin/*`)
- **Dashboard Overview:** Submissions counter and quick links.
- **Blog CRUD:** Full editor (Tiptap/MDX) supporting draft/schedule/publish statuses.
- **Case Studies CRUD:** Form-driven editor for challenge, approach, solution, metrics.
- **Services & Industries CRUD:** Management of categories and layout ordering.
- **Careers & Applications Inbox:** View applications and download resume files via signed storage URLs.
- **Testimonials, Team, and Stats editors:** Direct adjustments for trust signals.
- **Media Library:** Supabase Storage asset viewer (uploads, copy URL, edit metadata).
- **Site Settings:** Global values for contact details, nav items, and SEO presets.

## Scope

### In Scope
- Client-facing responsive Next.js application.
- Authentication gating for admin routes using Supabase Auth.
- Supabase database schema matching all content tables, RLS protection policies.
- Email triggers (Resend) on form actions.
- Captcha protection for contact and career pages.
- Standard light theme as primary theme layout (dark mode toggle support optional/retained).

### Out of Scope
- E-commerce checkout or online billing tools.
- Authenticated client dashboards or project document-sharing pages.
- Native mobile applications (handled by responsive web layouts instead).
- Multi-language localizations (architected with i18n structure but English-only for v1).

## Success Criteria

1. **Core Web Vitals Pass:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
2. **SEO Foundations:** Dynamic site sitemap XML generation, robots.txt routing, and JSON-LD structured schemas live.
3. **Data Integrity:** Forms successfully validated client-side (Zod) and verified server-side, with uploads written to secure Supabase storage buckets.
