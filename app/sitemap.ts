import type { MetadataRoute } from "next";

const siteUrl = "https://www.mellasia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/izrada-web-stranica-zagreb`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
