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
    type: String,
    required: true,
  },
  endTime: {
    type: String,
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
  const start = this.startTime.split(":"); // Split startTime into hours and minutes
  const end = this.endTime.split(":"); // Split endTime into hours and minutes

  // Convert times to total minutes
  const startMinutes = parseInt(start[0], 10) * 60 + parseInt(start[1], 10);
  const endMinutes = parseInt(end[0], 10) * 60 + parseInt(end[1], 10);

  // Calculate the difference in hours
  const diffMinutes = endMinutes - startMinutes;
  this.eventHours = diffMinutes / 60; // Store the hour difference

  next();
});

export default mongoose.model("Event", EventSchema);
