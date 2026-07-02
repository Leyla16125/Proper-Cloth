import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../services/productService";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}) => {
    const data = await getProducts(params);
    return data.products || [];
  }
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = [];
      });
  },
});

export default productSlice.reducer;