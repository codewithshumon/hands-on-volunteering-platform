import mongoose from "mongoose";

const CommunityPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  urgencyLevel: {
    type: String,
    enum: ["low", "medium", "urgent"],
    default: "medium",
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  volunteersNeeded: {
    type: Number,
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Reference to the Comment model
    },
  ],
});

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
