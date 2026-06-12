import api from "./api";

export async function getProducts(params = {}) {
  const response = await api.get("/product", { params });
  return response.data;
}