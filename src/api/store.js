import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CategoriesReducer } from "../state/reducers/CategoriesSlice";
import { ProductsReducer } from "../state/reducers/ProductSlice";

const rootReducer = combineReducers({
  CategoriesReducer,
  ProductsReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
