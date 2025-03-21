import mongoose from "mongoose";

const RoleOfferSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Reference to the Community model
    required: true,
  },
  offeredTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  offeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor"], // Roles that can be offered
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"], // Status of the offer
    default: "pending",
  },
  offeredAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("RoleOffer", RoleOfferSchema);
