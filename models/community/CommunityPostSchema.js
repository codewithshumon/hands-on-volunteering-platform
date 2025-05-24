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
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
      },
    },
    postedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    urgencyLevel: {
      type: String,
      enum: {
        values: ["low", "medium", "urgent"],
        message:
          "Invalid urgency level. Choose from 'low', 'medium', or 'urgent'.",
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
        values: ["pending", "approved"],
        message: "Invalid status. Choose from 'pending' or 'approved'.",
      },
      default: "approved",
    },
    postStatus: {
      type: String,
      enum: {
        values: ["open", "closed"],
        message: "Invalid post status. Choose from 'open' or 'closed'.",
      },
      default: "open", // Post is open by default
    },
  },
  { timestamps: true }
);

// Indexes
CommunityPostSchema.index({ "postedBy.user": 1 });
CommunityPostSchema.index({ "postedBy.community": 1 });
CommunityPostSchema.index({ urgencyLevel: 1 });
CommunityPostSchema.index({ category: 1 });
CommunityPostSchema.index({ status: 1 });
CommunityPostSchema.index({ postStatus: 1 }); // Index on postStatus
CommunityPostSchema.index({ updatedAt: -1 });
CommunityPostSchema.index({ location: 1 });
CommunityPostSchema.index({ title: "text", description: "text" });

export default mongoose.model("CommunityPost", CommunityPostSchema);
