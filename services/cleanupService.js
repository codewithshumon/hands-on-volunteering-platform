import Event from "../models/EventSchema.js";
import Community from "../models/community/CommunitySchema.js";
import User from "../models/UserSchema.js";

// Function to clean up events and communities related to deleted users
export const cleanupEventsAndCommunities = async () => {
  try {
    // Cleanup events and communities created by deleted users
    const eventsToDelete = await Event.find({});
    const communitiesToDelete = await Community.find({});

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

    // Cleanup deleted users from `attendees` and `members` lists
    for (const event of eventsToDelete) {
      // Find valid attendees (users who still exist)
      const validAttendees = await User.find({
        _id: { $in: event.attendees.map((a) => a.userId) },
      });
      const validAttendeeIds = validAttendees.map((user) =>
        user._id.toString()
      );

      // Filter out non-existent attendees
      const updatedAttendees = event.attendees.filter((attendee) =>
        validAttendeeIds.includes(attendee.userId.toString())
      );

      // If the number of valid attendees is less than the current attendees list, update the event
      if (event.attendees.length !== updatedAttendees.length) {
        await Event.findByIdAndUpdate(event._id, {
          attendees: updatedAttendees,
        });
        console.log(`Cleaned up attendees for event ${event._id}`);
      }
    }

    for (const community of communitiesToDelete) {
      // Find valid members (users who still exist)
      const validMembers = await User.find({
        _id: { $in: community.members },
      });
      const validMemberIds = validMembers.map((user) => user._id.toString());

      // Filter out non-existent members
      const updatedMembers = community.members.filter((member) =>
        validMemberIds.includes(member.toString())
      );

      // If the number of valid members is less than the current members list, update the community
      if (community.members.length !== updatedMembers.length) {
        await Community.findByIdAndUpdate(community._id, {
          members: updatedMembers,
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
