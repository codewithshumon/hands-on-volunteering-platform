import mongoose from "mongoose";

const RoleOfferSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // Reference to the Community model
      required: [true, "Community ID is required."],
    },
    offeredTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Offered to user ID is required."],
    },
    offeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Offered by user ID is required."],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "editor"],
        message: "Role must be 'admin' or 'editor'.",
      },
      required: [true, "Role is required."],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "declined"],
        message: "Status must be 'pending', 'accepted', or 'declined'.",
      },
      default: "pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Indexes for frequently queried fields
RoleOfferSchema.index({ community: 1 });
RoleOfferSchema.index({ offeredTo: 1 });
RoleOfferSchema.index({ offeredBy: 1 });
RoleOfferSchema.index({ status: 1 });

export default mongoose.model("RoleOffer", RoleOfferSchema);
