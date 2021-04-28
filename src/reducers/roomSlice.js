import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getRoomById = createAsyncThunk(
  "room/getData",
  async (id) => {
    const response = await fetchData("GET", `/room/${id}`);

    return response;
  },
);

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.status = "pending";
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getRoomById.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
        state.data = null;
      }
    },
    [getRoomById.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [getRoomById.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error || null;
      }
    },
  },
});

export const { updateError } = roomSlice.actions;

export default roomSlice.reducer;

export const roomSelector = (state) => state.room.data;
