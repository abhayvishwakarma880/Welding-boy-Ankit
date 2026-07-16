import { MetadataRoute } from "next";

const BASE_URL = "https://vishwakarmawelding.in";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

// ── Fetch all published blog slugs for sitemap ───────────────────
async function getAllBlogSlugs(): Promise<
  { slug: string; updatedAt?: string; createdAt?: string }[]
> {
  try {
    const res = await fetch(`${API_BASE}/blog/published?page=1&limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: { slug?: string; _id: string; updatedAt?: string; createdAt?: string }[] =
      json?.data ?? [];
    return blogs
      .filter((b) => b.slug)
      .map((b) => ({
        slug: b.slug as string,
        updatedAt: b.updatedAt,
        createdAt: b.createdAt,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static Pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ── Dynamic Blog Pages ────────────────────────────────────────
  const blogs = await getAllBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.updatedAt
      ? new Date(blog.updatedAt)
      : blog.createdAt
      ? new Date(blog.createdAt)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}