// ─────────────────────────────────────────────────────────────────
//  app/blogs/page.tsx  ←  SERVER COMPONENT (no "use client")
//  Initial blogs fetched on server → HTML me blogs SEO ke liye
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Welding & Fabrication Blog | Vishwakarma Welding Shop",
  description:
    "Expert articles on welding, fabrication, iron gates, steel railings, window grills and metal work in Kushinagar, Uttar Pradesh. Tips, guides and industry insights.",
  keywords: [
    "welding blog",
    "fabrication tips",
    "iron gate design",
    "steel railing kushinagar",
    "welding guide hindi",
    "metal fabrication articles",
  ],
  openGraph: {
    type: "website",
    title: "Welding & Fabrication Blog | Vishwakarma Welding Shop",
    description:
      "Expert articles on welding, fabrication, gates, grills, railings and industrial metal work.",
    url: "https://vishwakarmawelding.in/blogs",
  },
  alternates: {
    canonical: "https://vishwakarmawelding.in/blogs",
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function getInitialBlogs() {
  try {
    const res = await fetch(`${API_BASE}/blog/published?page=1&limit=9`, {
      next: { revalidate: 1800 }, // ISR — revalidate every 30 min
    });
    if (!res.ok) return { data: [], pagination: { totalPages: 1 } };
    return res.json();
  } catch {
    return { data: [], pagination: { totalPages: 1 } };
  }
}

export default async function BlogsPage() {
  const initialData = await getInitialBlogs();

  return (
    <BlogsClient
      initialBlogs={initialData.data || []}
      initialTotalPages={initialData.pagination?.totalPages || 1}
    />
  );
}
