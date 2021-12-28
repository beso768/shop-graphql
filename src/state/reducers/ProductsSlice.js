import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApifetchProductsByCategory } from "../../api/StoreApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    const res = await ApifetchProductsByCategory(category);
    return res;
  }
);

export const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "",
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, () => {
      return {
        products: [],
        status: { loading: true },
      };
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        products: action.payload.data.category.products,
        status: { success: true },
      };
    });
    builder.addCase(fetchProducts.rejected, () => {
      return {
        products: [],
        status: { error: true },
      };
    });
  },
});

export const ProductsReducer = ProductsSlice.reducer;
