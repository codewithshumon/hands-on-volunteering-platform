import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {event.date} | {event.time}
        </p>
        <p className="text-gray-600 text-sm mb-2">{event.location}</p>
        <p className="text-gray-700 mb-4 truncate">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {event.spotsLeft} spots left
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Join Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
