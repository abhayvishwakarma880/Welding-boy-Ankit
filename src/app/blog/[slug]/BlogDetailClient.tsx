"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { type Article, articles } from "@/app/blogs/blogData";

// ── Share Buttons ──────────────────────────────────────────────
function ShareButtons({ title }: { title: string }) {
  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const share = {
    whatsapp: () =>
      window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + getUrl())}`, "_blank"),
    facebook: () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank"),
    instagram: () =>
      navigator.clipboard.writeText(getUrl()).then(() => alert("Link copied! Paste it on Instagram.")),
  };

  return (
    <div className="flex items-center gap-2 shrink-0 mt-1">
      <button onClick={share.whatsapp} title="Share on WhatsApp"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 active:scale-95">
        <FaWhatsapp className="w-4 h-4" />
      </button>
      <button onClick={share.facebook} title="Share on Facebook"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 active:scale-95">
        <FaFacebook className="w-4 h-4" />
      </button>
      <button onClick={share.instagram} title="Copy link for Instagram"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 hover:opacity-90 text-white transition-all hover:scale-110 active:scale-95">
        <FaInstagram className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────
function BlogSidebar({ related }: { related: Article[] }) {
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return articles
      .filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
      .slice(0, 6);
  }, [search]);

  return (
    <div className="w-full lg:w-[320px] shrink-0">
      <div className="sticky top-17 space-y-6">
        {/* Search */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Search Articles</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          {search.trim() && (
            <div className="mt-3 space-y-2">
              {searchResults.length ? (
                searchResults.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all group">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={a.image} alt={a.title} fill className="object-cover" sizes="40px" />
                    </div>
                    <p className="text-xs font-medium text-slate-700 line-clamp-2 group-hover:text-brand transition-colors">
                      {a.title}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-2">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Related Articles</h3>
            <div className="space-y-4">
              {related.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="flex gap-3 group">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={a.image} alt={a.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                      {a.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                      <span>{a.date}</span>
                      <span>•</span>
                      <span>{a.readTime} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function BlogDetailClient({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blogs" className="hover:text-brand transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-medium">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Main Content */}
          <div className="flex-1 min-w-0">
            {/* Category + Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand/10 text-brand uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-xs text-slate-400">{article.date}</span>
              <span className="text-xs text-slate-400">· {article.readTime} read</span>
            </div>

            {/* Title + Share */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {article.title}
              </h1>
              <ShareButtons title={article.title} />
            </div>

            {/* Cover Image */}
            <div className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={800}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>

            {/* Content */}
            <div
              className="ck-content prose prose-zinc max-w-none"
              dangerouslySetInnerHTML={{ __html: article.fullContent || article.description }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Tags:</span>
                {article.tags.map((tag) => (
                  <span key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-brand/10 hover:text-brand transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <BlogSidebar related={related} />
        </div>
      </div>
    </div>
  );
}
