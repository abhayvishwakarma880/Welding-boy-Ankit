import { create } from "zustand";
import { getWishlist, addToWishlist } from "@/apis/wishlist";

const useWishlistStore = create((set, get) => ({
  wishlistIds: [], // array of productId strings
  wishlistItems: [], // full item data for wishlist page

  fetchWishlist: async (token) => {
    if (!token) return;
    try {
      const res = await getWishlist(token);
      if (res.success) {
        const ids = res.data.map((item) => item.productId?._id || item.productId);
        set({ wishlistIds: ids, wishlistItems: res.data });
      }
    } catch (e) {
      // silent
    }
  },

  // Add-only: ek baar wishlist me add ho gaya to remove nahi hoga
  addWishlist: async (productId, token) => {
    const { wishlistIds } = get();
    if (wishlistIds.includes(productId)) return; // already wishlisted, do nothing
    // Optimistic update
    set({ wishlistIds: [...wishlistIds, productId] });
    try {
      await addToWishlist(productId, token);
    } catch (e) {
      // revert on error
      set({ wishlistIds });
    }
  },

  clearWishlist: () => set({ wishlistIds: [], wishlistItems: [] }),
}));

export default useWishlistStore;
