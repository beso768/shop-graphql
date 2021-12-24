import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      console.log("reducer");
      return { cart: [...state.cart, ...action.payload] };
    },
    removeItemFromCart: (state, actions) => {},
  },
});

export const {
  addItemToCart,
  //   removeItemFromCart,
  //   setNewAttributeSelectedIndex,
} = CartSlice.actions;
export const CartReducer = CartSlice.reducer;
