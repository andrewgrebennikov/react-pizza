import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: {
    id: 0,
    name: "Все",
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
