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

const MyEvents = ({ user }) => {
  const [events, setEvents] = useState([]); // State to store fetched events
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

  console.log("[events in myEvents]", events);

  // Handle Edit Event
  const handleEdit = useCallback(
    (eventId) => {
      console.log("Edit event with ID:", eventId);
      updateData(`/event/update/${eventId}`, "PUT");
    },
    [updateData]
  );

  // Handle Delete Event
  const handleDelete = useCallback(
    (eventId) => {
      console.log("Delete event with ID:", eventId);
      updateData(`/event/delete/${eventId}`, "DELETE");
    },
    [updateData]
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
                    onClick={() => handleEdit(event._id)}
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
    </div>
  );
};

export default MyEvents;
