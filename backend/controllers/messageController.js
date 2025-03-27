import mongoose from "mongoose";
import Message from "../models/message/MessageSchema.js";
import Conversation from "../models/message/ConversationSchema.js";

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    // Validate input
    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if sender and receiver are the same
    if (sender === receiver) {
      return res.status(400).json({ error: "Cannot send message to yourself" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      conversation: conversation._id,
      sender,
      receiver,
      content,
    });

    // Update conversation
    conversation.lastMessage = newMessage._id;
    conversation.unreadCount += 1;
    await conversation.save();

    // Populate sender/receiver for socket emission
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name profileImage")
      .populate("receiver", "name profileImage")
      .lean();

    res.status(201).json({
      ...populatedMessage,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("[ERROR in sendMessage]", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .populate("participants", "name profileImage")
      .populate({
        path: "lastMessage",
        populate: [
          { path: "sender", select: "name profileImage" },
          { path: "receiver", select: "name profileImage" },
        ],
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Validate input
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ error: "Invalid user IDs" });
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name profileImage")
      .populate("receiver", "name profileImage")
      .lean();

    // Mark messages as read and update conversation
    await Promise.all([
      Message.updateMany(
        {
          sender: receiverId,
          receiver: senderId,
          read: false,
        },
        { $set: { read: true, readAt: new Date(), status: "read" } }
      ),
      Conversation.updateOne(
        {
          participants: { $all: [senderId, receiverId] },
        },
        {
          $set: { unreadCount: 0 },
          $currentDate: { lastRead: true },
        }
      ),
    ]);

    // Format the response
    const formattedMessages = messages.map((message) => ({
      ...message,
      isOwn: message.sender._id.toString() === senderId,
      timestamp: message.createdAt,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("[ERROR in getMessages]:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
      details: error.message,
    });
  }
};

// Mark messages as read
export const markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get the other participant
    const otherParticipant = conversation.participants.find(
      (p) => p.toString() !== userId
    );

    if (!otherParticipant) {
      return res.status(400).json({ error: "Invalid conversation" });
    }

    // Mark all messages from other participant as read
    await Message.updateMany(
      {
        sender: otherParticipant,
        receiver: userId,
        read: false,
      },
      { $set: { read: true, readAt: new Date(), status: "read" } }
    );

    // Reset unread count
    conversation.unreadCount = 0;
    await conversation.save();

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
