import mongoose from "mongoose";
const { Types } = mongoose;

import Event from "../models/EventSchema.js";

export const getAllEvents = async (req, res) => {
  const { status, userId } = req.query;

  try {
    // Define the query object
    const query = {};

    // Add status to the query if provided
    if (status) {
      if (Array.isArray(status)) {
        query.status = { $in: status }; // Filter for multiple statuses
      } else {
        query.status = status; // Filter for a single status
      }
    }

    // Add userId to the query if provided
    if (userId) {
      // Validate userId before converting to ObjectId
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({
          message: "Invalid userId format",
        });
      }

      // Use $or to check if userId is in attendees or createdBy
      query.$or = [
        { "attendees.userId": new Types.ObjectId(userId) }, // Check attendees
        { createdBy: new Types.ObjectId(userId) }, // Check createdBy
      ];
    }

    // Fetch events based on the query
    const events = await Event.find(query)
      .populate("createdBy", "name profileImage _id") // Populate creator details
      .populate({
        path: "attendees.userId", // Populate the userId field in attendees
        select: "name profileImage _id", // Select the fields to populate
      });

    res.status(200).json({
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.log("[ERROR in getAllEvents]", error);

    res.status(500).json({
      message: "Error fetching events",
      error: error.message, // Send only the error message for clarity
    });
  }
};
export const getMyEvents = async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await Event.find({ createdBy: userId }).populate(
      "createdBy",
      "name profileImage _id"
    ); // Populate creator details

    res
      .status(200)
      .json({ message: "Your events fetched successfully", data: events });
  } catch (error) {
    console.log("[ERROR in getMyEvens]", error);
    res.status(500).json({ message: "Error fetching your events", error });
  }
};

export const createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    category,
    volunteersNeeded,
  } = req.body;

  try {
    // Combine the date with startTime and endTime to create Date objects
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    // Validate that end time is after start time
    if (endDateTime <= startDateTime) {
      return res.status(400).json({
        message: "End time must be after start time.",
      });
    }

    // Create a new event
    const event = new Event({
      title,
      description,
      date: new Date(date),
      startTime: startDateTime,
      endTime: endDateTime,
      location,
      category,
      volunteersNeeded,
      createdBy: req.user.id, // Assuming the user is authenticated
    });

    // Save the event to the database
    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log("[ERROR in createEvent]", error);

    // Send the error message to the frontend
    res.status(500).json({
      message: error.message || "An error occurred while creating the event.",
    });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const updates = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.log("[ERROR in updateEvents]", error);

    res.status(500).json({ message: "Error updating event", error });
  }
};

export const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() === userId.toString()) {
      return res.status(400).json({ message: "You can't join your own event" });
    }

    // Check if event is already ongoing or completed
    if (event.status === "ongoing" || event.status === "completed") {
      console.log("[event.status]", event.status);
      return res.status(400).json({ message: "Event is closed" });
    }

    // Check if the user has already joined the event
    const isAlreadyJoined = event.attendees.some(
      (attendee) => attendee.userId.toString() === userId.toString()
    );

    if (isAlreadyJoined) {
      return res
        .status(400)
        .json({ message: "You have already joined this event" });
    }

    // Check if there are available spots
    if (event.attendees.length >= event.volunteersNeeded) {
      return res.status(400).json({ message: "No spots left for this event" });
    }

    // Add the user to the event's attendees list
    event.attendees.push({ userId });
    await event.save();

    res.status(200).json({ message: "Joined event successfully", event });
  } catch (error) {
    console.log("[ERROR in joinEvent]", error);
    res.status(500).json({ message: "Error joining event", error });
  }
};

export const leaveEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove the user from the event's attendees list
    event.attendees = event.attendees.filter(
      (attendee) =>
        attendee.userId && attendee.userId.toString() !== userId.toString()
    );

    await event.save();

    res.status(200).json({ message: "Left event successfully", event });
  } catch (error) {
    console.log("[ERROR in leaveEvent]", error);

    res.status(500).json({ message: "Error leaving event", error });
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("[ERROR in deleteEvent]", error);
    res.status(500).json({ message: "Error deleting event", error });
  }
};
