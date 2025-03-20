import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date, // Store as Date object
    required: true,
  },
  endTime: {
    type: Date, // Store as Date object
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "environment",
      "education",
      "humanitarian",
      "health",
      "animals",
      "community",
      "youth",
    ],
  },
  volunteersNeeded: {
    type: Number,
    required: true,
    min: 1,
  },
  attendees: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      profileImage: { type: String },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  eventHours: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to calculate eventHours
EventSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    throw new Error("End time must be after start time.");
  }

  // Calculate the difference between startTime and endTime in hours
  const start = this.startTime.getTime();
  const end = this.endTime.getTime();

  // Calculate the difference in hours
  const diffHours = (end - start) / (1000 * 60 * 60);

  // Assign the calculated hours to eventHours
  this.eventHours = diffHours;

  next();
});

export default mongoose.model("Event", EventSchema);
