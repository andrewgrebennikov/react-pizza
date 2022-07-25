import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
