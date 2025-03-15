import { FaSearch } from "react-icons/fa";

const DiscoverEvents = ({
  events,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <select
          className="w-full md:w-48 px-4 py-2 rounded-lg border"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="healthcare">Healthcare</option>
        </select>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mt-2 inline-block">
                  {event.category}
                </span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverEvents;
