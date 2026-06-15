"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { getGallery } from "@/apis/gallery";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  image: { url: string };
  category: { _id: string; name: string } | null;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-slate-200" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const fetchGallery = useCallback(async (pg: number, reset = false) => {
    try {
      setLoading(true);
      const res = await getGallery({ page: pg, limit: 20 });
      const data: GalleryItem[] = res.data || [];

      if (reset) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }

      setTotalPages(res.pagination?.totalPages || 1);

      // derive unique categories from all fetched items (only on first load)
      if (reset) {
        const cats = Array.from(
          new Set(data.map((i) => i.category?.name).filter(Boolean))
        ) as string[];
        setCategories(["All", ...cats]);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery(1, true);
  }, [fetchGallery]);

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category?.name === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, next, prev]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
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
          {categories.map((cat) => (
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

        {!loading && <p className="text-xs text-slate-400 font-medium mb-5">{filtered.length} projects</p>}

        {/* Grid */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Is category mein abhi koi project nahi hai.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item, index) => (
              <div
                key={item._id}
                className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-sm cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={item.image?.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-1.5">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-widest">{item.category?.name}</p>
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && page < totalPages && activeCategory === "All" && (
          <div className="text-center mt-8">
            <button
              onClick={() => { const next = page + 1; setPage(next); fetchGallery(next, false); }}
              className="px-6 py-2.5 rounded-full border border-brand text-brand text-sm font-semibold hover:bg-brand hover:!text-white transition-all duration-300"
            >
              Load More
            </button>
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
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          <button
            onClick={prev}
            className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-16">
            <Image
              src={filtered[lightboxIndex].image?.url}
              alt={filtered[lightboxIndex].title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <button
            onClick={next}
            className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-0 right-0 text-center px-4">
            <p className="text-white font-semibold text-sm">{filtered[lightboxIndex].title}</p>
            <p className="text-white/50 text-xs mt-1">{filtered[lightboxIndex].category?.name}</p>
          </div>

          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === lightboxIndex ? "w-5 h-1.5 bg-brand" : "w-1.5 h-1.5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
