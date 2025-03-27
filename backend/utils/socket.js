import { Server } from "socket.io";

const connectionStats = {
  totalConnections: 0,
  activeConnections: 0,
};

const onlineUsers = new Map(); // userId -> { socketId, lastActive }
const socketUsers = new Map(); // socketId -> userId

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket) => {
    connectionStats.totalConnections++;
    connectionStats.activeConnections++;

    console.log(`🔌 New connection (ID: ${socket.id})`);

    // Authentication handler
    socket.on("authenticate", (userId) => {
      if (!userId) {
        console.warn(`⚠️ Empty userId from socket ${socket.id}`);
        return;
      }

      // Update tracking maps
      onlineUsers.set(userId, {
        socketId: socket.id,
        lastActive: Date.now(),
      });
      socketUsers.set(socket.id, userId);
      socket.join(userId);

      console.log(`✅ User ${userId} authenticated (Socket: ${socket.id})`);

      // Broadcast presence
      io.emit("user-online", userId);
      socket.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // Message handler
    socket.on("send-message", (message) => {
      try {
        const senderId = socketUsers.get(socket.id);

        if (!senderId || senderId !== message.senderId) {
          throw new Error("Unauthorized message attempt");
        }

        console.log(`✉️ Message from ${senderId} to ${message.receiverId}`);

        const completeMessage = {
          ...message,
          serverTimestamp: new Date().toISOString(),
          status: "delivered",
        };

        // Send to recipient if online
        if (onlineUsers.has(message.receiverId)) {
          io.to(message.receiverId).emit("receive-message", completeMessage);
          console.log(`📤 Message delivered to ${message.receiverId}`);
        }

        // Send back to sender
        socket.emit("receive-message", {
          ...completeMessage,
          isOwn: true,
        });
      } catch (error) {
        console.error("Message handling error:", error);
        socket.emit("message-error", {
          error: error.message,
          originalMessage: message,
        });
      }
    });

    // Disconnection handler
    socket.on("disconnect", () => {
      connectionStats.activeConnections--;

      const userId = socketUsers.get(socket.id);
      if (userId) {
        onlineUsers.delete(userId);
        socketUsers.delete(socket.id);
        io.emit("user-offline", userId);
        console.log(`❌ User ${userId} disconnected`);
      }
    });
  });

  // Cleanup inactive connections
  setInterval(() => {
    const now = Date.now();
    onlineUsers.forEach((user, userId) => {
      if (now - user.lastActive > 120000) {
        onlineUsers.delete(userId);
        socketUsers.delete(user.socketId);
        io.emit("user-offline", userId);
        console.log(`♻️ Cleaned up inactive user ${userId}`);
      }
    });
  }, 60000);

  return io;
};

// Socket-related route handlers
export const socketRoutes = (app) => {
  app.get("/api/v1/socket/status", (req, res) => {
    res.json({
      serverTime: Date.now(),
      connections: {
        total: connectionStats.totalConnections,
        active: connectionStats.activeConnections,
        sockets: Array.from(socketUsers.entries()).map(
          ([socketId, userId]) => ({
            socketId,
            userId,
          })
        ),
      },
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });

  app.get("/api/v1/socket/report", (req, res) => {
    res.json({
      onlineUsers: Object.fromEntries(onlineUsers),
      socketUsers: Object.fromEntries(socketUsers),
      connectionStats,
    });
  });
};
