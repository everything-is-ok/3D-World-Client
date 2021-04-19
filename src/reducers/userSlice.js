import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../api";

export const userLogin = createAsyncThunk(
  "user/login",
  async () => {
    const response = await API.onSocialLogin();
    return response;
  },
);

const initialState = {
  data: {
    _id: "607ce96d6f5315d728c33539",
    friends: [],
    description: "자기소개를 작성하세요.",
    photoURL: "https://lh3.googleusercontent.com/a-/AOh14GhkbeMzISGvUBRiZ3HmJA1mTg78SUBua1u_NuIC=s96-c",
    musicURL: "https://www.youtube.com/watch?v=MzPjJQIQ0-s",
    email: "maudlinsy@gmail.com",
    name: "div-div-span helloworld",
    createdAt: "2021-04-19T02:22:37.992Z",
    roomId: "607ce96d6f5315d728c3353a",
  },
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
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
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user.data;
