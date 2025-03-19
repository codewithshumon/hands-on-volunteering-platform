import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFlag } from "react-icons/fa";

import useApi from "../../hooks/useApi";
import formatTime from "../../utils/formatTime";

const UpcomingEvents = ({ user }) => {
  const { resData, loading, error, fetchData } = useApi(); // Destructure useApi hook
  const [events, setEvents] = useState([]); // State to store fetched events

  // Fetching events with status: upcoming
  useEffect(() => {
    fetchData(`/event/get-all-events?status=upcoming&userId=${user._id}`);
  }, [user._id, fetchData]);

  console.log("[events in UpcomingEvetns]", events);
  console.log("[user._id in UpcomingEvetns]", user._id);

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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-blue-500" />
                  <p>Time: {formatTime(event.time)}</p>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
