import React, { useCallback, useEffect, useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaHourglassStart,
  FaEdit,
  FaTrash,
  FaCheck,
  FaEye, // Add this icon for "completed"
} from "react-icons/fa";
import useApi from "../../hooks/useApi";
import Modal from "../modal/Modal";
import EditEvents from "../events/EditEvents";
import formatTime from "../../utils/formatTime";
import EventDetailsView from "../events/EventDetailsView";

const MyEvents = ({ user }) => {
  const { resData, loading, error, fetchData, updateData } = useApi();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events when the component mounts
  useEffect(() => {
    fetchData(`/event/get-my-events/${user._id}`);
  }, [user._id, fetchData]);

  // Update the events state when resData changes
  useEffect(() => {
    if (resData) {
      setEvents(resData);
    }
  }, [resData]);

  // Handle Edit Event
  const handleEdit = useCallback((event) => {
    setEditingEvent(event);
    setShowModal(true);
  }, []);

  // Handle Cancel Edit
  const handleCancelEdit = useCallback(() => {
    setEditingEvent(null);
    setShowModal(false);
  }, []);

  // Handle Update Event
  const handleUpdate = useCallback(
    async (eventId, updatedData) => {
      try {
        await updateData(`/event/update/${eventId}`, "PUT", updatedData);
        setEditingEvent(null);
        fetchData(`/event/get-my-events/${user._id}`);
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
        fetchData(`/event/get-my-events/${user._id}`);
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
        Ops! Something went wrong. Try again leter.
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
                  {event.status === "ongoing" ||
                  event.status === "completed" ? (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center cursor-pointer"
                    >
                      <FaEye className="w-6 h-6 text-blue-500 hover:text-blue-700 " />{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
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
                  {event.status === "completed" && (
                    <FaCheck className="w-5 h-5 text-purple-600" /> // Icon for "completed"
                  )}
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${
                      event.status === "ongoing"
                        ? "bg-green-100 text-green-700"
                        : event.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700" // Style for "completed"
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
                  <p>
                    Time: {formatTime(event.startTime)} -{" "}
                    {formatTime(event.endTime)}
                  </p>
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsView
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default MyEvents;
