"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs, addComment } from "@/apis/blogs";
import { CalendarDays, Clock, ChevronRight, Search } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

interface RelatedBlog {
  _id: string;
  title: string;
  image: { url: string };
  slug: string;
  readTime: number;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: { url: string };
  slug: string;
  createdAt: string;
  readTime: number;
  tags: string[];
  category: { _id: string; name: string };
  relatedBlogs: RelatedBlog[];
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// ── Share Buttons ──────────────────────────────────────────────
function ShareButtons({ title }: { title: string }) {
  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const share = {
    whatsapp: () =>
      window.open(
        `https://wa.me/?text=${encodeURIComponent(title + " " + getUrl())}`,
        "_blank"
      ),
    facebook: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
        "_blank"
      ),
    instagram: () =>
      navigator.clipboard
        .writeText(getUrl())
        .then(() => alert("Link copied! Paste it on Instagram.")),
  };

  return (
    <div className="flex items-center gap-2 shrink-0 mt-1">
      <button
        onClick={share.whatsapp}
        title="Share on WhatsApp"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 active:scale-95"
      >
        <FaWhatsapp className="w-4 h-4" />
      </button>
      <button
        onClick={share.facebook}
        title="Share on Facebook"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 active:scale-95"
      >
        <FaFacebook className="w-4 h-4" />
      </button>
      <button
        onClick={share.instagram}
        title="Copy link for Instagram"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 hover:opacity-90 text-white transition-all hover:scale-110 active:scale-95"
      >
        <FaInstagram className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Comment Section ─────────────────────────────────────────────
function CommentSection({ blogId }: { blogId: string }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      setSubmitting(true);
      await addComment(blogId, comment.trim());
      setComment("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <h3 className="text-base font-bold text-slate-800 mb-4">
        Post a Comment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand focus:bg-white transition-colors resize-none"
        />
        <div className="flex items-center justify-between">
          {submitted && (
            <span className="text-xs text-green-600 font-medium">
              Comment posted successfully!
            </span>
          )}
          <button
            type="submit"
            disabled={submitting || !comment.trim()}
            className="ml-auto px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-all active:scale-95"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Sidebar — Search + Related ───────────────────────────────────
function BlogSidebar({
  blog,
  initialRelated,
}: {
  blog: Blog;
  initialRelated: RelatedBlog[];
}) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<RelatedBlog[]>([]);
  const [searching, setSearching] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState<RelatedBlog[]>(initialRelated);

  // Load recent if not passed
  useEffect(() => {
    if (initialRelated.length === 0) {
      getBlogs({ limit: 5 })
        .then((res) => setRecentBlogs(res.data || []))
        .catch(() => {});
    }
  }, [initialRelated]);

  // Search with debounce
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(() => {
      setSearching(true);
      getBlogs({ limit: 6, search })
        .then((res) => setSearchResults(res.data || []))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false));
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const relatedToShow = blog.relatedBlogs?.length
    ? blog.relatedBlogs
    : recentBlogs.filter((b) => b._id !== blog._id).slice(0, 4);

  return (
    <div className="w-full lg:w-[320px] shrink-0">
      <div className="sticky top-17 space-y-6">
        {/* Search */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            Search Articles
          </h3>
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
              {searching ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-slate-200 rounded-lg animate-pulse"
                  />
                ))
              ) : searchResults.length ? (
                searchResults.map((b) => (
                  <Link
                    key={b._id}
                    href={`/blog/${b.slug || b._id}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all group"
                  >
                    <img
                      src={b.image?.url}
                      alt={b.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <p className="text-xs font-medium text-slate-700 line-clamp-2 group-hover:text-brand transition-colors">
                      {b.title}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-2">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Related / Recent Blogs */}
        {relatedToShow.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4">
              {blog.relatedBlogs?.length ? "Related Blogs" : "Recent Blogs"}
            </h3>
            <div className="space-y-4">
              {relatedToShow.map((rb) => (
                <Link
                  key={rb._id}
                  href={`/blog/${rb.slug || rb._id}`}
                  className="flex gap-3 group"
                >
                  <img
                    src={rb.image?.url}
                    alt={rb.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                      {rb.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                      <CalendarDays className="w-3 h-3" />
                      <span>{fmtDate(rb.createdAt)}</span>
                      <span>•</span>
                      <span>{rb.readTime} min</span>
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

// ── Main Client Component ────────────────────────────────────────
export default function BlogDetailClient({ blog }: { blog: Blog }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/blogs"
              className="hover:text-brand transition-colors"
            >
              Blogs
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-medium">{blog.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── LEFT: Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Category + Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {blog.category?.name && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand/10 text-brand uppercase tracking-wide">
                  {blog.category.name}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{fmtDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>

            {/* Title + Share */}
            <div className="flex items-start justify-between gap-4 mb-6">
              {/* h1 — rendered server-side via server component, this is only visual duplication for client interactivity */}
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {blog.title}
              </h1>
              <ShareButtons title={blog.title} />
            </div>

            {/* Image */}
            <div className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-sm">
              <img
                src={blog.image?.url}
                alt={blog.title}
                className="w-full max-h-[480px] object-cover"
              />
            </div>

            {/* Content */}
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">
                  Tags:
                </span>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-brand/10 hover:text-brand transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comment Section */}
            <CommentSection blogId={blog._id} />
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <BlogSidebar blog={blog} initialRelated={blog.relatedBlogs || []} />
        </div>
      </div>
    </div>
  );
}
