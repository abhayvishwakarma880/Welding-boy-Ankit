"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/apis/products";
import { Tag, ChevronLeft, ChevronRight, ArrowLeft, Phone, ImageIcon, X } from "lucide-react";

interface GalleryImage { url: string; publicId: string; }
interface RelatedProduct {
  _id: string;
  slug: string;
  name: string;
  price: number;
  discount: number;
  finalPrice: number;
  mainImage: { url: string };
  category: { _id: string; name: string } | null;
}
interface Product {
  _id: string;
  name: string;
  category: { _id: string; name: string } | null;
  price: number;
  discount: number;
  finalPrice: number;
  description: string;
  mainImage: { url: string; publicId: string };
  galleryImages: GalleryImage[];
  relatedProducts: RelatedProduct[];
  aboutThisProduct: string;
  isActive: boolean;
  createdAt: string;
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductById(slug)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // All images = mainImage + galleryImages
  const allImages = product
    ? [product.mainImage, ...product.galleryImages]
    : [];

  const prevLightbox = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + allImages.length) % allImages.length);
  }, [lightbox, allImages.length]);

  const nextLightbox = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % allImages.length);
  }, [lightbox, allImages.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, nextLightbox, prevLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextLightbox() : prevLightbox();
    touchStartX.current = null;
  };

  // ── Loading skeleton ──────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-4 w-32 bg-slate-200 rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="w-full h-96 bg-slate-200 rounded-2xl mb-3" />
              <div className="flex gap-2">
                {[1,2,3].map((i) => <div key={i} className="w-20 h-20 bg-slate-200 rounded-xl" />)}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-3 w-24 bg-slate-200 rounded-full" />
              <div className="h-8 w-3/4 bg-slate-200 rounded-full" />
              <div className="h-10 w-36 bg-slate-200 rounded-full" />
              <div className="h-3 w-full bg-slate-200 rounded-full" />
              <div className="h-3 w-5/6 bg-slate-200 rounded-full" />
              <div className="h-3 w-4/6 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 text-sm">Product nahi mila.</p>
        <Link href="/products" className="text-brand text-sm font-semibold underline">Back to Products</Link>
      </main>
    );
  }

  const savings = product.price - product.finalPrice;

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">

          {/* ── Left: Images ── */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div
              className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 cursor-zoom-in"
              onClick={() => setLightbox(activeImage)}
            >
              <Image
                src={allImages[activeImage]?.url}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              {allImages.length > 1 && (
                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  {activeImage + 1} / {allImages.length}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImage ? "border-brand" : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <Image src={img.url} alt={`${product.name} ${i + 1}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col gap-4">
            {/* Category + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && (
                <span className="px-3 py-1 bg-brandBG-icon border border-brand text-brand text-[10px] font-bold rounded-full uppercase tracking-widest">
                  {product.category.name}
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>

            {/* Price block */}
            <div className="flex items-end gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Price</p>
                <p className="text-3xl font-extrabold text-brand">
                  ₹{product.finalPrice?.toLocaleString("en-IN")}
                </p>
              </div>
              {product.discount > 0 && (
                <div className="flex flex-col gap-0.5 pb-0.5">
                  <span className="text-sm text-slate-400 line-through">₹{product.price?.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                    Save ₹{savings?.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</p>
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Custom size */}
            <div className="flex items-center gap-2 text-sm text-brand font-semibold">
              <span className="w-4 h-4 rounded-full border border-brand flex items-center justify-center text-[10px]">✓</span>
              Custom Size Available on Request
            </div>

            {/* Gallery images info */}
            {product.galleryImages?.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ImageIcon className="w-4 h-4 text-brand" />
                <span>{product.galleryImages.length} additional photo{product.galleryImages.length > 1 ? "s" : ""} available</span>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="/contact"
                className="flex-1 py-3 bg-brand text-white text-sm font-bold rounded-xl text-center hover:bg-brand-hover transition"
              >
                Order Now / Get Quote
              </Link>
              <Link
                href="tel:+917905940157"
                className="flex-1 py-3 border border-brand text-brand text-sm font-bold rounded-xl text-center hover:bg-brand hover:!text-white transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
            </div>
          </div>
        </div>

        {/* About This Product */}
        {product.aboutThisProduct && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-brand inline-block" />
              <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">About This Product</h2>
            </div>
            <div
              className="prose prose-sm max-w-none text-slate-600 ck-content"
              dangerouslySetInnerHTML={{ __html: product.aboutThisProduct }}
            />
          </div>
        )}

        {/* Related Products */}
        {product.relatedProducts?.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-5 rounded-full bg-brand inline-block" />
              <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.relatedProducts.map((rp) => (
                <Link
                  key={rp._id}
                  href={`/product/${rp.slug || rp._id}`}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand hover:shadow-md transition-all duration-200 group"
                >
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <Image
                      src={rp.mainImage?.url}
                      alt={rp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    {rp.discount > 0 && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full">
                        {rp.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-brand font-bold uppercase tracking-wider">{rp.category?.name}</p>
                    <h3 className="text-xs font-bold text-slate-800 mt-0.5 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                      {rp.name}
                    </h3>
                    <p className="text-sm font-extrabold text-brand mt-1.5">
                      ₹{rp.finalPrice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
            {lightbox + 1} / {allImages.length}
          </div>
          {allImages.length > 1 && (
            <>
              <button onClick={prevLightbox} className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextLightbox} className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="relative w-full h-full max-w-4xl max-h-[85vh] mx-16">
            <Image
              src={allImages[lightbox].url}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {allImages.length > 1 && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-5 h-1.5 bg-brand" : "w-1.5 h-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
