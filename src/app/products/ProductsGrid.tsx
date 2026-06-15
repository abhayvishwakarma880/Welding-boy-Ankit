"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Search, ImageIcon } from "lucide-react";
import { Product } from "./page";
import useCategoryStore from "@/store/useCategoryStore";

type Props = {
  products: Product[];
  loading: boolean;
  page: number;
  totalPages: number;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  search: string;
  onSearch: (q: string) => void;
  onLoadMore: () => void;
};

function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
        <div className="flex gap-2 mt-1">
          <div className="flex-1 h-8 bg-slate-200 rounded-lg" />
          <div className="flex-1 h-8 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid({
  products, loading, page, totalPages,
  activeCategory, onCategoryChange,
  search, onSearch, onLoadMore,
}: Props) {
  const { categories } = useCategoryStore();
  const [inputValue, setInputValue] = useState(search);

  const categoryList = ["All", ...categories.map((c: { name: string }) => c.name)];

  return (
    <section className="bg-slate-50 py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-12 h-[3px] bg-brand rounded-full mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            All <span className="text-brand">Products</span>
          </h2>
          {!loading && (
            <p className="mt-2 text-sm text-slate-500">
              {products.length} products — filter by category
            </p>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white mb-6 max-w-md mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(inputValue.trim())}
            placeholder="Search products..."
            className="flex-1 px-4 py-2.5 text-sm text-slate-700 outline-none bg-transparent"
          />
          <button
            onClick={() => onSearch(inputValue.trim())}
            className="px-4 py-2.5 bg-brand text-white hover:bg-brand-hover transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
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
        {loading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Koi product nahi mila.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug || product._id}`}
                className="bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Main Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                  <Image
                    src={product.mainImage?.url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded-full">
                    {product.category?.name}
                  </span>
                  {/* Discount badge */}
                  {product.discount > 0 && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {product.discount}% OFF
                    </span>
                  )}
                  {/* Gallery count */}
                  {product.galleryImages?.length > 0 && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-white text-[9px] font-semibold rounded-full flex items-center gap-1">
                      <ImageIcon className="w-2.5 h-2.5" />
                      +{product.galleryImages.length}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2.5 flex-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors duration-200 leading-snug">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Price row */}
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-brand">
                      ₹{product.finalPrice?.toLocaleString("en-IN")}
                    </span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                          Save ₹{(product.price - product.finalPrice)?.toLocaleString("en-IN")}
                        </span>
                      </>
                    )}
                  </div>

                  {/* aboutThisProduct snippet */}
                  {product.aboutThisProduct && (
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1 italic">
                      {product.aboutThisProduct.replace(/<[^>]*>/g, "").slice(0, 80)}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand">
                    <span className="w-3 h-3 rounded-full border border-brand flex items-center justify-center text-[8px]">✓</span>
                    Custom Size Available
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto" onClick={(e) => e.preventDefault()}>
                    <span className="flex-1 py-2 text-xs font-bold rounded-lg border border-brand text-brand group-hover:bg-brand group-hover:!text-white transition-all duration-200 text-center">
                      View Details
                    </span>
                    <Link
                      href="/contact"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2 bg-brand text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 text-center"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && page < totalPages && (
          <div className="text-center mt-8">
            <button
              onClick={onLoadMore}
              className="px-6 py-2.5 rounded-full border border-brand text-brand text-sm font-semibold hover:bg-brand hover:!text-white transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
