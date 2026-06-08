"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems } from "./galleryData";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : activeCategory === "Recent Projects"
      ? galleryItems.filter((item) => item.recent)
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-slate-50 py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recent Work <span className="text-brand">Showcase</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Har project humare workmanship, quality standards aur customer satisfaction ke prati commitment ko darshata hai.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand hover:text-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-slate-400 font-medium mb-5">{filtered.length} projects</p>

        {/* Grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Image — fixed height, always visible */}
              <div className="relative w-full h-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content — always visible */}
              <div className="p-3 flex flex-col gap-1.5">
                <p className="text-[10px] font-bold text-brand uppercase tracking-widest">
                  {item.category}
                </p>
                <h3 className="text-xs font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
