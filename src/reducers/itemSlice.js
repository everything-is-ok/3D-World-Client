import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  error: null,
  status: "idle",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default itemSlice.reducer;
