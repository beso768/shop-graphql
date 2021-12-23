import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetchAllCategories } from "../../api/StoreApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await ApiFetchAllCategories();
    return res;
  }
);

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    activeCategory: "all",
    status: "",
  },
  reducers: {
    setActiveCategory: (state, action) => {
      return {
        ...state,
        activeCategory: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      return {
        ...state,
        status: "loading",
      };
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return {
        ...state,
        categories: [...state.categories, ...action.payload.data.categories],
        status: "success",
      };
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      return {
        ...state,
        status: "error",
      };
    });
  },
});

export const { setActiveCategory, activeCategory } = CategoriesSlice.actions;
export const CategoriesReducer = CategoriesSlice.reducer;
