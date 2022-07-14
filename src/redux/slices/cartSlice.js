import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const identicalItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );

      if (identicalItem) {
        identicalItem.quantity++;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeProduct: (state, action) => {
      const identicalItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );

      state.items = state.items.filter((item) => item !== identicalItem);

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    incrementCountProduct: (state, action) => {
      const identicalItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );

      if (identicalItem) {
        identicalItem.quantity++;
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    decrementCountProduct: (state, action) => {
      const identicalItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );

      if (identicalItem) {
        identicalItem.quantity > 1 && identicalItem.quantity--;
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearProducts: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearProducts,
  incrementCountProduct,
  decrementCountProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
