const MyEvents = () => {
  // Mock data
  const events = [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2023-09-25",
      status: "Upcoming",
      hours: 4,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Volunteer Commitments</h1>

      <div className="bg-white rounded-xl shadow-md">
        {events.map((event) => (
          <div key={event.id} className="p-6 border-b last:border-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full ${
                    event.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100"
                  }`}
                >
                  {event.status}
                </span>
                <button className="mt-2 text-red-600 hover:text-red-700">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
