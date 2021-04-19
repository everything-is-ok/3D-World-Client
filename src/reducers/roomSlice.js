import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoomById = createAsyncThunk(
  "room/getData",
  async (id) => {
    let response = await fetch(`http://localhost:5000/room/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    return response.data;
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
  reducers: {},
  extraReducers: {
    [getRoomById.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
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
        state.error = action.payload || null;
      }
    },
  },
});

export default roomSlice.reducer;

export const roomSelector = (state) => state.room.data;
