import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      index: true,
      required: true, // Changed to required for better data integrity
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (senderId) {
          const conversation = await mongoose
            .model("Conversation")
            .findById(this.conversation);
          return conversation?.participants.includes(senderId);
        },
        message: "Sender must be a conversation participant",
      },
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (receiverId) {
          const conversation = await mongoose
            .model("Conversation")
            .findById(this.conversation);
          return conversation?.participants.includes(receiverId);
        },
        message: "Receiver must be a conversation participant",
      },
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    read: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Primary query patterns
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

// For unread messages count
MessageSchema.index({ conversation: 1, read: 1 });

// For full-text search
MessageSchema.index({ content: "text" });

// Pre-save to ensure participants are valid
MessageSchema.pre("save", async function (next) {
  if (!this.conversation) {
    throw new Error("Message must belong to a conversation");
  }
  next();
});

export default mongoose.model("Message", MessageSchema);
