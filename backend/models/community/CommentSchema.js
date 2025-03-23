import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityHelpPost",
      required: [true, "Post ID is required."],
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Commented by user ID is required."],
    },
    commentText: {
      type: String,
      required: [true, "Comment text is required."],
      minlength: [1, "Comment text must be at least 1 character long."],
      maxlength: [1000, "Comment text cannot exceed 1000 characters."],
    },
    replies: [
      {
        repliedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        replyText: {
          type: String,
          required: [true, "Reply text is required."],
          minlength: [1, "Reply text must be at least 1 character long."],
          maxlength: [1000, "Reply text cannot exceed 1000 characters."],
        },
        repliedAt: {
          type: Date,
          default: Date.now, // Automatically set the timestamp when a reply is created
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt for the comment
);

// Indexes for frequently queried fields
CommentSchema.index({ postId: 1 });
CommentSchema.index({ commentedBy: 1 });

export default mongoose.model("Comment", CommentSchema);
