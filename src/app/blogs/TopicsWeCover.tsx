"use client";

import { topics } from "./blogData";

type Props = {
  onCategoryChange: (cat: string) => void;
};

export default function TopicsWeCover({ onCategoryChange }: Props) {
  return (
    <section className="bg-white py-12 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Topics
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">
            Topics We <span className="text-brand">Cover</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((t) => (
            <button
              key={t.name}
              onClick={() => onCategoryChange(t.category)}
              className="flex flex-col items-center text-center gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-brand hover:bg-brandBG-icon transition-all duration-200 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-brandBG-icon flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-800">{t.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
