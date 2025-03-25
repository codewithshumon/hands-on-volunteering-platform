import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import socketReducer from "./slices/socketSlice";
import { socketMiddleware } from "./socketMiddleware";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default Store;
