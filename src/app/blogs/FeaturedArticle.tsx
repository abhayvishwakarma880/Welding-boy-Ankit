import Link from "next/link";
import { Blog } from "./BlogsClient";
import { CalendarDays, Clock } from "lucide-react";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function FeaturedArticle({ blog, loading }: { blog: Blog | null; loading: boolean }) {
  if (loading) {
    return (
      <section className="bg-zinc-50 py-10 px-4 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-5 rounded-full bg-brand inline-block" />
            <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Featured Article</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-zinc-200 rounded-2xl overflow-hidden animate-pulse">
            <div className="w-full h-56 md:h-72 bg-slate-200" />
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="h-3 w-24 bg-slate-200 rounded-full" />
              <div className="h-6 w-full bg-slate-200 rounded-full" />
              <div className="h-6 w-3/4 bg-slate-200 rounded-full" />
              <div className="h-3 w-full bg-slate-200 rounded-full" />
              <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) return null;

  return (
    <section className="bg-zinc-50 py-10 px-4 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Featured Article</p>
        </div>

        <Link href={`/blog/${blog.slug || blog._id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-brand hover:shadow-lg transition-all duration-300">
          <div className="relative w-full h-56 md:h-full min-h-[240px] bg-zinc-100 overflow-hidden">
            <img src={blog.image?.url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {blog.category?.name}
            </span>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{fmtDate(blog.createdAt)}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min read</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 leading-snug group-hover:text-brand transition-colors">
              {blog.title}
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blog.description.replace(/<[^>]*>/g, "").slice(0, 180) + "..." }}
            />
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand">
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
