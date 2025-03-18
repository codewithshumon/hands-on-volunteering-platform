import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    default: function () {
      // Generate default avatar URL based on the user's name
      const username = this.name.split(" ")[0]; // Use the first name for the avatar
      return `https://avatar.iran.liara.run/username?username=${username}&bold=false&length=1`;
    },
  },
  skills: {
    type: [String],
    default: [],
  },
  causes: {
    type: [String],
    default: [],
  },
  volunteerHistory: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      hours: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  joinedEvents: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      hours: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: {
    type: String,
    default: null,
  },
  emailVerificationCodeExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
