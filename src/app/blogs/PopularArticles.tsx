import Link from "next/link";
import Image from "next/image";
import { popularArticles } from "./blogData";

export default function PopularArticles() {
  return (
    <section className="bg-zinc-50 py-10 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Popular Articles</p>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {popularArticles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group shrink-0 w-64 flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200"
            >
              <div className="relative w-full h-36 bg-zinc-100">
                <Image src={a.image} alt={a.title} fill className="object-cover" unoptimized />
                <span className="absolute top-2 left-2 bg-white/90 text-brand text-[9px] font-bold px-2 py-0.5 rounded-full border border-brand/20">
                  #{i + 1} Popular
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{a.category}</span>
                <p className="text-xs font-bold text-zinc-800 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                  {a.title}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">{a.readTime} Read</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
