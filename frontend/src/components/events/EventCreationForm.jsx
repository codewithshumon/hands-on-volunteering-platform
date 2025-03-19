import { useState } from "react";
import useApi from "../../hooks/useApi";

const EventCreationForm = ({ onCancel, onEventCreated }) => {
  const { updateData, loading, error } = useApi();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    volunteersNeeded: 1,
  });

  console.log("[formData in EventCreationForm]", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to create the event
      await updateData("/event/create-event", "POST", formData);

      // Call the callback to refresh the events list
      if (onEventCreated) {
        onEventCreated();
      }

      // Close the modal
      onCancel();
    } catch (err) {
      console.error("Error creating event:", err);
      // Handle the error (e.g., show a toast or error message)
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium mb-1">Event Title</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium mb-1">Description</label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Date, Start Time, and End Time */}
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Start Time</label>
            <input
              type="time"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">End Time</label>
            <input
              type="time"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>
        </div>

        {/* Category, Location, and Volunteers Needed */}
        <div className="grid md:grid-cols-[2fr_2fr_1fr] gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <select
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="humanitarian">Humanitarian</option>
              <option value="health">Health & Wellness</option>
              <option value="animals">Animals</option>
              <option value="community">Community Development</option>
              <option value="youth">Youth & Children</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Location</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Volunteers</label>
            <input
              type="number"
              min="1"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border focus:ring-2"
              value={formData.volunteersNeeded}
              onChange={(e) =>
                setFormData({ ...formData, volunteersNeeded: e.target.value })
              }
            />
          </div>
        </div>

        {/* Display loading state */}
        {loading && <p className="text-sm text-blue-600">Creating event...</p>}

        {/* Display error message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-blue-700 cursor-pointer"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreationForm;
