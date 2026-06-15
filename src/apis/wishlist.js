import http from "./http";

export const getWishlist = async (token) => {
  const { data } = await http.get("/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const addToWishlist = async (productId, token) => {
  const { data } = await http.post("/wishlist", { productId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const removeFromWishlist = async (productId, token) => {
  const { data } = await http.delete(`/wishlist/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
