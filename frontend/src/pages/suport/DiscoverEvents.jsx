import { FaSearch, FaFilter, FaCalendar, FaMapMarker } from "react-icons/fa";

const DiscoverEvents = () => {
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Community Food Drive",
      date: "2023-09-20",
      location: "City Center",
      category: "Humanitarian",
      volunteersNeeded: 15,
      description: "Help distribute food packages to low-income families",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search & Filters */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
          </div>

          <div className="flex gap-4">
            <select className="px-4 py-3 rounded-lg border">
              <option>All Categories</option>
              <option>Environment</option>
              <option>Education</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              <FaFilter className="inline mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
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
              <span className="text-sm text-gray-500">
                {event.volunteersNeeded} volunteers needed
              </span>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverEvents;
