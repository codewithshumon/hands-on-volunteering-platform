import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: true, //['https://shumon-mern-doctor.vercel.app']
    methods: ["POST", "GET", "PUT", "DELETE"],
    // credentials: true,
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

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("API is working");
});

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
