import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getItems = createAsyncThunk(
  "item/getItems",
  async () => {
    const response = await fetchData("GET", "/item");

    return response;
  },
);

// TODO 현재는 item 스토어 자체가 필요가 없는 상태입니다
const initialState = {
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

export const itemSelector = (state) => state.item.data.items || [];
