import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "../../components/modal/Modal";
import formatTime from "../../utils/formatTime";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaUserMinus, // Add this icon for the "Leave" button
} from "react-icons/fa";
import useApi from "../../hooks/useApi"; // Import the useApi hook

const EventDetailsView = ({ event, onClose, onEventLeave }) => {
  const { updateData, loading } = useApi(); // Use the useApi hook
  const currentUser = useSelector((state) => state.auth.user);

  if (!event) return null;

  // Check if the current user has joined the event
  const isJoined = event.attendees.some(
    (attendee) => attendee.userId._id === currentUser._id
  );

  // Function to handle leaving the event
  const handleLeave = async () => {
    try {
      await updateData(`/event/leave/${event._id}`, "POST");

      if (onEventLeave) {
        onEventLeave();
      }
      onClose(); // Close the modal after leaving
    } catch (err) {
      console.error("Error leaving event:", err.message);
      alert(err.message); // Show error message
    }
  };

  if (!event || !event.createdBy) return <div>Loading...</div>;

  return (
    <Modal isOpen={true} onModalClose={onClose}>
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 w-full max-w-2xl shadow-2xl">
          {/* Header with title and close button */}
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Event details grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: Event description and details */}
            <div>
              <div className="flex items-center pb-2">
                <Link to={`/user/profile/${event.createdBy._id}`}>
                  <img
                    src={event.createdBy.profileImage}
                    alt={event.createdBy.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                </Link>
                <span className="ml-2 text-sm text-gray-600">
                  Created by{" "}
                  <Link
                    to={`/user/profile/${event.createdBy._id}`}
                    className="font-bold hover:underline"
                  >
                    {event.createdBy.name}
                  </Link>
                </span>
              </div>
              <p className="text-gray-600 mb-4 text-md">{event.description}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-500 w-5 h-5" />
                  <p className="text-gray-700">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-blue-500 w-5 h-5" />
                  <p className="text-gray-700">
                    <strong>Time:</strong> {formatTime(event.startTime)} -{" "}
                    {formatTime(event.endTime)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaUsers className="text-blue-500 w-5 h-5" />
                  <p className="text-gray-700">
                    <strong>Volunteers:</strong> {event.attendees.length}/
                    {event.volunteersNeeded}
                  </p>
                </div>
              </div>
              <div className=" pt-4 flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500 w-8 h-8" />
                <p className="text-gray-700">
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
            </div>

            {/* Right column: Attendees list */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 underline">
                Attendees List
              </h3>
              <p>
                {event.attendees.length === 0 ? "No one joined yet." : null}
              </p>
              <p>{}</p>
              <div className="grid grid-cols-2 gap-4 overflow-auto">
                {event.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3  rounded-lg text-sm "
                  >
                    {/* Attendee profile image */}
                    <img
                      src={attendee.userId.profileImage}
                      alt={attendee.userId.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    {/* Attendee name */}
                    <Link to={`/user/profile/${attendee.userId._id}`}>
                      <span className="text-gray-700 font-small hover:underline">
                        {attendee.userId.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leave Event Button (only show if the user has joined) */}
          {isJoined && (
            <div className="mt-8">
              <button
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleLeave}
                disabled={loading}
              >
                <FaUserMinus />
                {loading ? "Leaving..." : "Leave Event"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsView;
