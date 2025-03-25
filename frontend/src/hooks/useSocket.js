// src/hooks/useSocket.js
import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_APP_URL || "http://localhost:3000",
      {
        autoConnect: false,
        withCredentials: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Handle socket events and authentication
  useEffect(() => {
    if (!socket || !userId) return;

    const handleConnect = () => {
      setConnectionStatus("connected");
      socket.emit("authenticate", userId);
      console.log("Socket connected and authenticated");
    };

    const handleDisconnect = () => {
      setConnectionStatus("disconnected");
      console.log("Socket disconnected");
    };

    const handleUserOnline = (userId) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: true }));
    };

    const handleUserOffline = (userId) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: false }));
    };

    const handleOnlineUsers = (users) => {
      const onlineStatus = {};
      users.forEach((id) => (onlineStatus[id] = true));
      setOnlineUsers(onlineStatus);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("user-online", handleUserOnline);
    socket.on("user-offline", handleUserOffline);
    socket.on("online-users", handleOnlineUsers);

    // Connect socket after setting up listeners
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("user-online", handleUserOnline);
      socket.off("user-offline", handleUserOffline);
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket, userId]);

  const sendMessage = useCallback(
    (receiverId, message) => {
      if (!socket || !userId) return;

      const newMessage = {
        senderId: userId,
        receiverId,
        content: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send-message", newMessage);
      return newMessage; // Return for optimistic updates
    },
    [socket, userId]
  );

  const joinChat = useCallback(
    (targetUserId) => {
      if (!socket || !userId) return;
      socket.emit("join-chat", {
        userId,
        targetUserId,
      });
    },
    [socket, userId]
  );

  return {
    socket,
    onlineUsers,
    connectionStatus,
    sendMessage,
    joinChat,
  };
};

export default useSocket;
