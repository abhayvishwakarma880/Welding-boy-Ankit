import http from "./http";

export const createOrder = async (orderData) => {
  try {
    const { data } = await http.post("/orders", orderData);
    return data;
  } catch (error) {
    throw error;
  }
};
