import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String, // URL of the profile image
    default: "", // Default will be set in the pre-save hook
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
      role: {
        type: String,
        enum: ["admin", "editor", "member"], // Roles for community members
        default: "member",
      },
    },
  ],
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  isPublic: {
    type: Boolean,
    default: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to the Event model (if you have one)
    },
  ],
  communityPost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost", // Reference to the CommunityHelpPost model
    },
  ],
});

// Pre-save hook to generate a default profile image
CommunitySchema.pre("save", function (next) {
  if (!this.profileImage) {
    // Generate a default image URL based on the community name
    const communityName = this.name.replace(/\s+/g, "+"); // Replace spaces with '+'
    this.profileImage = `https://ui-avatars.com/api/?name=${communityName}&background=random&size=200`;
  }
  next();
});

export default mongoose.model("Community", CommunitySchema);
