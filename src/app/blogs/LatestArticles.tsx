import Link from "next/link";
import Image from "next/image";
import { type Article } from "./blogData";

type Props = {
  articles: Article[];
  onCategoryChange: (cat: string) => void;
};

export default function LatestArticles({ articles, onCategoryChange }: Props) {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Latest Articles</p>
          <span className="ml-auto text-xs text-zinc-400 font-medium">{articles.length} articles</span>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Is category mein abhi koi article nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200"
              >
                <div className="relative w-full h-44 bg-zinc-100 overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-2 left-2 bg-brand text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-extrabold text-zinc-900 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime} read</span>
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
        )}
      </div>
    </section>
  );
}
