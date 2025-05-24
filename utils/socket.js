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
    connectionStateRecovery: {
      maxDisconnectionDuration: 120000,
    },
  });

  io.on("connection", (socket) => {
    connectionStats.totalConnections++;
    connectionStats.activeConnections++;

    console.log(`🔌 New connection (ID: ${socket.id})`);
    console.log(
      `📊 Stats: ${connectionStats.activeConnections} active / ${connectionStats.totalConnections} total`
    );

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
      socket.join(userId); // Join user-specific room

      console.log(`✅ User ${userId} authenticated (Socket: ${socket.id})`);
      console.log(`👥 Online users: ${onlineUsers.size}`);

      // Broadcast presence
      io.emit("user-online", userId);
      socket.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // Message handler
    socket.on("send-message", (message, callback) => {
      try {
        const senderId = socketUsers.get(socket.id);

        // Validate sender
        if (!senderId || senderId !== message.senderId) {
          throw new Error("Unauthorized message attempt");
        }

        console.log(`✉️ Message from ${senderId} to ${message.receiverId}`);

        // Add server-side timestamp
        const completeMessage = {
          ...message,
          serverTimestamp: new Date().toISOString(),
          status: "delivered",
        };

        // Check if recipient is online
        if (onlineUsers.has(message.receiverId)) {
          // Send to recipient's room
          io.to(message.receiverId).emit("receive-message", completeMessage);
          console.log(`📤 Message delivered to ${message.receiverId}`);
        } else {
          console.log(`⏳ ${message.receiverId} is offline, storing message`);
          // Here you would typically store the message in your database
        }

        // Send delivery confirmation to sender
        callback({
          status: "success",
          message: completeMessage,
        });

        // Also send back to sender for their own chat
        socket.emit("receive-message", {
          ...completeMessage,
          isOwn: true,
        });
      } catch (error) {
        console.error("Message handling error:", error);
        callback({
          status: "error",
          error: error.message,
        });
      }
    });

    // Heartbeat for connection monitoring
    socket.on("heartbeat", (userId) => {
      if (onlineUsers.has(userId)) {
        onlineUsers.get(userId).lastActive = Date.now();
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

      console.log(
        `📊 Stats: ${connectionStats.activeConnections} active / ${connectionStats.totalConnections} total`
      );
    });
  });

  // Cleanup inactive connections
  setInterval(() => {
    const now = Date.now();
    onlineUsers.forEach((user, userId) => {
      if (now - user.lastActive > 120000) {
        // 2 minutes inactive
        onlineUsers.delete(userId);
        socketUsers.delete(user.socketId);
        io.emit("user-offline", userId);
        console.log(`♻️ Cleaned up inactive user ${userId}`);
      }
    });
  }, 60000); // Run every minute

  return io;
};

function cleanupInactiveUsers() {
  const now = Date.now();
  onlineUsers.forEach((user, userId) => {
    if (now - user.lastActive > 120000) {
      onlineUsers.delete(userId);
      socketUsers.delete(user.socketId);
      io.emit("user-offline", userId);
      console.log(`♻️ Cleaned up inactive user ${userId}`);
    }
  });
}

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

//
//
//Index.js
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import mongoose from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import "./config/cron.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import communityRoutes from "./routes/communityRoutes.js";

// const app = express();
// const port = process.env.PORT || 8000;

// // Create HTTP server
// const server = createServer(app);

// // Initialize Socket.IO with enhanced configuration
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
//   pingTimeout: 60000,
//   pingInterval: 25000,
//   connectionStateRecovery: {
//     maxDisconnectionDuration: 120000,
//   },
// });

// // Enhanced connection tracking
// const connectionStats = {
//   totalConnections: 0,
//   activeConnections: 0,
// };

// const onlineUsers = new Map(); // userId -> { socketId, lastActive }
// const socketUsers = new Map(); // socketId -> userId

