import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import createMigrate from "redux-persist/es/createMigrate";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import migrations from "../api/migrations";
import { CartReducer } from "./reducers/CartSlice";
import { CategoriesReducer } from "./reducers/CategoriesSlice";
import { CurrencyReducer } from "./reducers/CurrencySlice";
import { ProductReducer } from "./reducers/ProductSlice";
import { ProductsReducer } from "./reducers/ProductsSlice";

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
    blacklist: [
      "ProductsReducer",
      "ProductReducer",
      "CategoriesReducer",
      "CurrencyReducer",
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
