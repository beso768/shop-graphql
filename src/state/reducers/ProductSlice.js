import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApifetchProductById } from "./../../api/StoreApi";

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const res = await ApifetchProductById(id);
    return res;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    status: "",
  },
  reducers: {
    cleanProduct: (state, action) => {
      return {
        ...state,
        product: {},
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProductById.pending, (state) => {
      return {
        ...state,
        status: { loading: true },
      };
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      return {
        status: { success: true },
        product: action.payload.data.product,
      };
    });
    builder.addCase(fetchProductById.rejected, () => {
      return {
        status: { error: true },
        product: {},
      };
    });
  },
});
export const { cleanProduct } = ProductSlice.actions;
export const ProductReducer = ProductSlice.reducer;
