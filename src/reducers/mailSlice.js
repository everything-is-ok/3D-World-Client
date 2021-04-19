import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData";

export const getMailList = createAsyncThunk(
  "mail/getListStatus",
  async () => {
    const response = await fetchData("GET", "/mailbox");
    return response;
  },
);

export const deleteMailItem = createAsyncThunk(
  "mail/deleteMailItemStatus",
  async (mailId) => {
    const response = await fetchData("DELETE", `/mailbox/mail/${mailId}`);
    return response;
  },
);

export const deleteMailList = createAsyncThunk(
  "mail/deleteMailListStatus",
  async () => {
    const response = await fetchData("DELETE", "/mailbox");
    return response;
  },
);

const initialState = {
  list: [
    {
      sender: "oaisdjfekfj",
      content: "hi",
      status: "NEW",
    },
    {
      sender: "oaisdjfekfj",
      content: "hi2",
      status: "NEW",
    },
    {
      sender: "oaisdjfekfj",
      content: "hi3",
      status: "NEW",
    },
  ],
  error: null,
  status: "idle",
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {},
  extraReducers: {
    [getMailList.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getMailList.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.list = action.payload;
      }
    },
    [getMailList.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
    [deleteMailItem.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [deleteMailItem.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.list = action.payload;
      }
    },
    [deleteMailItem.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
    [deleteMailList.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [deleteMailList.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.list = action.payload;
      }
    },
    [deleteMailList.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.payload || null;
      }
    },
  },
});

export default mailSlice.reducer;

export const mailSelector = (state) => state.mail.list;
