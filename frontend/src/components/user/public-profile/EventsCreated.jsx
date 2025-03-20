import { useCallback, useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import {
  FaCalendar,
  FaCalendarAlt,
  FaEye,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa"; // Added FaTimes for the close button
import EventDetailsView from "../../events/EventDetailsView";

const EventsCreated = ({ userId }) => {
  const { resData, loading, error, fetchData } = useApi();
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to toggle event list visibility
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events when the component mounts
  useEffect(() => {
    fetchData(`/event/get-my-events/${userId}`);
  }, [userId, fetchData]);

  // Sort events by date (latest first) when resData changes
  useEffect(() => {
    if (resData) {
      const sortedEvents = resData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setEvents(sortedEvents);
    }
  }, [resData]);

  const handleView = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  // Toggle event list visibility
  const toggleEvents = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div
        onClick={toggleEvents}
        className="flex justify-between items-center cursor-pointer"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FaCalendar className="mr-2 text-purple-600" />
          Events Created
        </h2>
        <p className="text-gray-600">
          {events.length} {events.length === 1 ? "Event" : "Events"}
        </p>
      </div>

      {/* Event List */}
      {isOpen && (
        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-gray-600 text-center">Loading events...</p>
          ) : error ? (
            <p className="text-red-500 text-center">
              Failed to load events. Please try again.
            </p>
          ) : events.length === 0 ? (
            <p className="text-gray-600 text-center">No events created yet.</p>
          ) : (
            <>
              {events.map((event) => (
                <div
                  key={event._id}
                  className="p-5 bg-[#F9FAFB] rounded-lg flex  justify-between items-center  "
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaCalendarAlt className="w-5 h-5" />
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 mt-2">
                      <FaMapMarkerAlt className="w-5 h-5" />
                      <p>{event.location}</p>
                    </div>
                  </div>
                  {/* View Details Button */}
                  <button
                    onClick={() => handleView(event)}
                    className="border border-blue-500 text-gray-800 px-4 py-1 rounded-lg hover:text-white hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
                  >
                    <FaEye size={16} /> {/* View icon */}
                    View
                  </button>
                </div>
              ))}
              {selectedEvent && (
                <EventDetailsView
                  event={selectedEvent}
                  onClose={() => {
                    setSelectedEvent(null);
                  }}
                />
              )}
              {/* Close Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={toggleEvents}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <FaTimes className="w-5 h-5" />
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsCreated;
