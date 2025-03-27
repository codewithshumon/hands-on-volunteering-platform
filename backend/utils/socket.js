import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message/MessageSchema.js";
import Conversation from "../models/message/ConversationSchema.js";

const onlineUsers = new Map();

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error("No token provided");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      console.log(`Authenticated socket for user ${decoded.userId}`);
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id} (User: ${socket.userId})`);

    socket.on("authenticate", ({ userId, token }) => {
      try {
        if (userId !== socket.userId) throw new Error("User ID mismatch");

        onlineUsers.set(userId, {
          socketId: socket.id,
          lastActive: Date.now(),
        });

        socket.join(userId);
        socket.emit("authenticated");

        io.emit("presence-update", {
          userId,
          status: "online",
        });

        console.log(`User ${userId} authenticated on socket ${socket.id}`);
      } catch (err) {
        console.error("Authentication error:", err.message);
        socket.disconnect();
      }
    });

    socket.on("send-message", async (messageData, acknowledge) => {
      try {
        console.log("Received message data:", messageData);

        const { senderId, receiverId, content, conversationId, tempId } =
          messageData;

        if (!onlineUsers.has(senderId)) {
          throw new Error(`Sender ${senderId} not found in online users`);
        }

        console.log(`Saving message from ${senderId} to ${receiverId}`);
        const message = await Message.create({
          conversation: conversationId,
          sender: senderId,
          receiver: receiverId,
          content,
          status: "delivered",
        });

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          $inc: { unreadCount: 1 },
        });

        const messageToSend = {
          _id: message._id,
          conversation: conversationId,
          sender: senderId,
          receiver: receiverId,
          content,
          status: "delivered",
          createdAt: message.createdAt,
          tempId,
        };

        // Send to receiver if online
        if (onlineUsers.has(receiverId)) {
          const receiverSocket = onlineUsers.get(receiverId).socketId;
          console.log(`Sending to receiver socket: ${receiverSocket}`);
          io.to(receiverSocket).emit("receive-message", {
            ...messageToSend,
            isOwn: false,
          });
        }

        // Send back to sender
        const senderSocket = onlineUsers.get(senderId).socketId;
        console.log(`Sending to sender socket: ${senderSocket}`);
        io.to(senderSocket).emit("receive-message", {
          ...messageToSend,
          isOwn: true,
        });

        acknowledge({
          _id: message._id,
          tempId,
          status: "delivered",
          timestamp: message.createdAt,
        });

        console.log(`Message ${message._id} processed successfully`);
      } catch (error) {
        console.error("Message processing error:", error);
        acknowledge({ error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      for (const [userId, data] of onlineUsers.entries()) {
        if (data.socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("presence-update", {
            userId,
            status: "offline",
          });
          console.log(`User ${userId} marked offline`);
          break;
        }
      }
    });

    // Health check
    socket.on("ping", (cb) => {
      console.log("Received ping from", socket.id);
      cb();
    });
  });

  // Log online users periodically
  setInterval(() => {
    console.log("Currently online users:", Array.from(onlineUsers.keys()));
  }, 30000);

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
