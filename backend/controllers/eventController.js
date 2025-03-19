import mongoose from "mongoose";
const { Types } = mongoose;

import Event from "../models/EventSchema.js";
import User from "../models/UserSchema.js";

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
    const events = await Event.find(query).populate(
      "createdBy",
      "name profileImage _id"
    ); // Populate creator details

    console.log("[events in get all events]", events);

    res.status(200).json({
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.log("[error in get all events]", error);

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
    res.status(500).json({ message: "Error fetching your events", error });
  }
};

export const getMyEventsByStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query; // Get status from query parameters

  try {
    // Fetch events for the user based on the provided status
    const events = await Event.find({
      createdBy: userId,
      status: status, // Filter by dynamic status
    }).populate("createdBy", "name profileImage _id"); // Populate creator details

    res.status(200).json({
      message: `Your ${status} events fetched successfully`,
      data: events,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching your ${status} events`, error });
  }
};

export const createEvent = async (req, res) => {
  console.log("[Request Body]", req.body); // Debugging line

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
    // Create a new event
    const event = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
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
    console.error("[error in createEvent]", error);
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
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
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;
  const { name, profileImage } = req.user;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event
    if (event.createdBy.toString() === userId.toString()) {
      return res.status(400).json({ message: "You can't join your event" });
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
    event.attendees.push({ userId, name, profileImage });
    await event.save();

    // Add the event to the user's joinedEvents array
    await User.findByIdAndUpdate(userId, {
      $push: { joinedEvents: { eventId, date: new Date() } },
    });

    res.status(200).json({ message: "Joined event successfully", event });
  } catch (error) {
    console.log("[joinEvent]", joinEvent);

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

    // Remove the event from the user's joinedEvents array
    await User.findByIdAndUpdate(userId, {
      $pull: { joinedEvents: { eventId } },
    });

    res.status(200).json({ message: "Left event successfully", event });
  } catch (error) {
    console.log("[error leave]", error);

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

    // Remove the event from the user's createdEvents array
    await User.findByIdAndUpdate(userId, {
      $pull: { createdEvents: eventId },
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
