import React from "react";

const ImpactEventCard = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {event.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        📅 {event.date} | 📍 {event.location}
      </p>
      <p className="text-sm text-gray-600 mb-4">⏳ {event.hours} hours</p>
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Log Hours
      </button>
    </div>
  );
};

export default ImpactEventCard;
