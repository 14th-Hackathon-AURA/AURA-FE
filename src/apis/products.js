import api from "./client";

export const getMyProducts = async () => {
  const { data } = await api.get("/products/");
  return data;
};
