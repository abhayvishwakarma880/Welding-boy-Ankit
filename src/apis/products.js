import http from "./http";

export const getProducts = async ({ page = 1, limit = 12, search = "", category = "", isActive = "" } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (search)   params.append("search",   search);
  if (category) params.append("category", category);
  if (isActive) params.append("isActive", isActive);
  const { data } = await http.get(`/products?${params.toString()}`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await http.get(`/products/${id}`);
  return data;
};
