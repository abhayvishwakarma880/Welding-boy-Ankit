import Link from "next/link";
import { Blog } from "./BlogsClient";
import { CalendarDays, Clock } from "lucide-react";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

type Props = {
  blogs: Blog[];
  loading: boolean;
  page: number;
  totalPages: number;
  onLoadMore: () => void;
};

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-slate-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-20 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-200 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
        <div className="h-[1px] bg-slate-100 my-1" />
        <div className="flex justify-between">
          <div className="h-3 w-24 bg-slate-200 rounded-full" />
          <div className="h-3 w-10 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function LatestArticles({ blogs, loading, page, totalPages, onLoadMore }: Props) {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Latest Articles</p>
          {!loading && <span className="ml-auto text-xs text-zinc-400 font-medium">{blogs.length} articles</span>}
        </div>

        {loading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Is category mein abhi koi article nahi hai.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug || blog._id}`}
                  className="group flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-full h-44 bg-zinc-100 overflow-hidden shrink-0">
                    <img src={blog.image?.url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-2 left-2 bg-brand text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {blog.category?.name}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-sm font-extrabold text-zinc-900 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1"
                      dangerouslySetInnerHTML={{ __html: blog.description.replace(/<[^>]*>/g, "").slice(0, 120) }}
                    />
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                        <CalendarDays className="w-3 h-3" />
                        <span>{fmtDate(blog.createdAt)}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime} min</span>
                      </div>
                      <span className="text-[11px] font-bold text-brand flex items-center gap-0.5">
                        Read
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {page < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={onLoadMore}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-full border border-brand text-brand text-sm font-semibold hover:bg-brand hover:!text-white transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
