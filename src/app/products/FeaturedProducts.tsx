"use client";

import { useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { featuredProducts } from "./productsData";

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="w-12 h-[3px] bg-brand rounded-full mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-brand">Products</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500">Our most popular and best-selling items.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand hover:text-brand transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand hover:text-brand transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                {/* Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                  {product.badge}
                </span>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                >
                  <Heart
                    className="w-4 h-4 transition-colors duration-200"
                    fill={wishlist.includes(product.id) ? "var(--color-brand)" : "none"}
                    stroke={wishlist.includes(product.id) ? "var(--color-brand)" : "#94a3b8"}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors duration-200 leading-snug">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">{product.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand">
                  <span className="w-3 h-3 rounded-full border border-brand flex items-center justify-center text-[8px]">✓</span>
                  Custom Size Available
                </div>
                <button className="w-full py-2 bg-brand text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity duration-200">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
