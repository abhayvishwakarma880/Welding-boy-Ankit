"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "@/apis/blogs";
import { Clock } from "lucide-react";
import { Blog } from "./BlogsClient";

export default function PopularArticles() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs({ limit: 6 })
      .then((res) => setBlogs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-zinc-50 py-10 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Popular Articles</p>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="shrink-0 w-64 flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden animate-pulse">
                  <div className="w-full h-36 bg-slate-200" />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 w-16 bg-slate-200 rounded-full" />
                    <div className="h-3 w-full bg-slate-200 rounded-full" />
                    <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
                  </div>
                </div>
              ))
            : blogs.map((blog, i) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug || blog._id}`}
                  className="group shrink-0 w-64 flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-full h-36 bg-zinc-100 overflow-hidden">
                    <img src={blog.image?.url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-2 left-2 bg-white/90 text-brand text-[9px] font-bold px-2 py-0.5 rounded-full border border-brand/20">
                      #{i + 1} Popular
                    </span>
                  </div>
                  <div className="p-3 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{blog.category?.name}</span>
                    <p className="text-xs font-bold text-zinc-800 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                      {blog.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{blog.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
