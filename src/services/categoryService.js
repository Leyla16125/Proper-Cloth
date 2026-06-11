import api from "./api";

export async function getNestedCategories() {
  const response = await api.get("/category/nested");
  return response.data;
}