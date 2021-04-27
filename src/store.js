import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import mailReducer from "./reducers/mailSlice";
import furnitureReducer from "./reducers/furnitureSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    mail: mailReducer,
    furniture: furnitureReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});
