/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaFlag,
  FaEye,
} from "react-icons/fa";

import useApi from "../../hooks/useApi";
import formatTime from "../../utils/formatTime";
import EventDetailsView from "../events/EventDetailsView";

const UpcomingEvents = ({ user }) => {
  const { resData, loading, error, fetchData } = useApi(); // Destructure useApi hook
  const [events, setEvents] = useState([]); // State to store fetched events
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

  // Fetching events with status: upcoming
  useEffect(() => {
    fetchData(`/event/get-all-events?status=upcoming&userId=${user._id}`);
  }, [user._id, fetchData]);

  const fetchEvents = useCallback(() => {
    fetchData(`/event/get-all-events?status=upcoming&userId=${user._id}`);
  }, []);

  // Update the events state when resData changes
  useEffect(() => {
    if (resData) {
      setEvents(resData); // Set the fetched events to the state
    }
  }, [resData]);

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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Upcoming Events
      </h2>
      <div className="space-y-6">
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="hidden md:block">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center cursor-pointer"
                  >
                    <FaEye className="w-6 h-6 text-blue-500 hover:text-blue-700 " />{" "}
                    {/* Larger icon */}
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-blue-500" />
                  <p>
                    Time: {formatTime(event.startTime)} -{" "}
                    {formatTime(event.endTime)}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  <p>Location: {event.location}</p>
                </div>
                <div className="flex items-center">
                  <FaFlag className="mr-2 text-blue-500" />
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        event.status === "upcoming"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1).toLowerCase()}
                    </span>
                  </p>
                </div>
              </div>
              {/* View Details Button */}
              <div className="mt-4 md:hidden">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaEye className="mr-2" />
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsView
          event={selectedEvent}
          onEventLeave={fetchEvents}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default UpcomingEvents;
