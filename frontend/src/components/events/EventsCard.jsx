/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { FaCalendar, FaMapMarker, FaUsers } from "react-icons/fa";

const EventCard = ({ event, onSelect, modalClose }) => {
  const eventCardHandler = useCallback(() => {
    onSelect(event);
    modalClose(true);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <FaCalendar className="mr-2" />
            {event.date}
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarker className="mr-2" />
            {event.location}
          </div>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {event.category}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaUsers className="mr-2 text-gray-500" />
          <span className="text-sm">
            {event.attendees.length}/{event.volunteersNeeded} volunteers
          </span>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={eventCardHandler}
        >
          {event.status === "Upcoming" ? "Manage" : "View"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
