import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  onlineUsers: {},
  userId: null,
  socket: null, // Added socket instance
  connectionError: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectionEstablished: (state, action) => {
      console.log("Socket connection established");
      state.isConnected = true;
      state.userId = action.payload;
      state.connectionError = null;
    },
    connectionLost: (state) => {
      console.log("Socket connection lost");
      state.isConnected = false;
      state.userId = null;
    },
    setSocket: (state, action) => {
      console.log("Socket instance stored in Redux");
      state.socket = action.payload;
    },
    connectionFailed: (state, action) => {
      console.error("Socket connection failed:", action.payload);
      state.connectionError = action.payload;
    },
    userOnline: (state, action) => {
      console.log(`User ${action.payload} came online`);
      state.onlineUsers[action.payload] = true;
    },
    userOffline: (state, action) => {
      console.log(`User ${action.payload} went offline`);
      delete state.onlineUsers[action.payload];
    },
    setOnlineUsers: (state, action) => {
      console.log("Online users updated:", action.payload);
      state.onlineUsers = action.payload.reduce((acc, userId) => {
        acc[userId] = true;
        return acc;
      }, {});
    },
  },
});

export const {
  connectionEstablished,
  connectionLost,
  setSocket,
  connectionFailed,
  userOnline,
  userOffline,
  setOnlineUsers,
} = socketSlice.actions;

export default socketSlice.reducer;
