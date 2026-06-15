"use client";

import { useEffect } from "react";
import useCategoryStore from "@/store/useCategoryStore";

export default function AppInitializer() {
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return null;
}
