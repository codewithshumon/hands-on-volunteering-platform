import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (socket) {
    return socket;
  }

  socket = io(import.meta.env.VITE_API_APP_URL || "http://localhost:3000", {
    withCredentials: true,
    auth: { userId },
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
