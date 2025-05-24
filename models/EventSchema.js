import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },
    date: {
      type: Date,
      required: [true, "Event date is required."],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Event date must be a valid date.",
      },
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required."],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Start time must be a valid date.",
      },
    },
    endTime: {
      type: Date,
      required: [true, "End time is required."],
      validate: {
        validator: function (value) {
          return (
            value instanceof Date && !isNaN(value) && value > this.startTime
          );
        },
        message: "End time must be a valid date and after start time.",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: {
        values: [
          "environment",
          "education",
          "humanitarian",
          "health",
          "animals",
          "community",
          "youth",
        ],
        message: "Invalid category.",
      },
    },
    volunteersNeeded: {
      type: Number,
      required: [true, "Number of volunteers needed is required."],
      min: [1, "At least 1 volunteer is required."],
    },
    attendees: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator ID is required."],
    },
    status: {
      type: String,
      enum: {
        values: ["upcoming", "ongoing", "completed"],
        message: "Invalid status.",
      },
      default: "upcoming",
    },
    eventHours: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Pre-save hook to calculate eventHours
EventSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    throw new Error("End time must be after start time.");
  }

  // Calculate the difference between startTime and endTime in hours
  const start = this.startTime.getTime();
  const end = this.endTime.getTime();
  const diffHours = (end - start) / (1000 * 60 * 60);

  // Assign the calculated hours to eventHours
  this.eventHours = diffHours;

  next();
});

// Indexes for frequently queried fields
EventSchema.index({ createdBy: 1 }); // Index on createdBy
EventSchema.index({ status: 1 }); // Index on status
EventSchema.index({ category: 1 }); // Index on category
EventSchema.index({ title: "text", description: "text" }); // Text index for search
EventSchema.index({ date: 1 }); // Index on date
EventSchema.index({ updatedAt: -1 }); // Index on updatedAt

export default mongoose.model("Event", EventSchema);
