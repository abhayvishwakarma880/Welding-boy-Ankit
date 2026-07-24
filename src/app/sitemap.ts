import type { MetadataRoute } from "next";
import { SERVICES } from "@/app/services/servicesData";
import { GALLERY_ITEMS } from "@/app/gallery/galleryData";
import { articles } from "@/app/blogs/blogData";

const BASE_URL = "https://vishwakarmawelding.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services`,lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/videos`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/blogs`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/products`,lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // ── Service pages ─────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Gallery items (image URLs for Google Images indexing) ─────
  const galleryPages: MetadataRoute.Sitemap = GALLERY_ITEMS.map((g) => ({
    url: `${BASE_URL}/gallery`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // ── Blog / Article pages ──────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.isoDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Video page ────────────────────────────────────────────────
  const videoPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/videos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...servicePages,
    ...galleryPages,
    ...blogPages,
    ...videoPages,
  ];
}
