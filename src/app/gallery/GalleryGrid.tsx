"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryItem } from "./galleryData";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered: GalleryItem[] =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const prev = useCallback(() => {
    setLightboxIndex((p) => p !== null ? (p - 1 + filtered.length) % filtered.length : null);
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((p) => p !== null ? (p + 1) % filtered.length : null);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, next, prev]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

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

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {GALLERY_CATEGORIES.map((cat) => (
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

        <p className="text-xs text-slate-400 font-medium mb-5">{filtered.length} projects</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Is category mein abhi koi project nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-sm cursor-pointer group"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-1.5">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-widest">{item.category}</p>
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          <button onClick={prev}
            className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-16">
            <Image
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button onClick={next}
            className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-0 right-0 text-center px-4">
            <p className="text-white font-semibold text-sm">{filtered[lightboxIndex].title}</p>
            <p className="text-white/50 text-xs mt-1">{filtered[lightboxIndex].category}</p>
          </div>

          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
            {filtered.map((_, i) => (
              <button key={i} onClick={() => setLightboxIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === lightboxIndex ? "w-5 h-1.5 bg-brand" : "w-1.5 h-1.5 bg-white/30"}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
