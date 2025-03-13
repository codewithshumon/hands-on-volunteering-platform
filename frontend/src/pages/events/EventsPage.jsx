import { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

import Modal from "../../components/modal/Modal";
import EventCreationForm from "../../components/events/EventCreationForm";
import EventCard from "../../components/events/EventsCard";

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

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateEvent = (formData) => {
    const newEvent = {
      ...formData,
      id: events.length + 1,
      volunteersNeeded: 10,
      attendees: [],
      status: "Upcoming",
    };
    setEvents([...events, newEvent]);
    setShowCreateModal(false);
  };

  console.log("[selectedEvent]", selectedEvent);
  console.log("[showCreateModal]", showCreateModal);

  return (
    <div className="max-w-7xl mx-auto p-6 pt-16">
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
        ))}
      </div>

      {/* Modal for Creating Events */}

      <Modal isOpen={showCreateModal} closeModal={closeCreateModal}>
        <EventCreationForm
          onSubmit={handleCreateEvent}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal isOpen={selectedEvent && true} closeModal={closeCreateModal}>
          <div className="p-4">
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
        </Modal>
      )}
    </div>
  );
};

export default EventsPage;
