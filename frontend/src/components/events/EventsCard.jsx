/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import {
  FaCalendar,
  FaMapMarker,
  FaUsers,
  FaUserPlus,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Category mapping
const categoryMapping = {
  all: "All Categories",
  environment: "Environment",
  education: "Education",
  humanitarian: "Humanitarian",
  health: "Health & Wellness",
  animals: "Animals",
  community: "Community Development",
  youth: "Youth & Children",
};

const EventCard = ({ event, onSelect, modalClose }) => {
  const eventCardHandler = useCallback(() => {
    onSelect(event);
    modalClose(true);
  }, [event, onSelect, modalClose]);

  // Get the display text for the category
  const categoryText = categoryMapping[event.category] || event.category;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            <div className="flex items-center text-gray-600">
              <FaCalendar className="mr-2" />
              {new Date(event.date).toLocaleDateString()} | {event.time}
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarker className="mr-2" />
              {event.location}
            </div>
            <span className=" text-green-800 pl-1 py-1 rounded-md text-sm font-bold">
              {categoryText} {/* Use the mapped category text */}
            </span>
          </div>
          <div className="flex items-center">
            <Link to={`/users/${event.createdBy._id}`}>
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
        </div>
      </div>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaUsers className="mr-2 text-gray-500" />
          <span className="text-sm font-bold">
            {event.attendees.length}/{event.volunteersNeeded} volunteers
          </span>
        </div>

        <div className="flex gap-1">
          <button
            className="border border-blue-500 text-gray-800 px-4 py-1 rounded-lg hover:text-white hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
            onClick={eventCardHandler}
          >
            <FaEye size={16} /> {/* View icon */}
            View
          </button>
          <button
            className="border border-blue-500 text-gray-800 px-4 py-1 rounded-lg hover:text-white hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
            onClick={eventCardHandler}
          >
            <FaUserPlus size={18} /> {/* Join icon */}
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
