"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { categories, products } from "./productsData";

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filtered =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  return (
    <section className="bg-slate-50 py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            All <span className="text-brand">Products</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {filtered.length} products — filter by category
          </p>
        </div>

        {/* Category Chips — horizontal scroll on mobile */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group"
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
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                  {product.badge}
                </span>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                      wishlist.includes(product.id)
                        ? "bg-brand/5 border-brand text-brand"
                        : "border-slate-200 text-slate-500 hover:border-brand hover:text-brand"
                    }`}
                  >
                    ♡ Wishlist
                  </button>
                  <button className="flex-1 py-2 bg-brand text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity duration-200">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
