import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { initializeSocket, socketRoutes } from "./utils/socket.js";
import "./config/cron.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

// Create HTTP server
const server = createServer(app);

// Express middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB database is connected");
  } catch (error) {
    console.log(`MongoDB database connection failed: ${error}`);
  }
};

// Start server
server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

// Initialize Socket.IO
initializeSocket(server);

// Add socket-related routes
socketRoutes(app);

// Basic routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/community", communityRoutes);
