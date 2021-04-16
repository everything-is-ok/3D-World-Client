import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default roomSlice.reducer;
