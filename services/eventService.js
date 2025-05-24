import Event from "../models/EventSchema.js";
import User from "../models/UserSchema.js";

export const updateEventStatus = async () => {
  const now = new Date(); // Current date and time

  try {
    // Update events to "ongoing"
    await Event.updateMany(
      {
        startTime: { $lte: now }, // Event has started
        endTime: { $gt: now }, // Event has not ended
        status: { $ne: "ongoing" }, // Status is not already ongoing
      },
      { status: "ongoing" }
    );

    // Find events that have just been marked as "completed"
    const completedEvents = await Event.find({
      endTime: { $lte: now }, // Event has ended
      status: { $ne: "completed" }, // Status is not already completed
    });

    // Update events to "completed"
    await Event.updateMany(
      {
        endTime: { $lte: now }, // Event has ended
        status: { $ne: "completed" }, // Status is not already completed
      },
      { status: "completed" }
    );

    // Update volunteer hours for attendees and the event creator
    for (const event of completedEvents) {
      const { attendees, createdBy, eventHours } = event;

      // Ensure eventHours is a valid number
      if (typeof eventHours !== "number" || isNaN(eventHours)) {
        console.error(
          `Invalid eventHours value for event ${event._id}: ${eventHours}. Skipping update.`
        );
        continue;
      }

      // Add hours to the event creator
      const user = await User.findByIdAndUpdate(createdBy, {
        $inc: { volunteerHours: eventHours }, // Increment volunteerHours
      });

      // Add hours to all attendees
      const manyUser = await User.updateMany(
        { _id: { $in: attendees } }, // Find all attendees
        { $inc: { volunteerHours: eventHours } } // Increment volunteerHours
      );
    }

    console.log("updateEventStatus success");
  } catch (error) {
    console.error("[ERROR in updateEventStatus]", error);
  }
};
