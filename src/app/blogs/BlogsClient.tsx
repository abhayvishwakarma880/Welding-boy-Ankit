"use client";

import { useState, useMemo } from "react";
import BlogHero from "./BlogHero";
import BlogCategories from "./BlogCategories";
import LatestArticles from "./LatestArticles";
import PopularArticles from "./PopularArticles";
import FeaturedArticle from "./FeaturedArticle";
import TopicsWeCover from "./TopicsWeCover";
import BlogCTA from "./BlogCTA";
import { articles, featuredArticle, type Article } from "./blogData";

export default function BlogsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list: Article[] = articles.filter((a) => !a.featured);
    if (activeCategory !== "All")
      list = list.filter((a) => a.category === activeCategory);
    if (searchQuery.trim())
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return list;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
  };

  return (
    <main>
      <BlogHero onSearch={setSearchQuery} />
      <FeaturedArticle article={featuredArticle} />
      <BlogCategories active={activeCategory} onChange={handleCategoryChange} />
      <LatestArticles
        articles={filtered}
        onCategoryChange={(cat) => {
          handleCategoryChange(cat);
          window.scrollTo({ top: 0, behavior: "smooth" });
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
