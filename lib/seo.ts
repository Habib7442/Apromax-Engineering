/**
 * seo.ts — Central SEO configuration & helpers for AproMax Engineering LLP
 * ---------------------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript.
 *
 * What this file provides:
 *   1. siteConfig            — single source of truth for brand/SEO metadata
 *   2. defaultMetadata       — root <head> defaults (import in app/layout.tsx)
 *   3. buildMetadata()       — per-route Metadata builder (use in generateMetadata)
 *   4. keywordSets           — US/global keyword targeting per section
 *   5. JSON-LD builders      — Organization, WebSite, Service, Article,
 *                              JobPosting, BreadcrumbList, FAQPage
 *   6. sitemapRoutes / robots helpers
 *
 * Usage (page):
 *   export async function generateMetadata(): Promise<Metadata> {
 *     const svc = await getService(params.slug);
 *     return buildMetadata({
 *       title: svc.seo?.title ?? svc.title,
 *       description: svc.seo?.description ?? svc.summary,
 *       path: `/services/${svc.slug}`,
 *       image: svc.seo?.ogImage,
 *       keywords: keywordSets.services,
 *     });
 *   }
 *
 * Usage (JSON-LD): render <JsonLd data={organizationSchema()} /> where JsonLd is a
 *   tiny component: <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
 *
 * NOTE: This file has zero runtime deps beyond `next` types. All CMS-editable
 *       values fall back to the constants below.
 */

import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════════════════════
 * 1. SITE CONFIG — edit brand facts here (or hydrate from Supabase `settings`)
 * ═══════════════════════════════════════════════════════════════════════════ */

export const siteConfig = {
    name: "AproMax Engineering",
    legalName: "AproMax Engineering LLP",
    // "Approach Maximum" — approaching maximum potential in every project.
    shortTagline: "Approach Maximum Engineering",
    description:
        "AproMax Engineering is a managed engineering services partner and specialist orchestrator. We scope, coordinate, and quality-check design, simulation, and custom software projects globally through a vetted network of specialists.",
    // Production URL. Read from env so preview deploys get correct canonicals.
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://apromaxeng.com").replace(/\/$/, ""),
    locale: "en_US",
    language: "en",
    themeColor: "#0A5CF0", // brand blue (from logo)

    // Brand assets (place in /public or Supabase Storage public bucket)
    logo: "/logo.webp",
    ogImageDefault: "/og-image.webp", // 1200x630 branded fallback
    favicon: "/favicon.ico",

    contact: {
        email: "info@apromaxeng.com",
        phone: "+91-9577291349",
        phoneUS: "+1 (312) 313-9125",
        address: {
            streetAddress: "57 Idgah Rd, Sijubari, Hatigaon",
            locality: "Guwahati",
            region: "Assam",
            postalCode: "781038",
            country: "IN",
        },
        hoursText: "Mon–Fri, 9:00 AM – 6:00 PM IST",
    },

    // Markets served — signals to search engines and buyers.
    areaServed: ["United States", "Canada", "United Kingdom", "European Union", "GCC", "India", "Worldwide"],

    social: {
        linkedin: "https://www.linkedin.com/company/apromax-eng-llp/posts/?feedView=all",
        instagram: "https://www.instagram.com/apromax__/",
    },

    // Same-as URLs for Organization schema
    sameAs: [
        "https://www.linkedin.com/company/apromax-eng-llp/posts/?feedView=all",
        "https://www.instagram.com/apromax__/"
    ],

    // Founding info (for Organization schema)
    foundingDate: "2024-08-30",

    // Twitter/X handle if/when created
    twitterHandle: undefined as string | undefined,

    titleTemplate: "%s | AproMax Engineering",
    defaultTitle: "AproMax Engineering — Managed Engineering Services & Specialist Network",
} as const;

export type SiteConfig = typeof siteConfig;

/* ═══════════════════════════════════════════════════════════════════════════
 * 2. KEYWORD SETS — US/global search intent, mapped by section.
 *    Attach the relevant set in buildMetadata({ keywords }).
 * ═══════════════════════════════════════════════════════════════════════════ */

