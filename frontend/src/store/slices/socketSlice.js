import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  onlineUsers: {},
  userId: null,
  socket: null,
  connectionError: null,
  messageListeners: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectionEstablished: (state, action) => {
      state.isConnected = true;
      state.userId = action.payload;
      state.connectionError = null;
    },
    connectionLost: (state) => {
      state.isConnected = false;
      state.userId = null;
      state.socket = null;
      state.messageListeners = [];
    },
    setSocketInstance: (state, action) => {
      state.socket = action.payload;
    },
    connectionFailed: (state, action) => {
      state.connectionError = action.payload;
    },
    userOnline: (state, action) => {
      state.onlineUsers[action.payload] = true;
    },
    userOffline: (state, action) => {
      delete state.onlineUsers[action.payload];
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload.reduce((acc, userId) => {
        acc[userId] = true;
        return acc;
      }, {});
    },
    addMessageListener: (state, action) => {
      if (typeof action.payload === "function") {
        state.messageListeners.push(action.payload);
      }
    },
    removeMessageListener: (state, action) => {
      state.messageListeners = state.messageListeners.filter(
        (listener) => listener !== action.payload
      );
    },
  },
});

export const {
  connectionEstablished,
  connectionLost,
  setSocketInstance,
  connectionFailed,
  userOnline,
  userOffline,
  setOnlineUsers,
  addMessageListener,
  removeMessageListener,
} = socketSlice.actions;

export default socketSlice.reducer;
