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

    res.status(201).json(newMessage);
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
      .populate("participants", "name avatar")
      .populate("lastMessage")
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
      .populate({
        path: "sender",
        select: "_id name profileImage",
        model: "User",
      })
      .populate({
        path: "receiver",
        select: "_id name profileImage",
        model: "User",
      })
      .lean(); // Convert to plain JavaScript objects

    // Mark messages as read and update conversation
    await Promise.all([
      Message.updateMany(
        {
          sender: receiverId,
          receiver: senderId,
          read: false,
        },
        { $set: { read: true } }
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
      sender: {
        _id: message.sender._id,
        name: message.sender.name,
        avatar: message.sender.profileImage, // Using profileImage field
      },
      receiver: {
        _id: message.receiver._id,
        name: message.receiver.name,
        avatar: message.receiver.profileImage, // Using profileImage field
      },
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

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Mark all messages in this conversation as read
    await Message.updateMany(
      {
        $or: [
          {
            sender: conversation.participants[0],
            receiver: conversation.participants[1],
          },
          {
            sender: conversation.participants[1],
            receiver: conversation.participants[0],
          },
        ],
        read: false,
      },
      { $set: { read: true } }
    );

    // Reset unread count
    conversation.unreadCount = 0;
    await conversation.save();

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
