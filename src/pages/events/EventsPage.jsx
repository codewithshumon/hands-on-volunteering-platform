/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

import Modal from "../../components/modal/Modal";
import EventCreationForm from "../../components/events/EventCreationForm";
import EventCard from "../../components/events/EventsCard";
import useApi from "../../hooks/useApi";
import EventDetailsView from "../../components/events/EventDetailsView";

const EventsPage = () => {
  const { fetchData, resData: events, loading, error } = useApi();

  // Function to fetch events
  const fetchEvents = useCallback(() => {
    fetchData("/event/get-all-events");
  }, []);

  useEffect(() => {
    fetchData("/event/get-all-events");
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    date: "",
  });

  return (
    <div className="max-w-7xl mx-auto p-6 pt-22">
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
              <option value="health">Health & Wellness</option>
              <option value="animals">Animals</option>
              <option value="community">Community Development</option>
              <option value="youth">Youth & Children</option>
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

      <div className="grid md:grid-cols-2 gap-6">
        {events &&
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={setSelectedEvent}
              onEventJoin={fetchEvents}
            />
          ))}
      </div>

      {/* Modal for Creating Events */}
      <Modal
        isOpen={showCreateModal}
        onModalClose={() => setShowCreateModal(false)}
      >
        <EventCreationForm
          onCancel={() => setShowCreateModal(false)}
          onEventCreated={fetchEvents}
        />
      </Modal>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsView
          onEventLeave={fetchEvents}
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default EventsPage;
