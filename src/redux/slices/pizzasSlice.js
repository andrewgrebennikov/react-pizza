import { api } from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ page, category, sort, order }) => {
    const { data } = await api.get(
      `pizzas?${page}&limit=4${category}${sort}${order}`
    );
    return data;
  }
);

const initialState = {
  items: 0,
  status: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export default pizzasSlice.reducer;
