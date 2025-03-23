import mongoose from "mongoose";

const CommunityPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Posted by user ID is required."],
    },
    urgencyLevel: {
      type: String,
      enum: {
        values: ["low", "medium", "urgent"],
        message: "Invalid urgency level.",
      },
      default: "medium",
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters."],
    },
    status: {
      type: String,
      enum: {
        values: ["open", "closed"],
        message: "Invalid status.",
      },
      default: "open",
    },
    volunteersNeeded: {
      type: Number,
      required: [true, "Number of volunteers needed is required."],
      min: [1, "At least 1 volunteer is required."],
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Attendee ID is required."],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: [true, "Comment ID is required."],
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Indexes for frequently queried fields
CommunityPostSchema.index({ postedBy: 1 }); // Index on postedBy
CommunityPostSchema.index({ urgencyLevel: 1 }); // Index on urgencyLevel
CommunityPostSchema.index({ category: 1 }); // Index on category
CommunityPostSchema.index({ status: 1 }); // Index on status

export default mongoose.model("CommunityPost", CommunityPostSchema);
