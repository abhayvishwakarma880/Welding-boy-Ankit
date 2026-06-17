"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import useUserStore from "@/store/useUserStore";
import useWishlistStore from "@/store/useWishlistStore";
import { getWishlist } from "@/apis/wishlist";

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  discount: number;
  finalPrice?: number;
  mainImage?: { url: string };
  category?: { name: string };
  slug?: string;
}

interface WishlistItem {
  _id: string;
  productId: WishlistProduct;
}

export default function WishlistPage() {
  const { isLoggedIn, token } = useUserStore();
  const { wishlistIds, fetchWishlist } = useWishlistStore();
  const router = useRouter();

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (token) {
      setLoading(true);
      getWishlist(token)
        .then((res) => {
          if (res.success) {
            setItems(res.data.filter((item: WishlistItem) => item.productId)); // filter out deleted products
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, token, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-brand hover:border-brand transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            {!loading && (
              <p className="text-sm text-slate-500 mt-0.5">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-52 bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-3 w-20 bg-slate-200 rounded-full" />
                  <div className="h-4 w-full bg-slate-200 rounded-full" />
                  <div className="h-4 w-2/3 bg-slate-200 rounded-full" />
                  <div className="h-9 bg-slate-200 rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              Browse our products and add your favourites to your wishlist.
            </p>
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-lg font-semibold text-sm hover:bg-brand/90 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => {
              const p = item.productId;
              const finalPrice = p.finalPrice ?? (p.price - (p.price * (p.discount || 0)) / 100);
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-brand/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    {p.mainImage?.url ? (
                      <Image
                        src={p.mainImage.url}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}
                    {/* Wishlist badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    {p.discount > 0 && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                        {p.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    {p.category?.name && (
                      <span className="text-[10px] font-bold uppercase text-brand tracking-wider">
                        {p.category.name}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-extrabold text-brand">
                        ₹{finalPrice.toLocaleString("en-IN")}
                      </span>
                      {p.discount > 0 && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto pt-3">
                      <Link
                        href={`/product/${p.slug || p._id}`}
                        className="flex-1 py-2 text-center text-xs font-bold rounded-lg border border-brand text-brand hover:bg-brand hover:!text-white transition-all duration-200"
                      >
                        View Details
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 py-2 text-center bg-brand text-white text-xs font-bold rounded-lg hover:opacity-90 transition"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
