import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  error: null,
  status: "idle",
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default mailSlice.reducer;
