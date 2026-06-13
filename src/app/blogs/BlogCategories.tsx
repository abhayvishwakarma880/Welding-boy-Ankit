"use client";

import { categories } from "./blogData";

type Props = {
  active: string;
  onChange: (cat: string) => void;
};

export default function BlogCategories({ active, onChange }: Props) {
  return (
    <section className="bg-white py-5 px-4 border-b border-zinc-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap
                ${active === cat
                  ? "bg-brand text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-brandBG-icon hover:text-brand"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
