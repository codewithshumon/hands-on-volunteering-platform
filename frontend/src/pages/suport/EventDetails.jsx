const EventDetails = () => {
  // Mock event data
  const event = {
    id: 1,
    title: "Community Food Drive",
    date: "2023-09-20",
    time: "10:00 AM",
    location: "City Center Hall",
    category: "Humanitarian",
    volunteersNeeded: 15,
    description: "Help distribute food packages to low-income families",
    attendees: ["John D", "Sarah M"],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">📅 Date & Time</h3>
            <p>
              {event.date} at {event.time}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">📍 Location</h3>
            <p>{event.location}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Volunteers Needed</h3>
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (event.attendees.length / event.volunteersNeeded) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="ml-4">
              {event.attendees.length}/{event.volunteersNeeded}
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Join Event
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <p className="text-gray-600">{event.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Attendees</h3>
        <div className="flex flex-wrap gap-2">
          {event.attendees.map((attendee, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
              {attendee}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
