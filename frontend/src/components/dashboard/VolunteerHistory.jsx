import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaHistory,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";

const VolunteerHistory = ({ user }) => {
  const { resData, loading, error, fetchData } = useApi(); // Destructure useApi hook
  const [events, setEvents] = useState([]); // State to store fetched events

  // Fetching events with status: upcoming
  useEffect(() => {
    fetchData(`/event/get-all-events?status=completed&userId=${user._id}`);
  }, [user._id, fetchData]);

  // formate hours
  const formattedHours = (hours) => {
    return hours !== null && hours !== undefined
      ? hours % 1 === 0
        ? hours.toFixed(0)
        : hours.toFixed(1)
      : "0";
  };

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
        Ops! Something went wrong. Try again later.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaHistory className="mr-2 text-amber-600" />
        Volunteer History
      </h2>
      <div className="space-y-6">
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-amber-600" />
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-amber-600" />
                  <p>Hours: {formattedHours(event.eventHours)}</p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-amber-600" />
                  <p>Location: {event.location}</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="mr-2 text-amber-600" />
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        event.status === "completed"
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

export default VolunteerHistory;
