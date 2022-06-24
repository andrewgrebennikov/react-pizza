import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
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