// // Socket.IO connection handler
// io.on("connection", (socket) => {
//   connectionStats.totalConnections++;
//   connectionStats.activeConnections++;

//   console.log(`🔌 New connection (ID: ${socket.id})`);
//   console.log(
//     `📊 Stats: ${connectionStats.activeConnections} active / ${connectionStats.totalConnections} total`
//   );

//   // Authentication handler
//   socket.on("authenticate", (userId) => {
//     if (!userId) {
//       console.warn(`⚠️  Empty userId from socket ${socket.id}`);
//       return;
//     }

//     // Update tracking maps
//     onlineUsers.set(userId, {
//       socketId: socket.id,
//       lastActive: Date.now(),
//     });
//     socketUsers.set(socket.id, userId);

//     console.log(`✅ User ${userId} authenticated (Socket: ${socket.id})`);
//     console.log(`👥 Online users: ${onlineUsers.size}`);

//     // Broadcast presence
//     io.emit("user-online", userId);
//     socket.emit("online-users", Array.from(onlineUsers.keys()));
//   });

//   // Heartbeat monitoring
//   socket.on("heartbeat", (userId) => {
//     if (onlineUsers.has(userId)) {
//       onlineUsers.get(userId).lastActive = Date.now();
//     }
//   });

//   // Health check endpoint
//   socket.on("health-check", (callback) => {
//     const userId = socketUsers.get(socket.id);
//     callback({
//       status: "healthy",
//       timestamp: Date.now(),
//       userId,
//       socketId: socket.id,
//       onlineUsers: Array.from(onlineUsers.keys()),
//     });
//   });

//   // Disconnection handler
//   socket.on("disconnect", () => {
//     connectionStats.activeConnections--;

//     const userId = socketUsers.get(socket.id);
//     if (userId) {
//       onlineUsers.delete(userId);
//       socketUsers.delete(socket.id);

//       console.log(`❌ User ${userId} disconnected`);
//       console.log(`👥 Remaining online: ${onlineUsers.size}`);

//       io.emit("user-offline", userId);
//     }

//     console.log(
//       `📊 Stats: ${connectionStats.activeConnections} active / ${connectionStats.totalConnections} total`
//     );
//   });
// });

// // Dead connection cleanup
// setInterval(() => {
//   const now = Date.now();
//   onlineUsers.forEach((user, userId) => {
//     if (now - user.lastActive > 120000) {
//       // 2 minutes inactive
//       onlineUsers.delete(userId);
//       socketUsers.delete(user.socketId);
//       io.emit("user-offline", userId);
//       console.log(`♻️  Cleaned up inactive user ${userId}`);
//     }
//   });
// }, 60000); // Run every minute

// // Express middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// mongoose.set("strictQuery", false);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL);
//     console.log("MongoDB database is connected");
//   } catch (error) {
//     console.log(`MongoDB database connection failed: ${error}`);
//   }
// };

// // Status endpoints
// app.get("/api/socket/status", (req, res) => {
//   res.json({
//     serverTime: Date.now(),
//     connections: {
//       total: connectionStats.totalConnections,
//       active: connectionStats.activeConnections,
//       sockets: Array.from(socketUsers.entries()).map(([socketId, userId]) => ({
//         socketId,
//         userId,
//       })),
//     },
//     onlineUsers: Array.from(onlineUsers.keys()),
//   });
// });

// app.get("/api/socket/debug", (req, res) => {
//   res.json({
//     onlineUsers: Object.fromEntries(onlineUsers),
//     socketUsers: Object.fromEntries(socketUsers),
//     connectionStats,
//   });
// });

// // Routes
// app.get("/", (req, res) => {
//   res.send("API is working");
// });

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/event", eventRoutes);
// app.use("/api/v1/community", communityRoutes);

// // Start server
// server.listen(port, () => {
//   connectDB();
//   console.log(`Server is running on port ${port}`);
//   console.log(`Socket.IO listening for connections`);
// });
