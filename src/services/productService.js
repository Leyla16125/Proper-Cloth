import api from "./api";

export async function getProducts(params = {}) {
  const response = await api.get("/product", { params });
  return response.data;
}

export async function getProductBySlug(slug) {
  const response = await api.get(`/product/slug/${slug}`);
  return response.data;
}