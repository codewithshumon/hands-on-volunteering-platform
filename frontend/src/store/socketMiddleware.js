import { io } from "socket.io-client";
import {
  connectionEstablished,
  connectionLost,
  setOnlineUsers,
  userOffline,
  userOnline,
} from "./slices/socketSlice";

export const socketMiddleware = (store) => {
  let socket = null;
  const messageListeners = new Map();

  return (next) => (action) => {
    const { dispatch } = store;

    switch (action.type) {
      case "socket/connect":
        if (!socket && action.payload) {
          socket = io(
            import.meta.env.VITE_API_APP_URL || "http://localhost:3000",
            {
              withCredentials: true,
              auth: { userId: action.payload },
            }
          );

          socket.on("connect", () => {
            dispatch(connectionEstablished(action.payload));
            socket.emit("authenticate", action.payload);
          });

          socket.on("disconnect", () => {
            dispatch(connectionLost());
          });

          socket.on("receive-message", (message) => {
            const listenerId = `chat-${message.senderId}-${message.receiverId}`;
            const handler = messageListeners.get(listenerId);
            if (handler) handler(message);
          });

          socket.on("user-online", (userId) => dispatch(userOnline(userId)));
          socket.on("user-offline", (userId) => dispatch(userOffline(userId)));
          socket.on("online-users", (users) => dispatch(setOnlineUsers(users)));
          socket.on("message-error", (error) => {
            console.error("Socket error:", error);
          });
        }
        break;

      case "socket/disconnect":
        if (socket) {
          socket.disconnect();
          socket = null;
          messageListeners.clear();
          dispatch(connectionLost());
        }
        break;

      case "socket/sendMessage":
        if (socket?.connected) {
          socket.emit("send-message", action.payload);
        }
        break;

      case "socket/registerMessageListener":
        if (action.payload.listenerId && action.payload.handler) {
          messageListeners.set(
            action.payload.listenerId,
            action.payload.handler
          );
        }
        break;

      case "socket/unregisterMessageListener":
        messageListeners.delete(action.payload);
        break;

      default:
        return next(action);
    }
  };
};
