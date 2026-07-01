# UI Context

## Theme

The theme is **Light theme as default** and fully polished. The design language is centered on "Precision Engineering" — a modern, high-performance B2B framework that communicates technical mastery and reliability through a Corporate/Modern aesthetic with Minimalist leanings.

The visual language uses ample whitespace, razor-sharp alignment, and high structural contrast.

## Colors

All colors are locked from the design specs in `DESIGN.md`. All elements must use these CSS vars / tokens.

| Role | CSS Variable | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| Page background | `--background` | `#f9f9ff` | Base page background |
| Primary text | `--foreground` | `#151b2a` | Large headers, dark text, body text |
| Card background | `--card` | `#ffffff` | Component cards, dashboard panels |
| Accent text | `--muted-foreground` | `#424655` | Secondary text |
| Border | `--border` | `#e2e8fc` | Technical dividers, grid outlines |
| Primary | `--primary` | `#0046be` | Primary utility blue |
| Primary Accent | `--primary-container` | `#0a5cf0` | Electric blue for active accents, icons |
| Secondary (Deep) | `--secondary` | `#4454be` | Mid-shade blue |
| Secondary Accent | `--on-secondary-container` | `#0a1f8f` | Ultramarine for headers, navigation, footers |
| Accent (Cyan) | `--tertiary-container` | `#007387` | Accent cyan |
| Tertiary | `--tertiary` | `#005969` | Mid-shade teal |
| Success | `--success` | `#16a34a` | Form confirmation alerts |
| Destructive | `--destructive` | `#ba1a1a` | Errors / delete states |

### Gradients
- **Primary CTA button gradient:** `linear-gradient(90deg, #0a5cf0 0%, #06b6d4 100%)` (electric blue to cyan).
- **Deep section gradient:** `linear-gradient(135deg, #0a1f8f 0%, #0a5cf0 100%)` (ultramarine to electric blue).

## Typography

| Role | Font Family | Size | Weight | Details |
| :--- | :--- | :--- | :--- | :--- |
| Display Large | Sora | 64px | 700 (Bold) | Hero title, line-height: 1.1, tracking: -0.02em |
| Display Medium | Sora | 48px | 700 (Bold) | Section title, line-height: 1.1, tracking: -0.02em |
| Headline Large | Sora | 36px | 600 (Semi-bold) | Page headings (desktop), line-height: 1.2, tracking: -0.01em |
| Headline Large Mobile| Sora | 28px | 600 (Semi-bold) | Page headings (mobile), line-height: 1.2, tracking: -0.01em |
| Headline Medium | Sora | 24px | 600 (Semi-bold) | Sub-headings, card titles, line-height: 1.3 |
| Body Large | Inter | 18px | 400 (Regular) | Intro paragraphs, lede text, line-height: 1.6 |
| Body Medium | Inter | 16px | 400 (Regular) | Standard body text, copy blocks, line-height: 1.6 |
| Label Large | Inter | 14px | 600 (Semi-bold) | Meta-tags, categories (uppercase, tracking: 0.05em) |
| Label Medium | Inter | 12px | 500 (Medium) | Small captions, tag chips, line-height: 1.2 |

## Border Radius

A consistent corner radius is applied to maintain structural design integrity.

| Token | Radius Value | Component Use |
| :--- | :--- | :--- |
| `sm` | `0.25rem` (4px) | Badges, small chips, rating outlines |
| `DEFAULT` | `0.5rem` (8px) | Inner card layout elements, secondary inputs |
| `md` | `0.75rem` (12px) | **Locked Standard:** Cards, primary buttons, input fields |
| `lg` | `1.0rem` (16px) | Dialog/popover outer wraps, mega menu containers |
| `xl` | `1.5rem` (24px) | Large hero containers or section divisions |
| `full` | `9999px` | Round avatars, status dots, fully pill-shaped tags |

## Component Library

We use **shadcn/ui** components configured with the Tailwind CSS v4 design tokens above.
- Custom button styles reflect standard variant structures (Primary with electric blue-to-cyan gradient, Secondary in Ultramarine solid/outline).
- All input fields must adopt `rounded-md` (`0.75rem`) corners with outline border transitions to Electric Blue (`--primary-container`) on focus.

## Layout Patterns

- **Standard Grid:** 12-column layout with 24px gutters, max-width of 1200px. Snaps to:
  - Desktop (1024px+): 12 columns, 48px side margins.
  - Tablet (768px - 1023px): 8 columns, 32px side margins.
  - Mobile (<767px): 4 columns, 16px side margins.
- **Header:** Sticky top navbar, condenses height on scroll, containing Logo link, mega-menu, text page links, and a primary CTA.
- **Footer:** Deep background gradient (`linear-gradient(135deg, #0a1f8f 0%, #0a5cf0 100%)`) with contrasting white text, structured columns, contact/ISO information, and social icons.
- **Padding:** Desktop section vertical padding: 80-120px. Mobile section vertical padding: 48-64px.

## Icons

We use **Lucide React**.
- Stroke-width: 2px (or customized where thin look is needed).
- Sizes: `h-4 w-4` for inline labels/tags, `h-5 w-5` for standard button links or header tabs.
