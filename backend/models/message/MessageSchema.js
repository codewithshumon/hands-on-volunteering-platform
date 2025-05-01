import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      index: true,
      required: true,
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
    readAt: {
      type: Date,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["sending", "delivered", "read", "failed"],
      default: "delivered",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Indexes
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
MessageSchema.index({ conversation: 1, read: 1 });
MessageSchema.index({ content: "text" });

// Pre-save hooks
MessageSchema.pre("save", async function (next) {
  if (!this.conversation) {
    throw new Error("Message must belong to a conversation");
  }

  if (this.isModified("read") && this.read) {
    this.readAt = new Date();
    this.status = "read";
  }

  if (this.isNew && !this.status) {
    this.status = "delivered";
  }

  next();
});

// Static methods
MessageSchema.statics.markAsRead = async function (messageIds, readerId) {
  return this.updateMany(
    { _id: { $in: messageIds } },
    { $set: { read: true, readAt: new Date(), status: "read" } }
  );
};

export default mongoose.model("Message", MessageSchema);
