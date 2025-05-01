import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: [
        {
          validator: function (participants) {
            return participants.length === 2;
          },
          message: "Conversation must have exactly 2 participants",
        },
        {
          validator: function (participants) {
            return (
              new Set(participants.map((p) => p.toString())).size ===
              participants.length
            );
          },
          message: "Conversation cannot have duplicate participants",
        },
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    unreadCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Ensure unique conversations between participants
ConversationSchema.index(
  { participants: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 }, // Case-insensitive
  }
);

// For sorting conversations by last activity
ConversationSchema.index({ updatedAt: -1 });

// Virtual for easier access to the other participant
ConversationSchema.virtual("otherParticipant").get(function () {
  return this.participants.find(
    (p) => p.toString() !== this.currentUser?.toString()
  );
});

// Sort participants consistently
ConversationSchema.pre("save", function (next) {
  this.participants.sort((a, b) => a.toString().localeCompare(b.toString()));
  next();
});

export default mongoose.model("Conversation", ConversationSchema);
