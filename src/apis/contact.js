import http from "./http";

export const sendContact = async (payload) => {
  const { data } = await http.post("/contact/create", payload);
  return data;
};
