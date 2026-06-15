"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./page";

type Props = {
  products: Product[];
  loading: boolean;
};

function SkeletonCard() {
  return (
    <div className="shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white border border-slate-200/70 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-8 w-full bg-slate-200 rounded-lg mt-1" />
      </div>
    </div>
  );
}

export default function FeaturedProducts({ products, loading }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  // Featured = discount > 0 wale, otherwise pehle 6
  const featured = products.filter((p) => p.discount > 0).length > 0
    ? products.filter((p) => p.discount > 0)
    : products.slice(0, 6);

  if (!loading && featured.length === 0) return null;

  return (
    <section className="bg-white py-14 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="w-12 h-[3px] bg-brand rounded-full mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-brand">Products</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500">Our most popular and best-selling items.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand hover:text-brand transition-all duration-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand hover:text-brand transition-all duration-300">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: "x mandatory" }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((product) => (
              <div
                key={product._id}
                className="shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 group"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
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
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-white text-[9px] font-semibold rounded-full">
                      +{product.galleryImages.length} photos
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors duration-200 leading-snug">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">{product.description}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-brand">
                      ₹{product.finalPrice?.toLocaleString("en-IN")}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand">
                    <span className="w-3 h-3 rounded-full border border-brand flex items-center justify-center text-[8px]">✓</span>
                    Custom Size Available
                  </div>

                  <Link
                    href={`/product/${product.slug || product._id}`}
                    className="w-full py-2 bg-brand text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
