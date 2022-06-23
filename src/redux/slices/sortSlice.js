import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSort: {
    id: 0,
    name: "популярности",
    value: "rating",
    order: "desc",
  },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
  },
});

export const { setActiveSort } = sortSlice.actions;

export default sortSlice.reducer;
