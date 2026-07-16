"use client";

// ─────────────────────────────────────────────────────────────────
//  BlogsClient.tsx  ←  CLIENT COMPONENT
//  Handles: category filter, search, load more pagination
//  Initial blogs (SEO ke liye) server se pass hote hain as props
// ─────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import BlogHero from "./BlogHero";
import BlogCategories from "./BlogCategories";
import LatestArticles from "./LatestArticles";
import PopularArticles from "./PopularArticles";
import FeaturedArticle from "./FeaturedArticle";
import TopicsWeCover from "./TopicsWeCover";
import BlogCTA from "./BlogCTA";
import { getBlogs } from "@/apis/blogs";
import useCategoryStore from "@/store/useCategoryStore";

export interface Blog {
  _id: string;
  title: string;
  description: string;
  image: { url: string };
  slug: string;
  createdAt: string;
  readTime: number;
  category: { _id: string; name: string };
  tags: string[];
}

interface Props {
  initialBlogs: Blog[];
  initialTotalPages: number;
}

export default function BlogsClient({ initialBlogs, initialTotalPages }: Props) {
  const { categories } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const fetchBlogs = useCallback(
    async (cat: string, pg: number, search: string) => {
      try {
        setLoading(true);
        const categoryId =
          cat === "All"
            ? ""
            : categories.find(
                (c: { _id: string; name: string }) => c.name === cat
              )?._id || "";
        const res = await getBlogs({
          page: pg,
          limit: 9,
          category: categoryId,
          search,
        });
        if (pg === 1) {
          setBlogs(res.data || []);
        } else {
          setBlogs((prev) => [...prev, ...(res.data || [])]);
        }
        setTotalPages(res.pagination?.totalPages || 1);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    },
    [categories]
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
    setPage(1);
    fetchBlogs(cat, 1, "");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    fetchBlogs(activeCategory, 1, query);
  };

  return (
    <main>
      <BlogHero onSearch={handleSearch} />
      <FeaturedArticle blog={blogs[0] || null} loading={loading} />
      <BlogCategories active={activeCategory} onChange={handleCategoryChange} />
      <LatestArticles
        blogs={blogs.slice(1)}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onLoadMore={() => {
          const next = page + 1;
          setPage(next);
          fetchBlogs(activeCategory, next, searchQuery);
        }}
      />
      <PopularArticles />
      <TopicsWeCover
        onCategoryChange={(cat) => {
          handleCategoryChange(cat);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <BlogCTA />
    </main>
  );
}
