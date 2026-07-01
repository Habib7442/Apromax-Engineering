import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://apromaxeng.com").replace(/\/$/, "");

  const routes = [
    "",
    "/about",
    "/services",
    "/services/engineering",
    "/services/design",
    "/services/web-app",
    "/services/analysis",
    "/services/prototyping",
    "/services/specialized",
    "/industries",
    "/careers",
    "/contact",
    "/book",
    "/privacy-policy",
    "/terms-of-service"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));
}
