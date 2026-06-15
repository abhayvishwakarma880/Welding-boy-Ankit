"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Heart } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/apis/products";
import useCategoryStore from "@/store/useCategoryStore";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  mainImage: { url: string };
  category: { _id: string; name: string };
}

export default function PopularWorks() {
  const { categories } = useCategoryStore();
  const [activeTab, setActiveTab] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isSwitched, setIsSwitched] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // pehli category default set karo
  useEffect(() => {
    if (categories.length && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories]);

  // activeTab badalne par products fetch karo
  useEffect(() => {
    if (!activeTab) return;
    setLoadingProducts(true);
    setIsSwitched(true);
    getProducts({ limit: 5, category: activeTab })
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => { setIsSwitched(false); setLoadingProducts(false); });

    const el = scrollContainerRef.current;
    if (el) { el.scrollLeft = 0; setShowLeftArrow(false); setShowRightArrow(true); }
  }, [activeTab]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDown.current = true;
    setIsMouseDown(true);
    setIsDragging(false);
    
    // Disable smooth scroll during drag for instant responsiveness
    el.style.scrollBehavior = "auto";
    
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftVal.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsMouseDown(false);
    
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    
    el.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) return;
    setWishlist((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  // Check scroll positions to show/hide navigation arrows
  const checkScrollStatus = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    // Allow a buffer of 5px for precision errors
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
    return () => { if (el) el.removeEventListener("scroll", checkScrollStatus); };
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    const cardWidth = 330; // approx card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-slate-50 relative py-10 px-6 md:px-12 overflow-hidden font-sans border border-slate-200/80 rounded-md max-w-7xl mx-4 md:mx-8 xl:mx-auto my-16 shadow-md shadow-slate-100">
      {/* Background visual element: grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Visual Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3.5px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Heading Area --- */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Popular <span className="text-brand relative">Works
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand/20 -z-10 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explore our state-of-the-art designs made with precise welding, premium materials, and flawless finishes.
          </p>
        </div>

        {/* --- Tabs Switcher --- */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-md max-w-full overflow-x-auto scrollbar-none gap-1 shrink-0">
            {categories.map((cat) => {
              const isActive = activeTab === cat._id;
              return (
                <button
                  key={cat._id}
                  onClick={() => setActiveTab(cat._id)}
                  className={`flex items-center gap-2.5 px-4 md:px-6 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap outline-none cursor-pointer ${
                    isActive
                      ? "bg-brand text-white shadow-md shadow-brand/20 scale-105"
                      : "text-slate-600 hover:text-brand hover:bg-brand/5"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Product Slider Area --- */}
        <div className="relative group px-1">
          {/* Slide Buttons - Desktop Only */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Previous Products"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-brand border border-slate-200 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Next Products"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {/* Cards Horizontal Container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto ${
              isMouseDown ? "" : "snap-x snap-mandatory"
            } scrollbar-none pb-6 pt-2 transition-opacity duration-300 cursor-grab active:cursor-grabbing select-none ${
              isSwitched ? "opacity-30" : "opacity-100"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            {loadingProducts
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center flex flex-col animate-pulse">
                    <div className="aspect-[4/3] w-full bg-slate-200" />
                    <div className="p-5 flex flex-col gap-3">
                      <div className="h-3 w-20 bg-slate-200 rounded-full" />
                      <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                      <div className="h-3 w-full bg-slate-200 rounded-full" />
                      <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
                      <div className="h-[1px] bg-slate-100 my-1" />
                      <div className="h-4 w-1/3 bg-slate-200 rounded-full" />
                      <div className="flex gap-2 mt-1">
                        <div className="h-9 flex-1 bg-slate-200 rounded-md" />
                        <div className="h-9 w-24 bg-slate-200 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))
              : products.map((p) => (
              <div
                key={p._id}
                className="flex-none w-[280px] md:w-[310px] bg-white border border-slate-200/70 rounded-md overflow-hidden snap-center group/card transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5 hover:border-orange-200 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={p.mainImage?.url}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-brand tracking-wider mb-2">
                    <Tag className="w-3 h-3" />
                    <span>{p.category?.name}</span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-1 group-hover/card:text-brand transition-colors duration-200">
                    {p.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                    {p.description}
                  </p>

                  <div className="h-[1px] bg-slate-100 my-4" />

                  <div className="mt-auto space-y-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">Price</p>
                      <p className="text-base font-extrabold text-slate-900 mt-1">
                        ₹{(p.price - (p.price * (p.discount || 0)) / 100).toLocaleString("en-IN")}
                        {p.discount > 0 && (
                          <span className="ml-2 text-xs line-through text-slate-400 font-normal">₹{p.price.toLocaleString("en-IN")}</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/product/${p._id}`}
                        onClick={handleLinkClick}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-brand/30 active:scale-95"
                      >
                        <span>View Product</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={(e) => toggleWishlist(p._id, e)}
                        className={`inline-flex items-center justify-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer select-none group/wishlist-btn ${
                          wishlist.includes(p._id)
                            ? "bg-red-500 hover:bg-red-600 border-transparent text-white shadow-md shadow-red-500/20"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all duration-300 ${
                            wishlist.includes(p._id)
                              ? "fill-current text-white scale-110"
                              : "text-slate-400 group-hover/wishlist-btn:text-red-500 group-hover/wishlist-btn:scale-110"
                          }`}
                        />
                        <span>{wishlist.includes(p._id) ? "Wishlisted" : "Wishlist"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollContainerRef.current;
                  if (el) {
                    el.scrollTo({
                      left: i * 330,
                      behavior: "smooth",
                    });
                  }
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
