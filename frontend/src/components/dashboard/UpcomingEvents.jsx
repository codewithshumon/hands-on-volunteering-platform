const UpcomingEvents = ({ events }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className="border-b pb-4 last:border-0">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-gray-600">
                {event.date} • {event.location}
              </p>
            </div>
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
