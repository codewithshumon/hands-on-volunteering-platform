import { useState } from "react";

import useApi from "../../hooks/useApi";

const CommunityPostForm = ({ onCancel, onPostCreated }) => {
  const { updateData, loading } = useApi();
  const [errorText, setErrorText] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!formData.title || !formData.description || !formData.category) {
      setErrorText("Please fill in all required fields.");
      return;
    }

    try {
      // Call the API to create the event
      await updateData("/event/create-event", "POST", formData);

      // Clear any previous errors
      setErrorText(null);

      // Call the callback to refresh the post list
      if (onPostCreated) {
        onPostCreated();
      }

      // Close the modal
      onCancel();
    } catch (err) {
      console.error("Error creating event:", err);
      setErrorText(
        err.message || "An error occurred while creating the event."
      );
    }
  };

  return (
    <div className="max-w-md bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Create Help Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Urgency</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.urgency}
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Display loading state */}
          {loading && (
            <p className="text-sm text-blue-600">Creating event...</p>
          )}

          {/* Display error message */}
          {errorText && <p className="text-sm text-red-600">{errorText}</p>}

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityPostForm;
