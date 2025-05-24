import { useCallback, useState } from "react";

const EditEvents = ({ editingEvent, handleCancelEdit, handleUpdate }) => {
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError(""); // Clear previous errors

      const formData = new FormData(e.target);
      const updatedData = {
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        location: formData.get("location"),
        category: formData.get("category"),
      };

      // Validate startTime and endTime
      if (updatedData.startTime >= updatedData.endTime) {
        setError("End time must be after start time.");
        return;
      }

      // Convert date and time strings to Date objects
      const startDateTime = new Date(
        `${updatedData.date}T${updatedData.startTime}`
      );
      const endDateTime = new Date(
        `${updatedData.date}T${updatedData.endTime}`
      );

      // Ensure the dates are valid
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        setError("Invalid date or time format.");
        return;
      }

      // Pass the updated data to the parent component
      handleUpdate(editingEvent._id, {
        ...updatedData,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });
    },
    [handleUpdate, editingEvent._id]
  );

  // Helper function to format time for input[type="time"]
  const formatTimeForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toTimeString().slice(0, 5); // Extract HH:MM
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-auto h-auto min-w-[90vw] sm:min-w-[80vw] md:min-w-[50vw]">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Edit Event</h3>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={editingEvent.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={editingEvent.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
              required
            />
          </div>

          {/* Date and Category */}
          <div className="flex flex-row gap-3">
            {/* Date */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={editingEvent.date.split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* Category */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                defaultValue={editingEvent.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              >
                <option value="environment">Environment</option>
                <option value="education">Education</option>
                <option value="humanitarian">Humanitarian</option>
                <option value="health">Health & Wellness</option>
                <option value="animals">Animals</option>
                <option value="community">Community Development</option>
                <option value="youth">Youth & Children</option>
              </select>
            </div>
          </div>

          {/* Start Time and End Time */}
          <div className="flex flex-row gap-3">
            {/* Start Time */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                defaultValue={formatTimeForInput(editingEvent.startTime)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {/* End Time */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                defaultValue={formatTimeForInput(editingEvent.endTime)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-row gap-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={editingEvent.location}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvents;
