"use client";

import { useState } from "react";
import BlogHero from "./BlogHero";
import FeaturedArticle from "./FeaturedArticle";
import BlogCategories from "./BlogCategories";
import LatestArticles from "./LatestArticles";
import PopularArticles from "./PopularArticles";
import TopicsWeCover from "./TopicsWeCover";
import BlogCTA from "./BlogCTA";
import { latestArticles } from "./blogData";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main>
      <BlogHero />
      <FeaturedArticle />
      <BlogCategories active={activeCategory} onChange={setActiveCategory} />
      <LatestArticles articles={latestArticles} activeCategory={activeCategory} />
      <PopularArticles />
      <TopicsWeCover onCategoryChange={(cat) => { setActiveCategory(cat); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      <BlogCTA />
    </main>
  );
}
