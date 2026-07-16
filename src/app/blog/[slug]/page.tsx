import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/app/blogs/blogData";
import BlogDetailClient from "./BlogDetailClient";

const BASE_URL = "https://vishwakarmawelding.in";

// HTML tags strip karke plain text nikalo
const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160);

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return { title: "Blog Not Found" };

  const metaDesc = article.seoDescription || stripHtml(article.description);

  return {
    title: `${article.title} | Vishwakarma Welding Works`,
    description: metaDesc,
    keywords: article.tags ?? [article.category, "welding", "fabrication", "kushinagar"],
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: article.title,
      description: metaDesc,
      url: `${BASE_URL}/blog/${slug}`,
      images: [{ url: `${BASE_URL}${article.image}`, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.isoDate,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: metaDesc,
      images: [`${BASE_URL}${article.image}`],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription || stripHtml(article.description),
    image: `${BASE_URL}${article.image}`,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: {
      "@type": "Organization",
      name: "Vishwakarma Welding Works",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Vishwakarma Welding Works",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
    keywords: article.tags?.join(", ") ?? article.category,
    articleSection: article.category,
    url: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient article={article} related={related} />
    </>
  );
}
