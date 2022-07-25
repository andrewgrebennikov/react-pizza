import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./slices/sortSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
