import express from "express";
import {
  sendMessage,
  getConversations,
  getMessages,
  markAsRead,
} from "../controllers/messageController.js";
import verifyToken from "../controllers/authController.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage);
router.get("/conversations/:userId", verifyToken, getConversations);
router.get("/:senderId/:receiverId", verifyToken, getMessages);
router.put("/read/:conversationId", verifyToken, markAsRead);

export default router;
