import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const { productId, product, selectedAttributes } = action.payload;
      const newItem = {
        product,
        selectedAttributes,
      };
      if (state.hasOwnProperty(productId)) {
        newItem.quantity = state[productId].quantity + 1;
      } else {
        newItem.quantity = 1;
      }
      return { ...state, [productId]: newItem };
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      const newState = { ...state };
      delete newState[productId];
      return newState;
    },
    setNewAttribute: (state, action) => {
      const { productId, attributeName, attributId } = action.payload;
      let newSelectedAttributes = { ...state[productId]["selectedAttributes"] };
      newSelectedAttributes[attributeName] = attributId;
      return {
        ...state,
        [productId]: {
          ...state[productId],
          selectedAttributes: newSelectedAttributes,
        },
      };
    },
    setItemQuantity: (state, action) => {
      const { productId, type } = action.payload;
      let quantity = state[productId].quantity;
      if (type === "increment") {
        quantity++;
      } else {
        quantity--;
      }
      return {
        ...state,
        [productId]: {
          ...state[productId],
          quantity,
        },
      };
    },
  },
});

export const {
  addItem,
  removeItem,
  setNewAttribute,
  setItemQuantity,
  checkout,
} = CartSlice.actions;
export const CartReducer = CartSlice.reducer;