export const keywordSets = {
    brand: ["AproMax", "AproMax Engineering", "AproMax Engineering LLP"],

    home: [
        "engineering services company",
        "multidisciplinary engineering firm",
        "outsourced engineering services",
        "product design and development",
        "engineering design and simulation services",
        "global engineering partner",
    ],

    services: [
        "mechanical engineering services",
        "electrical engineering services",
        "CAD design services",
        "3D modeling services",
        "product design services",
        "industrial design services",
        "engineering simulation services",
        "custom software development for engineering",
    ],

    analysis: [
        "FEA analysis services",
        "CFD simulation services",
        "finite element analysis outsourcing",
        "structural analysis services",
        "thermal analysis services",
        "CAE simulation partner",
    ],

    specialized: [
        "reverse engineering services",
        "value engineering services",
        "failure analysis services",
        "intellectual property development",
    ],

    industries: [
        "automotive engineering services",
        "energy and utilities engineering",
        "industrial equipment engineering",
        "plant engineering services",
        "consumer product engineering",
        "electronics and PCB design services",
    ],

    outsourcing: [
        "outsourced engineering partner USA",
        "offshore engineering services",
        "engineering outsourcing company India",
        "CAD outsourcing services",
        "cost-effective engineering services",
    ],

    careers: ["engineering jobs", "remote engineering jobs", "CAD engineer jobs", "simulation engineer careers"],
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
 * 3. ROOT DEFAULT METADATA — import into app/layout.tsx as `metadata`.
 * ═══════════════════════════════════════════════════════════════════════════ */

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [...keywordSets.brand, ...keywordSets.home, ...keywordSets.services],
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    category: "Engineering Services",
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        url: siteConfig.url,
        locale: siteConfig.locale,
        images: [{ url: siteConfig.ogImageDefault, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        images: [siteConfig.ogImageDefault],
        ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

/* ═══════════════════════════════════════════════════════════════════════════
 * 4. buildMetadata() — per-route metadata. Use inside generateMetadata().
 *    CMS `seo` fields should be passed in; this handles canonical, OG, robots.
 * ═══════════════════════════════════════════════════════════════════════════ */

export interface BuildMetadataArgs {
    title?: string;
    description?: string;
    /** Route path beginning with "/", e.g. "/services/mechanical". */
    path?: string;
    /** Absolute or root-relative OG image; falls back to site default. */
    image?: string;
    imageAlt?: string;
    keywords?: readonly string[];
    /** For blog posts / case studies. */
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    /** Set true for thin/duplicate pages or gated content. */
    noindex?: boolean;
}

export function absoluteUrl(path = "/"): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildMetadata(args: BuildMetadataArgs = {}): Metadata {
    const {
        title,
        description = siteConfig.description,
        path = "/",
        image = siteConfig.ogImageDefault,
        imageAlt = siteConfig.name,
        keywords,
        type = "website",
        publishedTime,
        modifiedTime,
        authorName,
        noindex = false,
    } = args;

    const canonical = absoluteUrl(path);
    const ogImage = absoluteUrl(image);

    return {
        title, // template applies automatically via layout
        description,
        ...(keywords ? { keywords: [...keywords] } : {}),
        alternates: { canonical },
        robots: noindex
            ? { index: false, follow: false }
            : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
        openGraph: {
            type,
            siteName: siteConfig.name,
            title: title ?? siteConfig.defaultTitle,
            description,
            url: canonical,
            locale: siteConfig.locale,
            images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
            ...(type === "article"
                ? {
                    publishedTime,
                    modifiedTime,
                    authors: authorName ? [authorName] : [siteConfig.legalName],
                }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: title ?? siteConfig.defaultTitle,
            description,
            images: [ogImage],
        },
    };
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 5. JSON-LD STRUCTURED DATA BUILDERS
 *    Render each with a <script type="application/ld+json"> tag.
 * ═══════════════════════════════════════════════════════════════════════════ */

type Json = Record<string, unknown>;

/** Organization + ProfessionalService — put on the home page (and/or layout). */
export function organizationSchema(): Json {
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        image: absoluteUrl(siteConfig.ogImageDefault),
        description: siteConfig.description,
        slogan: siteConfig.shortTagline,
        foundingDate: siteConfig.foundingDate,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.contact.address.locality,
            addressRegion: siteConfig.contact.address.region,
            addressCountry: siteConfig.contact.address.country,
        },
        areaServed: siteConfig.areaServed,
        knowsAbout: [
            "Mechanical Engineering",
            "Electrical Engineering",
            "CAD Design",
            "3D Modeling",
            "Finite Element Analysis",
            "Computational Fluid Dynamics",
            "Product Design",
            "Reverse Engineering",
            "Custom Software Development",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            contactType: "sales",
            areaServed: siteConfig.areaServed,
            availableLanguage: ["en"],
        },
        sameAs: siteConfig.sameAs,
    };
}

/** WebSite schema with SearchAction — put in layout or home. */
export function websiteSchema(): Json {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: siteConfig.language,
        potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/blog?q={search_term_string}` },
            "query-input": "required name=search_term_string",
        },
    };
}

export interface ServiceSchemaArgs {
    name: string;
    description: string;
    path: string; // "/services/mechanical-engineering"
    serviceType?: string;
    image?: string;
}

/** Service schema — put on each service detail page. */
export function serviceSchema(a: ServiceSchemaArgs): Json {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: a.name,
        description: a.description,
        serviceType: a.serviceType ?? a.name,
        url: absoluteUrl(a.path),
        ...(a.image ? { image: absoluteUrl(a.image) } : {}),
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: siteConfig.areaServed,
        brand: siteConfig.name,
    };
}

export interface ArticleSchemaArgs {
    title: string;
    description: string;
    path: string;
    image?: string;
    authorName?: string;
    publishedTime: string;
    modifiedTime?: string;
}

/** Article schema — put on each blog post. */
export function articleSchema(a: ArticleSchemaArgs): Json {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.description,
        image: [absoluteUrl(a.image ?? siteConfig.ogImageDefault)],
        datePublished: a.publishedTime,
        dateModified: a.modifiedTime ?? a.publishedTime,
        author: { "@type": a.authorName ? "Person" : "Organization", name: a.authorName ?? siteConfig.legalName },
        publisher: {
            "@type": "Organization",
            name: siteConfig.legalName,
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo) },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.path) },
    };
}

export interface JobPostingSchemaArgs {
    title: string;
    description: string; // HTML/plain description of the role
    datePosted: string;
    validThrough?: string;
    employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY" | "INTERN";
    isRemote?: boolean;
    city?: string;
    region?: string;
    country?: string;
}

/** JobPosting schema — put on each careers detail page. */
export function jobPostingSchema(a: JobPostingSchemaArgs): Json {
    return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: a.title,
        description: a.description,
        datePosted: a.datePosted,
        ...(a.validThrough ? { validThrough: a.validThrough } : {}),
        employmentType: a.employmentType ?? "FULL_TIME",
        hiringOrganization: {
            "@type": "Organization",
            name: siteConfig.legalName,
            sameAs: siteConfig.url,
            logo: absoluteUrl(siteConfig.logo),
        },
        ...(a.isRemote
            ? {
                jobLocationType: "TELECOMMUTE",
                applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
            }
            : {
                jobLocation: {
                    "@type": "Place",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: a.city ?? siteConfig.contact.address.locality,
                        addressRegion: a.region ?? siteConfig.contact.address.region,
                        addressCountry: a.country ?? siteConfig.contact.address.country,
                    },
                },
            }),
    };
}

export interface BreadcrumbItem {
    name: string;
    path: string;
}

/** BreadcrumbList — put on any nested page. */
export function breadcrumbSchema(items: BreadcrumbItem[]): Json {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: absoluteUrl(it.path),
        })),
    };
}

export interface FaqItem {
    question: string;
    answer: string;
}

/** FAQPage — put on pages with an FAQ block (home, service pages). */
export function faqSchema(items: FaqItem[]): Json {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 6. SITEMAP & ROBOTS HELPERS
 *    - staticSitemapRoutes: feed into app/sitemap.ts alongside dynamic CMS routes
 *    - NOINDEX_PATHS: block from robots + sitemap
 * ═══════════════════════════════════════════════════════════════════════════ */

export const NOINDEX_PATHS = ["/admin", "/api"] as const;

export interface SitemapRoute {
    path: string;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
}

/** Static, always-present marketing routes. Merge with CMS-derived routes. */
export const staticSitemapRoutes: SitemapRoute[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
    { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
    { path: "/blog", changeFrequency: "daily", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * Example app/sitemap.ts:
 *
 *   import { MetadataRoute } from "next";
 *   import { siteConfig, staticSitemapRoutes } from "@/lib/seo";
 *   import { getPublishedSlugs } from "@/lib/queries";
 *
 *   export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 *     const now = new Date();
 *     const statics = staticSitemapRoutes.map(r => ({
 *       url: `${siteConfig.url}${r.path}`,
 *       lastModified: now,
 *       changeFrequency: r.changeFrequency,
 *       priority: r.priority,
 *     }));
 *     const [posts, cases, services, industries, jobs] = await Promise.all([
 *       getPublishedSlugs("posts", "/blog"),
 *       getPublishedSlugs("case_studies", "/case-studies"),
 *       getPublishedSlugs("services", "/services"),
 *       getPublishedSlugs("industries", "/industries"),
 *       getPublishedSlugs("jobs", "/careers"),
 *     ]);
 *     return [...statics, ...posts, ...cases, ...services, ...industries, ...jobs];
 *   }
 *
 * Example app/robots.ts:
 *
 *   import { MetadataRoute } from "next";
 *   import { siteConfig, NOINDEX_PATHS } from "@/lib/seo";
 *   export default function robots(): MetadataRoute.Robots {
 *     return {
 *       rules: [{ userAgent: "*", allow: "/", disallow: [...NOINDEX_PATHS] }],
 *       sitemap: `${siteConfig.url}/sitemap.xml`,
 *       host: siteConfig.url,
 *     };
 *   }
 */

/* ═══════════════════════════════════════════════════════════════════════════
 * 7. PER-PAGE METADATA PRESETS (optional convenience for static routes)
 * ═══════════════════════════════════════════════════════════════════════════ */

export const pageMeta = {
    home: (): Metadata =>
        buildMetadata({
            title: undefined, // uses defaultTitle
            description: siteConfig.description,
            path: "/",
            keywords: [...keywordSets.home, ...keywordSets.outsourcing],
        }),
    services: (): Metadata =>
        buildMetadata({
            title: "Managed Engineering Services & Specialist Network",
            description:
                "Explore AproMax Engineering's capabilities: scoping, matching, and delivering mechanical, electrical, CAD design, FEA/CFD simulation, prototyping, and custom software through a vetted specialist network.",
            path: "/services",
            keywords: keywordSets.services,
        }),
    industries: (): Metadata =>
        buildMetadata({
            title: "Industries We Serve",
            description:
                "Automotive, energy & utilities, industrial equipment, plant/process, electronics and consumer products — engineering expertise across industries.",
            path: "/industries",
            keywords: keywordSets.industries,
        }),
    caseStudies: (): Metadata =>
        buildMetadata({
            title: "Case Studies & Projects",
            description: "See how AproMax Engineering solves real engineering challenges — problem, approach, and measurable results.",
            path: "/case-studies",
        }),
    about: (): Metadata =>
        buildMetadata({
            title: "About AproMax Engineering",
            description:
                "AproMax = Approach Maximum. Learn how our managed engineering service coordinates projects globally to deliver concept-to-reality solutions.",
            path: "/about",
            keywords: keywordSets.brand,
        }),
    careers: (): Metadata =>
        buildMetadata({
            title: "Careers",
            description: "Join AproMax Engineering. Explore open engineering, design, and software roles — including remote and contract positions.",
            path: "/careers",
            keywords: keywordSets.careers,
        }),
    blog: (): Metadata =>
        buildMetadata({
            title: "Insights",
            description: "Engineering, design, and simulation insights from the AproMax team.",
            path: "/blog",
        }),
    contact: (): Metadata =>
        buildMetadata({
            title: "Contact Us — Get a Free Consultation",
            description: "Tell us about your project. Request a free consultation. NDA-friendly managed engineering coordination and global specialist delivery.",
            path: "/contact",
        }),
} as const;