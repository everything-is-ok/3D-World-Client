import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getFurniture = createAsyncThunk(
  "furniture/getFurniture",
  async () => {
    const response = await fetchData("GET", "/furniture");

    return response;
  },
);

// TODO 현재는 furniture 스토어 자체가 필요가 없는 상태입니다
const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {},
  extraReducers: {
    [getFurniture.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getFurniture.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [getFurniture.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
  },
});

export default furnitureSlice.reducer;
