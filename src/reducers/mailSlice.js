import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getMailList = createAsyncThunk(
  "mail/getMailListStatus",
  async () => {
    const response = await fetchData("GET", "/mailbox");

    return response;
  },
);

// NOTE 되는지 보려고 구현한거임. (리덕스에서 관리할 필요 없음. 열때마다 fetch하니까)
export const postMail = createAsyncThunk(
  "mail/postMailStatus",
  async (mailboxId, content) => {
    const response = await fetchData("POST", `/mailbox/mail/${mailboxId}`, content);

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

// NOTE 2순위 서버작업
export const deleteMailItem = createAsyncThunk(
  "mail/deleteMailItemStatus",
  async (mailId) => {
    const response = await fetchData("DELETE", `/mailbox/mail/${mailId}`);

    return response;
  },
);

const initialState = {
  list: null,
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
    [postMail.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [postMail.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.list = action.payload;
      }
    },
    [postMail.rejected]: (state, action) => {
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
  },
});

export default mailSlice.reducer;

export const mailSelector = (state) => state.mail.list;
