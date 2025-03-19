import Event from "../models/EventSchema.js";

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

    // Update events to "completed"
    await Event.updateMany(
      {
        endTime: { $lte: now }, // Event has ended
        status: { $ne: "completed" }, // Status is not already completed
      },
      { status: "completed" }
    );

    console.log("Event statuses updated successfully");
  } catch (error) {
    console.error("[error in updateEventStatus]", error);
  }
};
