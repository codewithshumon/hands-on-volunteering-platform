import mongoose from "mongoose";

const CommunityOfferSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "declined"],
        message: "Status must be 'pending', 'accepted', or 'declined'.",
      },
      default: "pending",
    },
  },
  { timestamps: true } // Correct placement of timestamps
);

// Indexes for frequently queried fields
CommunityOfferSchema.index({ community: 1 });
CommunityOfferSchema.index({ offeredTo: 1 });
CommunityOfferSchema.index({ offeredBy: 1 });
CommunityOfferSchema.index({ status: 1 });

export default mongoose.model("CommunityOffer", CommunityOfferSchema);
