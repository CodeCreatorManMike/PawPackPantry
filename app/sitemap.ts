import type { MetadataRoute } from "next";

const BASE_URL = "https://www.pawpackpantry.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/streetsmart", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
