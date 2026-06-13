import Link from "next/link";
import Image from "next/image";
import { featuredArticle } from "./blogData";

export default function FeaturedArticle() {
  const a = featuredArticle;
  return (
    <section className="bg-zinc-50 py-10 px-4 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Featured Article</p>
        </div>

        <Link href={`/blog/${a.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-brand hover:shadow-lg transition-all duration-300">
          {/* Image */}
          <div className="relative w-full h-56 md:h-full min-h-[240px] bg-zinc-100">
            <Image
              src={a.image}
              alt={a.title}
              fill
              className="object-cover"
              unoptimized
            />
            <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {a.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <span>{a.date}</span>
              <span>·</span>
              <span>{a.readTime} Read</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 leading-snug group-hover:text-brand transition-colors">
              {a.title}
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">{a.description}</p>
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
