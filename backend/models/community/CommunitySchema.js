import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Community name is required."],
      trim: true,
      minlength: [3, "Community name must be at least 3 characters long."],
      maxlength: [100, "Community name cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Community description is required."],
      trim: true,
      minlength: [
        10,
        "Community description must be at least 10 characters long.",
      ],
      maxlength: [300, "Community description cannot exceed 300 characters."],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator ID is required."],
    },
    profileImage: {
      type: String,
      default: "", // Default will be set in the pre-save hook
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User ID is required."],
        },
        role: {
          type: String,
          enum: ["admin", "editor", "member"],
          default: "member",
        },
      },
    ],

    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Virtual property for default profile image
CommunitySchema.virtual("defaultProfileImage").get(function () {
  const communityName = this.name.replace(/\s+/g, "+");
  return `https://ui-avatars.com/api/?name=${communityName}&background=random&size=200`;
});

// Pre-save hook to generate a default profile image
CommunitySchema.pre("save", function (next) {
  if (!this.profileImage) {
    this.profileImage = this.defaultProfileImage;
  }
  next();
});

// Indexes for frequently queried fields
CommunitySchema.index({ createdBy: 1 }); // Index on createdBy
CommunitySchema.index({ isPublic: 1 }); // Index on isPublic
CommunitySchema.index({ tags: 1 }); // Index on tags
CommunitySchema.index({ updatedAt: -1 }); // Index on updatedAt

export default mongoose.model("Community", CommunitySchema);
