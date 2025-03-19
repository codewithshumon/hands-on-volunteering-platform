const UpcomingEvents = ({ events }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">Date: {event.date}</p>
            <p className="text-gray-600">Time: {event.time}</p>
            <p className="text-gray-600">Location: {event.location}</p>
            <p className="text-gray-600">
              Status: <span className="font-semibold">{event.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
