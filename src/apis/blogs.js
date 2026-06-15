import http from "./http";

export const getBlogs = async ({ page = 1, limit = 10, search = "", category = "" } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (search)   params.append("search",   search);
  if (category) params.append("category", category);
  const { data } = await http.get(`/blog/published?${params.toString()}`);
  return data;
};

export const getBlogBySlugOrId = async (slugOrId) => {
  const { data } = await http.get(`/blog/${slugOrId}`);
  return data;
};

export const addComment = async (blogId, comment) => {
  const { data } = await http.post(`/blog/${blogId}/comments`, { comment });
  return data;
};
