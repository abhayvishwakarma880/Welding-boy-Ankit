import { create } from "zustand";
import { getCategories } from "@/apis/categories";

const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  fetched: false,

  fetchCategories: async () => {
    if (get().fetched) return; // already fetch ho chuka hai toh dobara nahi
    try {
      set({ loading: true });
      const res = await getCategories();
      set({ categories: res.data || [], fetched: true });
    } catch {
      set({ categories: [] });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
