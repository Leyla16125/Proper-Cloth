import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNestedCategories } from "../services/categoryService";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const data = await getNestedCategories();
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.categories = [];
      });
  },
});

export default categorySlice.reducer;