import http from "./http";

export const getSliders = async () => {
  const { data } = await http.get("/slider");
  return data;
};
