import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaCalendar,
  FaMapMarker,
  FaUsers,
} from "react-icons/fa";

const EventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Community Food Drive",
      date: "2023-09-20",
      location: "City Center",
      category: "Humanitarian",
      volunteersNeeded: 15,
      description: "Help distribute food packages to families in need",
      attendees: ["John D.", "Sarah M."],
      status: "Upcoming",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    date: "",
  });

  // Mock event creation
  const createEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setShowCreateModal(false);
  };

  // Event card component
  const EventCard = ({ event }) => (
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
          onClick={() => setSelectedEvent(event)}
        >
          {event.status === "Upcoming" ? "Manage" : "View"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          Volunteer Opportunities
        </h1>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus className="mr-2" />
          Create New Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-3 rounded-lg border"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="all">All Categories</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="humanitarian">Humanitarian</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 rounded-lg border"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
            {/* Add your event creation form here */}
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={() =>
                  createEvent({
                    title: "New Event",
                    date: "2023-09-25",
                    location: "City Center",
                    category: "Environment",
                    volunteersNeeded: 10,
                    description: "Sample event description",
                    attendees: [],
                    status: "Upcoming",
                  })
                }
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">
                  {selectedEvent.description}
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Date:</strong> {selectedEvent.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedEvent.location}
                  </p>
                  <p>
                    <strong>Volunteers:</strong>{" "}
                    {selectedEvent.attendees.length}/
                    {selectedEvent.volunteersNeeded}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Attendees</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.attendees.map((attendee, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
