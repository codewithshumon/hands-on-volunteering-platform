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
  let messageListeners = [];

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

          // Connection handlers
          socket.on("connect", () => {
            dispatch(connectionEstablished(action.payload));
            socket.emit("authenticate", action.payload);
          });

          socket.on("disconnect", () => {
            dispatch(connectionLost());
          });

          // Message handler
          socket.on("receive-message", (message) => {
            messageListeners.forEach((listener) => {
              if (typeof listener === "function") {
                listener(message);
              }
            });
          });

          // Presence handlers
          socket.on("user-online", (userId) => {
            dispatch(userOnline(userId));
          });

          socket.on("user-offline", (userId) => {
            dispatch(userOffline(userId));
          });

          socket.on("online-users", (users) => {
            dispatch(setOnlineUsers(users));
          });
        }
        break;

      case "socket/disconnect":
        if (socket) {
          socket.disconnect();
          socket = null;
          messageListeners = [];
          dispatch(connectionLost());
        }
        break;

      case "socket/sendMessage":
        if (socket && socket.connected) {
          const state = store.getState();
          const message = {
            ...action.payload,
            senderId: state.auth.user?._id,
            timestamp: new Date().toISOString(),
          };
          socket.emit("send-message", message, (response) => {
            if (response.status === "success") {
              dispatch({
                type: "chat/messageDelivered",
                payload: response.message,
              });
            } else {
              dispatch({
                type: "chat/messageFailed",
                payload: {
                  error: response.error,
                  originalMessage: message,
                },
              });
            }
          });
        }
        break;

      case "socket/listenForMessages":
      case "chat/startListening":
        if (typeof action.payload === "function") {
          messageListeners.push(action.payload);
        }
        break;

      case "socket/removeMessageListener":
        messageListeners = messageListeners.filter(
          (listener) => listener !== action.payload
        );
        break;

      default:
        break;
    }

    return next(action);
  };
};
