/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChats: {},
  messages: {},
  pendingMessages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startNewChat: (state, action) => {
      const { userId } = action.payload;
      if (!state.activeChats[userId]) {
        state.activeChats[userId] = {
          isMinimized: false,
          hasNewMessage: false,
        };
        state.messages[userId] = [];
      }
    },

    receiveMessage: (state, action) => {
      const message = action.payload;
      const chatId = message.senderId;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push(message);

      if (state.activeChats[chatId]?.isMinimized) {
        state.activeChats[chatId].hasNewMessage = true;
      }
    },

    messageDelivered: (state, action) => {
      const { tempId, messageId, serverTimestamp } = action.payload;
      // Update temporary message with server ID and timestamp
    },

    messageFailed: (state, action) => {
      const { tempId, error } = action.payload;
      // Handle message failure
    },

    markAsRead: (state, action) => {
      const { userId } = action.payload;
      if (state.activeChats[userId]) {
        state.activeChats[userId].hasNewMessage = false;
      }
    },
  },
});

export const {
  startNewChat,
  receiveMessage,
  messageDelivered,
  messageFailed,
  markAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
