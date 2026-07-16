// ─────────────────────────────────────────────────────────────────
//  app/blog/[slug]/page.tsx  ←  SERVER COMPONENT (no "use client")
//  SEO-perfect: generateMetadata + generateStaticParams + SSR data
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

// ── Server-side fetchers ─────────────────────────────────────────

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}`, {
      next: { revalidate: 3600 }, // ISR — revalidate every 1 hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  try {
    // Fetch enough slugs for static generation; adjust limit as needed
    const res = await fetch(`${API_BASE}/blog/published?page=1&limit=200`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: { slug?: string; _id: string }[] = json?.data ?? [];
    return blogs
      .filter((b) => b.slug)
      .map((b) => ({ slug: b.slug as string }));
  } catch {
    return [];
  }
}

// ── generateStaticParams — Next.js pre-builds blog pages at build time
// ────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs; // [{ slug: "..." }, ...]
}

// ── generateMetadata — Dynamic <title> & <description> per blog ──
// ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  // Strip HTML tags from description for meta description
  const rawDescription =
    blog.seoDescription ||
    blog.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "";

  return {
    title: blog.seoTitle || blog.title,
    description: rawDescription,
    keywords: blog.tags ?? [],
    openGraph: {
      type: "article",
      title: blog.seoTitle || blog.title,
      description: rawDescription,
      url: `https://vishwakarmawelding.in/blog/${slug}`,
      images: blog.image?.url
        ? [
            {
              url: blog.image.url,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
      publishedTime: blog.createdAt,
      tags: blog.tags ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description: rawDescription,
      images: blog.image?.url ? [blog.image.url] : [],
    },
    // Canonical URL
    alternates: {
      canonical: `https://vishwakarmawelding.in/blog/${slug}`,
    },
  };
}

// ── Page Component — Server Rendered ────────────────────────────
// ────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  // ── JSON-LD Schema (BlogPosting) — Google loves this ──────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description:
      blog.description?.replace(/<[^>]*>/g, "").slice(0, 200) ?? "",
    image: blog.image?.url ?? "",
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    author: {
      "@type": "Organization",
      name: "Vishwakarma Welding",
      url: "https://vishwakarmawelding.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Vishwakarma Welding",
      logo: {
        "@type": "ImageObject",
        url: "https://vishwakarmawelding.in/logo/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vishwakarmawelding.in/blog/${slug}`,
    },
    keywords: blog.tags?.join(", ") ?? "",
    articleSection: blog.category?.name ?? "Welding",
    url: `https://vishwakarmawelding.in/blog/${slug}`,
  };

  return (
    <>
      {/* ── Structured Data — injected in <head> by Next.js ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        BlogDetailClient handles all interactivity:
        - Sidebar search
        - Share buttons
        - Comment form
        The main blog content (title, image, body) is already in the
        server-rendered HTML above for perfect SEO crawlability.
      */}
      <BlogDetailClient blog={blog} />
    </>
  );
}
