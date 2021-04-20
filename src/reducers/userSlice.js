import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../api";
import fetchData from "../utils/fetchData";

export const getUserByToken = createAsyncThunk(
  "user/getUserByToken",
  async () => {
    const response = await fetchData("GET", "/user");

    return response;
  },
);

export const userLogin = createAsyncThunk(
  "user/login",
  async () => {
    const response = await API.onSocialLogin();

    return response;
  },
);

export const updateUserData = createAsyncThunk(
  "user/update",
  async (data) => {
    const response = await fetchData("PATCH", "/user", data);

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
    logout: () => {
      document.cookie = `authorization=; expires=${new Date(0)}; path=/`;
      return initialState;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [userLogin.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [userLogin.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
    [updateUserData.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [updateUserData.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [updateUserData.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload;
      }
    },
    [getUserByToken.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getUserByToken.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [getUserByToken.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload;
      }
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user.data;
