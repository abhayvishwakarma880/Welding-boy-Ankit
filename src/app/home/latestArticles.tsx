"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { articles, type Article } from "@/app/blogs/blogData";

const DISPLAY = articles.slice(0, 6);

export default function LatestArticles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft]   = useState(false);
  const [showRight, setShowRight] = useState(true);
  const isDown      = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsDragging(false);
    el.style.scrollBehavior = "auto";
    startX.current  = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (scrollContainerRef.current) scrollContainerRef.current.style.scrollBehavior = "smooth";
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const walk = (e.pageX - el.offsetLeft - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setIsDragging(true);
    el.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (dir: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({ left: dir === "left" ? -330 : 330, behavior: "smooth" });
  };

  return (
    <section className="bg-slate-50 relative py-10 px-6 md:px-12 overflow-hidden font-sans border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100">
      <div className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Latest{" "}
            <span className="text-brand relative">
              Articles
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand/20 -z-10 rounded-full" />
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Tips, guides, and insights from our fabrication and welding experts.
          </p>
          <Link href="/blogs"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full border border-brand text-brand text-sm font-semibold transition-all duration-300 group hover:bg-brand">
            <span className="group-hover:text-white transition-colors duration-300">View All Blogs</span>
            <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>

        {/* Slider */}
        <div className="relative group px-1">
          {showLeft && (
            <button onClick={() => scroll("left")}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100">
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}
          {showRight && (
            <button onClick={() => scroll("right")}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100">
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
          >
            {DISPLAY.map((article: Article) => (
              <div key={article.slug}
                className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center group/card transition-all duration-300 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/30 hover:-translate-y-1.5 flex flex-col">
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                    sizes="310px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 mb-2">
                    <span className="text-brand font-bold uppercase tracking-wider">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 line-clamp-2 group-hover/card:text-brand transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {article.seoDescription || article.description}
                  </p>

                  <div className="h-[1px] bg-slate-100 my-4" />

                  <Link
                    href={`/blog/${article.slug}`}
                    onClick={(e) => isDragging && e.preventDefault()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-brand/30"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {DISPLAY.map((_, i) => (
              <button key={i}
                onClick={() => scrollContainerRef.current?.scrollTo({ left: i * 330, behavior: "smooth" })}
                className="w-8 h-3 flex items-center justify-center focus:outline-none"
                aria-label={`Go to slide ${i + 1}`}>
                <span className="w-2 h-2 rounded-full bg-slate-200 hover:bg-brand/50 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
