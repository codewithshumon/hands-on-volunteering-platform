import mongoose from "mongoose";

const CommunityJoinRequestSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // Reference to the Community model
      required: [true, "Community ID is required."],
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Requested by user ID is required."],
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: "Status must be 'pending', 'approved', or 'rejected'.",
      },
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Custom validation for acceptedBy field is required only when the status is "approved"
CommunityJoinRequestSchema.path("acceptedBy").validate(function (value) {
  if (this.status === "approved" && !value) {
    return false; // acceptedBy is required when status is "approved"
  }
  return true;
}, "Accepted by user ID is required when status is 'approved'.");

// Indexes for frequently queried fields
CommunityJoinRequestSchema.index({ community: 1 });
CommunityJoinRequestSchema.index({ requestedBy: 1 });
CommunityJoinRequestSchema.index({ acceptedBy: 1 });
CommunityJoinRequestSchema.index({ status: 1 });

export default mongoose.model(
  "CommunityJoinRequest",
  CommunityJoinRequestSchema
);
