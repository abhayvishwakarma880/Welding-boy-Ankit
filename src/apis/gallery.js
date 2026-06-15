import http from "./http";

export const getGallery = async ({ page = 1, limit = 20, category = "", isActive = "true" } = {}) => {
  const params = new URLSearchParams({ page, limit, isActive });
  if (category) params.append("category", category);
  const { data } = await http.get(`/gallery?${params.toString()}`);
  return data;
};
