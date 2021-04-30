import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import mailReducer from "./reducers/mailSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    mail: mailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
