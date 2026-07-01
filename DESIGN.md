---
name: AproMax Engineering Systems
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daee'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e2e8fc'
  surface-container-highest: '#dce2f6'
  on-surface: '#151b2a'
  on-surface-variant: '#424655'
  inverse-surface: '#2a3040'
  inverse-on-surface: '#edf0ff'
  outline: '#737687'
  outline-variant: '#c3c6d8'
  surface-tint: '#0052dc'
  primary: '#0046be'
  on-primary: '#ffffff'
  primary-container: '#0a5cf0'
  on-primary-container: '#e4e8ff'
  inverse-primary: '#b4c5ff'
  secondary: '#4454be'
  on-secondary: '#ffffff'
  secondary-container: '#8090fd'
  on-secondary-container: '#0a1f8f'
  tertiary: '#005969'
  on-tertiary: '#ffffff'
  tertiary-container: '#007387'
  on-tertiary-container: '#c1f1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003da9'
  secondary-fixed: '#dfe0ff'
  secondary-fixed-dim: '#bcc3ff'
  on-secondary-fixed: '#000d60'
  on-secondary-fixed-variant: '#2a3aa5'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f9f9ff'
  on-background: '#151b2a'
  surface-variant: '#dce2f6'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  max-width: 1200px
  columns: '12'
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  unit: 8px
---

## Brand & Style
The design system embodies "Precision Engineering." It is a modern, high-performance B2B framework that communicates technical mastery and reliability through a **Corporate/Modern** aesthetic with **Minimalist** leanings. 

The visual language is characterized by "High-Definition" clarity: ample white space, razor-sharp alignment, and a sophisticated interplay between deep ultramarine and vibrant electric blue. The goal is to evoke the feeling of a high-end CAD interface or a premium technical dashboard—professional, confident, and meticulously organized. It avoids decorative fluff in favor of functional elegance.

## Colors
The palette is rooted in engineering "Blueprints." 

- **Primary & Secondary:** The core contrast is built between **Electric Blue** (action/vitality) and **Ultramarine** (authority/depth). Use Ultramarine for large headers, navigation bars, or high-contrast sections to ground the UI.
- **Accents:** **Cyan** is used sparingly for data visualization, status indicators, or as the light-end of the primary action gradient.
- **Neutral Framework:** The system uses a clean **White** base with **Soft Slate** surfaces to create distinct functional zones. Borders should remain "hairline" to maintain a technical feel.
- **Gradients:** Reserved strictly for primary call-to-action buttons and key interactive elements to create a sense of depth and "digital glow" against static content.

## Typography
The typographic hierarchy creates a "Structural Contrast."

**Sora** is the voice of authority. It must be set with tight letter-spacing in bold or semi-bold weights for all headings. Its geometric nature reflects architectural precision.

**Inter** provides the functional clarity required for technical documentation and B2B workflows. It is optimized for legibility. 
- Use **Body-LG (18px)** for introductory text and high-level marketing copy.
- Use **Body-MD (16px)** for standard UI text and lists.
- Labels should often utilize the uppercase **Label-LG** style to act as "technical meta-tags" above headlines or within cards.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model for desktop to ensure content remains centered and readable on ultra-wide monitors, with a 1200px maximum width.

- **Grid:** A 12-column system with 24px gutters. Elements should snap to these columns to maintain a disciplined, "engineered" look.
- **Rhythm:** An 8px linear scale (8, 16, 24, 32, 48, 64, 80) governs all padding and margins.
- **Responsive Behavior:** 
  - **Desktop (1024px+):** 12 columns, 48px side margins.
  - **Tablet (768px - 1023px):** 8 columns, 32px side margins.
  - **Mobile (<767px):** 4 columns, 16px side margins.

## Elevation & Depth
Depth is signaled through **Tonal Layers** and **Ambient Shadows** rather than heavy skeuomorphism.

- **Level 0 (Base):** White (#FFFFFF) background.
- **Level 1 (Surfaces):** Soft Slate (#F5F7FA) used for sidebars, secondary sections, or input backgrounds.
- **Level 2 (Cards):** White background with a "Hairline" border (#E2E8F0) and a very soft, diffused shadow (e.g., `0px 4px 20px rgba(11, 18, 32, 0.04)`).
- **Level 3 (Interactive/Overlays):** For modals or active dropdowns, increase shadow opacity and spread to suggest a physical lift from the page.

The overall feel should be flat and clean, with shadows serving only to distinguish interactive layers from the static background.

## Shapes
A consistent **12px (0.75rem)** corner radius is applied to all primary UI components including cards, buttons, and input fields. 

This specific radius provides a "Modern Industrial" feel—soft enough to feel approachable and contemporary, but sharp enough to maintain a sense of structural integrity. Small utility elements like tags or badges may use a "Pill" shape (full rounding) to differentiate them from functional containers.

## Components
- **Buttons:** 
  - *Primary:* Gradient fill (#0A5CF0 to #06B6D4) with white text. 12px corners.
  - *Secondary:* Ultramarine (#0A1F8F) outline or solid.
  - *Ghost:* No border, slate text, becomes Slate (#F5F7FA) on hover.
- **Technical Cards:** Use the Icon + Label pattern. Icons should be monochrome (Ultramarine or Electric Blue) and placed in a light slate circle or square. Title (Sora) followed by concise Body (Inter).
- **Inputs:** 12px rounded corners, hairline slate border. On focus, the border transitions to Electric Blue with a subtle 2px outer glow.
- **Data Visualization:** Use a mix of Electric Blue, Cyan, and Ultramarine. Avoid "traffic light" colors (red/green) unless specifically indicating a system error or success.
- **Imagery:** Strictly use precision-focused visuals. CAD wireframes, macro shots of brushed steel, 3D renders of hardware components, or engineers in high-tech environments. Avoid stock photos of smiling people in offices.