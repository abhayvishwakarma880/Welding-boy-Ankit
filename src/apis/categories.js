import http from "./http";

export const getCategories = async ({ limit = 100 } = {}) => {
  const { data } = await http.get(`/category/all?limit=${limit}&isActive=true`);
  return data;
};
