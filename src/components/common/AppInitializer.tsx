"use client";

import { useEffect } from "react";
import useCategoryStore from "@/store/useCategoryStore";
import useUserStore from "@/store/useUserStore";
import useWishlistStore from "@/store/useWishlistStore";

export default function AppInitializer() {
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
  const initUser = useUserStore((s) => s.initUser);
  const token = useUserStore((s) => s.token);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);

  useEffect(() => {
    fetchCategories();
    initUser();
  }, [fetchCategories, initUser]);

  useEffect(() => {
    if (token) {
      fetchWishlist(token);
    }
  }, [token, fetchWishlist]);

  return null;
}

