import http from "./http";

export const getRecentSideWorks = async ({ page = 1, limit = 10, isActive = "true", featured = "", search = "" } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (isActive !== "") params.append("isActive", isActive);
  if (featured !== "") params.append("featured", featured);
  if (search)          params.append("search", search);
  const { data } = await http.get(`/recent-side-works?${params.toString()}`);
  return data;
};

export const getRecentSideWorkBySlug = async (slug) => {
  const { data } = await http.get(`/recent-side-works/slug/${slug}`);
  return data;
};
