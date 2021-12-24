import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiFetchAllCurrencies } from "./../../api/StoreApi";

export const fetchCurrencies = createAsyncThunk("currencies", async () => {
  const res = await ApiFetchAllCurrencies();
  return res;
});

export const CurrencySlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
    activeCurrency: { symbol: "$", label: "USD" },
    status: "",
  },
  reducers: {
    setActiveCurrency: (state, action) => {
      return {
        ...state,
        activeCurrency: action.payload,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchCurrencies.pending, (state) => {
      return {
        ...state,
        status: "loading",
      };
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      return {
        ...state,
        status: "success",
        currencies: action.payload.data.currencies,
      };
    });
    builder.addCase(fetchCurrencies.rejected, () => {
      return {
        status: "error",
        currencies: {},
      };
    });
  },
});

export const { setActiveCurrency } = CurrencySlice.actions;
export const CurrencyReducer = CurrencySlice.reducer;
