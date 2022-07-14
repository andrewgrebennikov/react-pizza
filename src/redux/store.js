import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import sortReducer from "./slices/sortSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    sort: sortReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
