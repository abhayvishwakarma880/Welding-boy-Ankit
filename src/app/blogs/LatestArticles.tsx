import { Article } from "./blogData";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: Article[];
  activeCategory: string;
};

export default function LatestArticles({ articles, activeCategory }: Props) {
  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-brand inline-block" />
          <p className="text-sm font-bold text-zinc-700 uppercase tracking-wider">
            {activeCategory === "All" ? "Latest Articles" : activeCategory}
          </p>
          <span className="ml-auto text-xs text-zinc-400 font-medium">{filtered.length} articles</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Is category mein abhi koi article nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
