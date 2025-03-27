import { io } from "socket.io-client";
import {
  connectionEstablished,
  connectionLost,
  setSocket,
  connectionFailed,
  userOnline,
  userOffline,
} from "./slices/socketSlice";

export const socketMiddleware = (store) => {
  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    switch (type) {
      case "socket/connect": {
        console.log("Connecting socket...");
        try {
          const socket = io(
            import.meta.env.VITE_API_APP_URL || "http://localhost:3000",
            {
              withCredentials: true,
              auth: {
                token: payload.token,
                userId: payload.userId,
              },
              reconnectionAttempts: 5,
              reconnectionDelay: 1000,
            }
          );

          dispatch(setSocket(socket));

          socket.on("connect", () => {
            console.log("Socket connected, authenticating...");
            socket.emit("authenticate", {
              userId: payload.userId,
              token: payload.token,
            });
          });

          socket.on("authenticated", () => {
            console.log("Socket authenticated successfully");
            dispatch(connectionEstablished(payload.userId));
          });

          socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
            dispatch(connectionLost());
          });

          socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
            dispatch(connectionFailed(err.message));
          });

          socket.on("receive-message", (message) => {
            console.log("Received real-time message:", message);
            dispatch({
              type: "chat/receiveMessage",
              payload: message,
            });
          });

          socket.on("message-status", (update) => {
            console.log("Message status update:", update);
            dispatch({
              type: "chat/updateMessageStatus",
              payload: update,
            });
          });

          socket.on("presence-update", ({ userId, status }) => {
            console.log(`Presence update: ${userId} is now ${status}`);
            if (status === "online") {
              dispatch(userOnline(userId));
            } else {
              dispatch(userOffline(userId));
            }
          });
        } catch (err) {
          console.error("Socket initialization error:", err);
          dispatch(connectionFailed(err.message));
        }
        break;
      }

      case "socket/disconnect": {
        console.log("Disconnecting socket...");
        if (store.getState().socket.socket) {
          store.getState().socket.socket.disconnect();
          dispatch(connectionLost());
        }
        break;
      }

      case "socket/sendMessage": {
        console.log("Sending message via socket:", payload);
        const socket = store.getState().socket.socket;
        if (socket?.connected) {
          socket.emit("send-message", payload, (ack) => {
            if (ack?.error) {
              console.error("Message send error:", ack.error);
              dispatch({
                type: "chat/messageFailed",
                payload: {
                  tempId: payload.tempId,
                  error: ack.error,
                },
              });
            } else {
              console.log("Message acknowledged:", ack);
            }
          });
        } else {
          console.error("Socket not connected when trying to send message");
        }
        break;
      }

      default:
        return next(action);
    }
  };
};
