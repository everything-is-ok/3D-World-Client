import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../api";

export const foo = createAsyncThunk(
  "user/foo",
  async (baz) => {
    const response = await API.fetchFunction(baz);

    return response;
  },
);

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    bar(state, action) {

    },
  },
  extraReducers: {
    [foo.pending]: (state, action) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [foo.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
      }
    },
    [foo.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
      }
    },
  },
});

export const { bar } = userSlice.actions;

export default userSlice.reducer;

export const someSelector = (state) => state.data.someNestedValue;
