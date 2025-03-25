import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  onlineUsers: {},
  userId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectionEstablished: (state, action) => {
      state.isConnected = true;
      state.userId = action.payload;
    },
    connectionLost: (state) => {
      state.isConnected = false;
      state.userId = null;
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
  },
});

export const {
  connectionEstablished,
  connectionLost,
  userOnline,
  userOffline,
  setOnlineUsers,
} = socketSlice.actions;

export default socketSlice.reducer;
