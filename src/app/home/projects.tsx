"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/apis/products";

interface Product {
  _id: string;
  name: string;
  mainImage: { url: string };
  category?: { _id: string; name: string };
}

export default function Project() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [projects, setProjects] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ limit: 5 })
      .then((res) => setProjects(res.data || []))
      .catch(() => {});
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, projects.length - 1));
  };

  return (
    <section className="bg-white pt-[60px] pb-0 overflow-hidden font-['Barlow','Oswald',sans-serif]">
      {/* Section Header - Centered */}
      <div className="px-5 text-center">
        <h2 className="font-['Oswald',sans-serif] text-[30px] font-bold text-gray-900 m-0 leading-[1.1] tracking-[0.5px]">
          Recent Weldings{" "}
          <span className="text-brand font-bold text-[30px]">Work</span>
        </h2>
        <div className="w-9 h-[3px] bg-brand rounded-[2px] mx-auto mt-2 mb-[14px]" />
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center mt-6 pb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-full text-sm tracking-wide hover:bg-brand/90 hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
        >
          View All Products
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* Swipe Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-[14px] overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 pb-4 pt-2 mt-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p, i) => (
          <Link
            href={`/product/${p._id}`}
            key={p._id}
            className="flex-none w-[260px] h-[340px] rounded-[20px] overflow-hidden relative snap-center cursor-pointer transition-transform duration-200 ease-out hover:shadow-xl active:scale-[0.97] shadow-md block"
          >
            <img
              src={p.mainImage?.url}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-400 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/85" />
            <div className="absolute bottom-0 left-0 right-0 p-[14px_16px_16px]">
              {p.category?.name && (
                <span className="inline-block px-[10px] py-[3px] rounded-[20px] text-[10px] font-semibold tracking-[0.6px] uppercase bg-brand text-white mb-[7px]">
                  {p.category.name}
                </span>
              )}
              <h3 className="font-['Oswald',sans-serif] text-[18px] font-semibold text-white leading-[1.2] m-0 mb-1 tracking-[0.3px]">
                {p.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 mt-1.5 pb-1">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === i
                ? "w-5 bg-brand rounded-[4px]"
                : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>

      
    </section>
  );
}