import Event from "../models/EventSchema.js";
import Community from "../models/community/CommunitySchema.js";
import User from "../models/UserSchema.js";

// Function to clean up events and communities related to deleted users
export const cleanupEventsAndCommunities = async () => {
  try {
    // Step 1: Find all events and communities
    const eventsToDelete = await Event.find({});
    const communitiesToDelete = await Community.find({});

    // Step 2: Cleanup events and communities created by deleted users
    for (const event of eventsToDelete) {
      const creatorExists = await User.exists({ _id: event.createdBy });
      if (!creatorExists) {
        // Delete the event if the creator no longer exists
        await Event.findByIdAndDelete(event._id);
        console.log(
          `Deleted event ${event._id} created by deleted user ${event.createdBy}`
        );
      }
    }

    for (const community of communitiesToDelete) {
      const creatorExists = await User.exists({ _id: community.createdBy });
      if (!creatorExists) {
        // Delete the community if the creator no longer exists
        await Community.findByIdAndDelete(community._id);
        console.log(
          `Deleted community ${community._id} created by deleted user ${community.createdBy}`
        );
      }
    }

    // Step 3: Cleanup deleted users from `attendees` and `members` lists
    const allEvents = await Event.find({});
    const allCommunities = await Community.find({});

    for (const event of allEvents) {
      // Find valid attendees (users who still exist)
      const validAttendees = await User.find({ _id: { $in: event.attendees } });
      const validAttendeeIds = validAttendees.map((user) => user._id);

      // If the number of valid attendees is less than the current attendees list, update the event
      if (event.attendees.length !== validAttendeeIds.length) {
        await Event.findByIdAndUpdate(event._id, {
          attendees: validAttendeeIds,
        });
        console.log(`Cleaned up attendees for event ${event._id}`);
      }
    }

    for (const community of allCommunities) {
      // Find valid members (users who still exist)
      const validMembers = await User.find({ _id: { $in: community.members } });
      const validMemberIds = validMembers.map((user) => user._id);

      // If the number of valid members is less than the current members list, update the community
      if (community.members.length !== validMemberIds.length) {
        await Community.findByIdAndUpdate(community._id, {
          members: validMemberIds,
        });
        console.log(`Cleaned up members for community ${community._id}`);
      }
    }

    console.log("cleanupEventsAndCommunities success");
  } catch (error) {
    console.log("[ERROR in cleanupEventsAndCommunities]");
    console.error("Error during cleanup task:", error);
  }
};
