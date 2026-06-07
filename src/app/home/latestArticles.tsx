"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "How to Choose the Right Metal for Your Gate",
    description: "A complete guide to selecting between wrought iron, mild steel, and stainless steel for residential gates.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80",
    date: "June 12, 2025",
  },
  {
    id: 2,
    title: "Top 5 Welding Techniques for Strong Fabrication",
    description: "Explore the most reliable welding methods used in heavy-duty structural and decorative metalwork.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80",
    date: "May 28, 2025",
  },
  {
    id: 3,
    title: "Why Powder Coating Outperforms Regular Paint",
    description: "Understand the durability, finish quality, and cost benefits of powder coating over traditional painting.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&q=80",
    date: "May 10, 2025",
  },
  {
    id: 4,
    title: "Safety Tips for Installing Window Grills",
    description: "Key considerations for properly installing window grills to ensure safety without compromising aesthetics.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80",
    date: "April 22, 2025",
  },
  {
    id: 5,
    title: "Modern Railing Design Trends in 2025",
    description: "Discover the latest trends in balcony and staircase railings — from minimalist steel to glass-steel combos.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop&q=80",
    date: "April 5, 2025",
  },
  {
    id: 6,
    title: "Maintaining Iron Furniture for Longevity",
    description: "Simple maintenance routines to keep your iron garden furniture rust-free and looking great year-round.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop&q=80",
    date: "March 18, 2025",
  },
];

export default function LatestArticles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsMouseDown(true);
    setIsDragging(false);
    el.style.scrollBehavior = "auto";
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftVal.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    const el = scrollContainerRef.current;
    if (el) el.style.scrollBehavior = "smooth";
  };

  const handleMouseUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    const el = scrollContainerRef.current;
    if (el) el.style.scrollBehavior = "smooth";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setIsDragging(true);
    el.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsDragging(false);
    el.style.scrollBehavior = "auto";
    startX.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftVal.current = el.scrollLeft;
  };

  const handleTouchEnd = () => {
    if (!isDown.current) return;
    isDown.current = false;
    const el = scrollContainerRef.current;
    if (el) el.style.scrollBehavior = "smooth";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setIsDragging(true);
    el.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const checkScrollStatus = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const leftScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowLeftArrow(leftScroll > 5);
    setShowRightArrow(leftScroll < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollStatus);
      checkScrollStatus();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollStatus);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -330 : 330;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-slate-50 relative py-10 px-6 md:px-12 overflow-hidden font-sans border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Accent line */}
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
        </div>

        {/* Slider Area */}
        <div className="relative group px-1">
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Previous Articles"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Next Articles"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {/* Cards */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className={`flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 transition-opacity duration-300 cursor-grab active:cursor-grabbing select-none ${
              isMouseDown ? "" : "snap-x snap-mandatory"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            {articlesData.map((article) => (
              <div
                key={article.id}
                className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center group/card transition-all duration-300 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/30 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 mb-2">
                    <CalendarDays className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-2 group-hover/card:text-brand transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {article.description}
                  </p>

                  <div className="h-[1px] bg-slate-100 my-4" />

                  <Link
                    href="/blog"
                    onClick={handleLinkClick}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-brand/30"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {articlesData.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollContainerRef.current;
                  if (el) el.scrollTo({ left: i * 330, behavior: "smooth" });
                }}
                className="w-8 h-3 flex items-center justify-center group/dot focus:outline-none"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-200 group-hover/dot:bg-brand/50 transition-all duration-300 group-hover/dot:w-3 group-hover/dot:h-3" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
