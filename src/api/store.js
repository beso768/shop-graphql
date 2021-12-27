import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CategoriesReducer } from "../state/reducers/CategoriesSlice";
import { ProductsReducer } from "../state/reducers/ProductsSlice";
import { ProductReducer } from "./../state/reducers/ProductSlice";
import { CurrencyReducer } from "../state/reducers/CurrencySlice";
import { CartReducer } from "../state/reducers/CartSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import createMigrate from "redux-persist/es/createMigrate";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import migrations from "./migrations";

const rootReducer = combineReducers({
  CategoriesReducer,
  ProductsReducer,
  ProductReducer,
  CurrencyReducer,
  CartReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 0,
    blacklist: ["ProductsReducer", "ProductReducer", "CategoriesReducer"],
    transforms: [
      createFilter("CurrencyReducer", ["activeCurrency", "currencies"]),
      createFilter("CurrencyReducer", null, ["activeCurrency", "currencies"]),
    ],
    migrate: createMigrate(migrations, { debug: false }),
    stateReconciler: autoMergeLevel2,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
