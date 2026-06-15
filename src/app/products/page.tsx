"use client";

import { useState, useEffect, useCallback } from "react";
import ProductHero from "./ProductHero";
import FeaturedProducts from "./FeaturedProducts";
import ProductsGrid from "./ProductsGrid";
import CustomFabrication from "./CustomFabrication";
import WhyOurProducts from "./WhyOurProducts";
import ProductCTA from "./ProductCTA";
import { getProducts } from "@/apis/products";
import useCategoryStore from "@/store/useCategoryStore";

export interface Product {
  _id: string;
  name: string;
  category: { _id: string; name: string } | null;
  price: number;
  discount: number;
  finalPrice: number;
  description: string;
  mainImage: { url: string; publicId: string };
  galleryImages: { url: string; publicId: string }[];
  relatedProducts: string[];
  aboutThisProduct: string;
  isActive: boolean;
  createdAt: string;
  slug: string;
}

export default function ProductsPage() {
  const { categories } = useCategoryStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const fetchProducts = useCallback(async (cat: string, pg: number, q: string) => {
    try {
      setLoading(true);
      const categoryId = cat === "All" ? "" : categories.find((c: { _id: string; name: string }) => c.name === cat)?._id || "";
      const res = await getProducts({ page: pg, limit: 12, category: categoryId, search: q, isActive: "true" });
      if (pg === 1) {
        setProducts(res.data || []);
      } else {
        setProducts((prev) => [...prev, ...(res.data || [])]);
      }
      setTotalPages(res.pagination?.totalPages || 1);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    setPage(1);
    fetchProducts(activeCategory, 1, search);
  }, [activeCategory, search, fetchProducts]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchProducts(activeCategory, next, search);
  };

  return (
    <main>
      <ProductHero />
      <FeaturedProducts products={products} loading={loading} />
      <ProductsGrid
        products={products}
        loading={loading}
        page={page}
        totalPages={totalPages}
        activeCategory={activeCategory}
        onCategoryChange={(cat) => { setActiveCategory(cat); setPage(1); }}
        search={search}
        onSearch={(q) => { setSearch(q); setPage(1); }}
        onLoadMore={handleLoadMore}
      />
      <CustomFabrication />
      <WhyOurProducts />
      <ProductCTA />
    </main>
  );
}
