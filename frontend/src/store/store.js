import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import socketReducer from "./slices/socketSlice";
import { socketMiddleware } from "./socketMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "socket/registerMessageListener",
          "socket/unregisterMessageListener",
        ],
      },
    }).concat(socketMiddleware),
});

export default store;
