import React, { useCallback, useEffect, useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaHourglassStart,
  FaTimesCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import useApi from "../../hooks/useApi"; // Import the useApi hook
import Modal from "../modal/Modal";
import EditEvents from "../events/EditEvents";

const MyEvents = ({ user }) => {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [showModal, setShowModal] = useState(false); // State to show modal
  const [editingEvent, setEditingEvent] = useState(null); // State to track the event being edited
  const { resData, loading, error, fetchData, updateData } = useApi(); // Destructure useApi hook

  // Fetch events when the component mounts
  useEffect(() => {
    fetchData(`/event/get-my-events/${user._id}`);
  }, [user._id, fetchData]);

  // Update the events state when resData changes
  useEffect(() => {
    if (resData) {
      setEvents(resData); // Set the fetched events to the state
    }
  }, [resData]);

  // Handle Edit Event
  const handleEdit = useCallback((event) => {
    setEditingEvent(event); // Set the event to be edited
    setShowModal(true);
  }, []);

  // Handle Cancel Edit
  const handleCancelEdit = useCallback(() => {
    setEditingEvent(null); // Clear the editing state
    setShowModal(false);
  }, []);

  // Handle Update Event
  const handleUpdate = useCallback(
    async (eventId, updatedData) => {
      try {
        await updateData(`/event/update/${eventId}`, "PUT", updatedData);
        setEditingEvent(null); // Clear the editing state
        fetchData(`/event/get-my-events/${user._id}`); // Refresh the events list
      } catch (err) {
        console.error("Error updating event:", err);
      }
    },
    [updateData, fetchData, user._id]
  );

  // Handle Delete Event
  const handleDelete = useCallback(
    async (eventId) => {
      try {
        await updateData(`/event/delete/${eventId}`, "DELETE");
        fetchData(`/event/get-my-events/${user._id}`); // Refresh the events list
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    },
    [updateData, fetchData, user._id]
  );

  // Handle loading and error states
  if (loading) {
    return <p className="text-center text-gray-600">Loading your events...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching your events: {error}
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Events</h2>
      <div className="space-y-6">
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Event Title and Actions */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {event.title}
                </h3>
                <div className="flex space-x-3">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 text-gray-700">
                {/* Status with Icon */}
                <div className="flex items-center space-x-3">
                  {event.status === "ongoing" && (
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {event.status === "upcoming" && (
                    <FaHourglassStart className="w-5 h-5 text-blue-600" />
                  )}
                  {event.status === "cancelled" && (
                    <FaTimesCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${
                      event.status === "ongoing"
                        ? "bg-green-100 text-green-700"
                        : event.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1).toLowerCase()}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-3">
                  <FaCalendar className="w-5 h-5 text-blue-600" />
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-3">
                  <FaClock className="w-5 h-5 text-blue-600" />
                  <p>Time: {event.time}</p>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                  <p>Location: {event.location}</p>
                </div>

                {/* Description */}
                <div className="flex items-start space-x-3">
                  <FaInfoCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p>Description: {event.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && showModal && (
        <Modal isOpen={showModal} onModalClose={handleCancelEdit}>
          <EditEvents
            editingEvent={editingEvent}
            handleCancelEdit={handleCancelEdit}
            handleUpdate={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyEvents;
