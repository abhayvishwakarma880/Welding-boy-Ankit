import Link from "next/link";
import Image from "next/image";
import { Article } from "./blogData";

export default function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className="group flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative w-full h-44 bg-zinc-100 shrink-0">
        <Image
          src={a.image}
          alt={a.title}
          fill
          className="object-cover"
          unoptimized
        />
        <span className="absolute top-2 left-2 bg-brand text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {a.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-extrabold text-zinc-900 leading-snug group-hover:text-brand transition-colors line-clamp-2">
          {a.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1">{a.description}</p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
            <span>{a.date}</span>
            <span>·</span>
            <span>{a.readTime} Read</span>
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
  );
}
