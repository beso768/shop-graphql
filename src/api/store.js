import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CategoriesReducer } from "../state/reducers/CategoriesSlice";
import { ProductsReducer } from "../state/reducers/ProductsSlice";
import { ProductReducer } from "./../state/reducers/ProductSlice";
import { CurrencyReducer } from "../state/reducers/CurrencySlice";

const rootReducer = combineReducers({
  CategoriesReducer,
  ProductsReducer,
  ProductReducer,
  CurrencyReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
