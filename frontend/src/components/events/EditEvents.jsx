import { useCallback } from "react";

const EditEvents = ({ editingEvent, handleCancelEdit, handleUpdate }) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
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
      handleUpdate(editingEvent._id, updatedData);
    },
    [handleUpdate, editingEvent._id]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-auto h-auto min-w-[90vw] sm:min-w-[80vw] md:min-w-[50vw]">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Edit Event</h3>
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
            />
          </div>

          {/* Date, Start Time, and End Time */}
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
              />
            </div>

            {/* Start Time */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                defaultValue={editingEvent.startTime}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            {/* End Time */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                defaultValue={editingEvent.endTime}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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

          <div className="flex flex-row gap-3">
            {/* Location */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={editingEvent.location}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
