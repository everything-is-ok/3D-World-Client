import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getItems = createAsyncThunk(
  "item/getItems",
  async () => {
    const response = await fetchData("GET", "/item");

    return response;
  },
);

// TODO roomId 필요없으면 items 배열만 받도록 수정
const initialState = {
  // list: [],
  data: null,
  error: null,
  status: "idle",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: {
    [getItems.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getItems.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [getItems.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
  },
});

export default itemSlice.reducer;

export const itemSelector = (state) => state.item.data.items;
