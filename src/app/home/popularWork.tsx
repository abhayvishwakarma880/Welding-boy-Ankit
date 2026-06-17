"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Heart } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/apis/products";
import useCategoryStore from "@/store/useCategoryStore";
import useUserStore from "@/store/useUserStore";
import useWishlistStore from "@/store/useWishlistStore";
import LoginModal from "@/components/common/LoginModal";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  mainImage: { url: string };
  category: { _id: string; name: string };
  slug?: string;
}

export default function PopularWorks() {
  const { categories } = useCategoryStore() as { categories: Category[] };
  const [activeTab, setActiveTab] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isSwitched, setIsSwitched] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const { isLoggedIn, token } = useUserStore();
  const { wishlistIds, addWishlist: storeAddWishlist } = useWishlistStore();
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (categories.length && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories]);

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

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleWishlist = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) return;
    if (!isLoggedIn || !token) {
      setPendingProductId(id);
      setLoginModalOpen(true);
      return;
    }
    await storeAddWishlist(id, token);
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
    return () => { if (el) el.removeEventListener("scroll", checkScrollStatus); };
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 272;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Section wrapper ─────────────────────────────────────────────────────
          Mobile: zero side margin, zero border-radius → full-bleed feel
          Desktop: same floating card look as before
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-50 py-8 md:py-10 overflow-hidden font-sans
                          border-y border-slate-200/80 md:border md:rounded-md
                          mx-0 md:mx-8 xl:mx-auto my-10 md:my-16
                          md:shadow-md md:shadow-slate-100 max-w-7xl">

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(234,88,12,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent rounded-full" />

        <div className="relative z-10">

          {/* ── Heading ─────────────────────────────────────────────────────── */}
          <div className="text-center mb-7 px-4 md:px-12">
            <p className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.18em] text-brand mb-2">
              Crafted with Precision
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Popular{" "}
              <span className="text-brand relative inline-block">
                Works
                <span className="absolute bottom-0.5 left-0 w-full h-[5px] bg-brand/15 -z-10 rounded-full" />
              </span>
            </h2>
            <p className="mt-2 text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Premium designs built with precise welding and flawless finishes.
            </p>
          </div>

          {/* ── Category Tabs ────────────────────────────────────────────────── */}
          <div className="px-4 md:px-12 mb-7 flex justify-center">
            <div className="flex p-1 bg-white border border-slate-200/80 rounded-xl shadow-sm
                            max-w-full overflow-x-auto scrollbar-none gap-0.5">
              {categories.map((cat) => {
                const isActive = activeTab === cat._id;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setActiveTab(cat._id)}
                    className={`flex-none px-3.5 md:px-5 py-2 rounded-lg text-[11px] md:text-xs font-semibold
                                transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                      isActive
                        ? "bg-brand text-white shadow-sm shadow-brand/25 scale-[1.03]"
                        : "text-slate-500 hover:text-brand hover:bg-brand/5"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Slider ──────────────────────────────────────────────────────── */}
          {/*
            On mobile: px-4 on the container so first card peeks with padding,
            but we use padding-left on the scroll area so the first card is flush-ish.
            On desktop: px-12 with nav arrow buttons outside.
          */}
          <div className="relative group">

            {/* Nav arrows — desktop only, outside padding zone */}
            {showLeftArrow && (
              <button
                onClick={() => handleScroll("left")}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-[calc(50%+12px)] z-20
                           w-9 h-9 bg-white hover:bg-brand border border-slate-200
                           text-slate-600 hover:text-white rounded-full items-center justify-center
                           shadow-md transition-all duration-200 hover:scale-110 active:scale-95
                           opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => handleScroll("right")}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-[calc(50%+12px)] z-20
                           w-9 h-9 bg-white hover:bg-brand border border-slate-200
                           text-slate-600 hover:text-white rounded-full items-center justify-center
                           shadow-md transition-all duration-200 hover:scale-110 active:scale-95
                           opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            )}

            {/* Scroll container */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-3 md:gap-4 overflow-x-auto scrollbar-none
                          pb-4 pt-1
                          px-4 md:px-14
                          transition-opacity duration-300
                          cursor-grab active:cursor-grabbing select-none
                          ${isMouseDown ? "" : "snap-x snap-mandatory"}
                          ${isSwitched ? "opacity-30" : "opacity-100"}`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
            >
              {loadingProducts
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-none w-[220px] md:w-[252px] bg-white border border-slate-200/70
                                 rounded-xl overflow-hidden snap-center flex flex-col animate-pulse"
                    >
                      <div className="aspect-[4/3] w-full bg-slate-200" />
                      <div className="p-3.5 flex flex-col gap-2.5">
                        <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
                        <div className="h-3.5 w-3/4 bg-slate-200 rounded-full" />
                        <div className="h-2.5 w-full bg-slate-200 rounded-full" />
                        <div className="h-2.5 w-2/3 bg-slate-200 rounded-full" />
                        <div className="h-px bg-slate-100 my-1" />
                        <div className="h-3.5 w-1/3 bg-slate-200 rounded-full" />
                        <div className="flex gap-2 mt-1">
                          <div className="h-8 flex-1 bg-slate-200 rounded-lg" />
                          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))
                : products.map((p) => {
                    const discountedPrice = p.price - (p.price * (p.discount || 0)) / 100;
                    const isWishlisted = wishlistIds.includes(p._id);

                    return (
                      <div
                        key={p._id}
                        className="flex-none w-[220px] md:w-[252px] bg-white border border-slate-200/70
                                   rounded-xl overflow-hidden snap-center
                                   group/card transition-all duration-300
                                   hover:shadow-xl hover:shadow-orange-500/8 hover:border-orange-200
                                   hover:-translate-y-1 flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={p.mainImage?.url}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out
                                       group-hover/card:scale-105"
                          />
                          {/* Discount badge */}
                          {p.discount > 0 && (
                            <span className="absolute top-2 left-2 bg-brand text-white text-[9px] font-black
                                             px-1.5 py-0.5 rounded-md tracking-wide uppercase shadow-sm">
                              -{p.discount}%
                            </span>
                          )}
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent
                                          pointer-events-none opacity-0 group-hover/card:opacity-100
                                          transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-3.5 flex flex-col flex-grow gap-1.5">
                          {/* Category eyebrow */}
                          <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase
                                          text-brand tracking-wider">
                            <Tag className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{p.category?.name}</span>
                          </div>

                          {/* Name */}
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1
                                         group-hover/card:text-brand transition-colors duration-200 leading-snug">
                            {p.name}
                          </h3>

                          {/* Description */}
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                            {p.description}
                          </p>

                          {/* Divider */}
                          <div className="h-px bg-slate-100 my-1" />

                          {/* Price row */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-extrabold text-slate-900">
                              ₹{discountedPrice.toLocaleString("en-IN")}
                            </span>
                            {p.discount > 0 && (
                              <span className="text-[10px] line-through text-slate-400">
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          {/* CTA row */}
                          <div className="flex items-center gap-2 mt-0.5">
                            <Link
                              href={`/product/${p.slug || p._id}`}
                              onClick={handleLinkClick}
                              className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg
                                         bg-brand px-3 py-2 text-[11px] font-bold text-white
                                         shadow-sm shadow-brand/20 transition-all duration-200
                                         hover:shadow-md hover:shadow-brand/30 hover:scale-[1.02] active:scale-95"
                            >
                              <span>View</span>
                              <ArrowRight className="h-3 w-3 shrink-0" />
                            </Link>

                            <button
                              onClick={(e) => toggleWishlist(p._id, e)}
                              className={`inline-flex items-center justify-center rounded-lg
                                          px-3 py-2 transition-all duration-200
                                          hover:scale-105 active:scale-95 border cursor-pointer select-none
                                          group/wbtn ${
                                isWishlisted
                                  ? "bg-red-500 hover:bg-red-600 border-transparent text-white shadow-sm shadow-red-400/25"
                                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-500"
                              }`}
                              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 transition-all duration-200 ${
                                  isWishlisted
                                    ? "fill-current text-white scale-110"
                                    : "text-slate-400 group-hover/wbtn:text-red-500 group-hover/wbtn:scale-110"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          {/* ── End Slider ── */}

        </div>
      </section>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => { setLoginModalOpen(false); setPendingProductId(null); }}
        pendingProductId={pendingProductId}
      />
    </>
  );
}