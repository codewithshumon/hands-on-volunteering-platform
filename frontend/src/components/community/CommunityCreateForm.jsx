import React, { useState } from "react";
import useApi from "../../hooks/useApi";

const CommunityCreateForm = ({ onCancel, onCommunityCreated }) => {
  const { updateData, loading } = useApi();
  const [errorText, setErrorText] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [],
    isPublic: true,
  });

  // Handle input changes for name and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle tags input (comma-separated)
  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({
      ...formData,
      tags,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!formData.name || !formData.description) {
      setErrorText("Please fill in all required fields.");
      return;
    }

    try {
      // Send the form data to the backend API
      await updateData("/community/create-community", "POST", formData);

      // Clear any previous errors
      setErrorText(null);

      // Call the callback to refresh the communities list
      if (onCommunityCreated) {
        onCommunityCreated();
      }

      // Close the modal
      onCancel();
    } catch (error) {
      console.error("Error creating community:", error);
      setErrorText(
        error.message || "An error occurred while creating the community."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create a New Community
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Community Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Community Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange} // Use handleInputChange here
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter community name"
            required
          />
        </div>

        {/* Community Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange} // Use handleInputChange here
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="3"
            placeholder="Describe your community"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange} // Use handleTagsChange here
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., environment, education, health"
          />
        </div>

        {/* Visibility */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visibility
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="isPublic"
                value={true}
                checked={formData.isPublic === true}
                onChange={() => setFormData({ ...formData, isPublic: true })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Public</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isPublic"
                value={false}
                checked={formData.isPublic === false}
                onChange={() => setFormData({ ...formData, isPublic: false })}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Private</span>
            </label>
          </div>
        </div>

        {/* Display loading state */}
        {loading && (
          <p className="text-sm text-blue-600">Creating community...</p>
        )}

        {/* Display error message */}
        {errorText && <p className="text-sm text-red-600">{errorText}</p>}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all  cursor-pointer"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Creating..." : "Create Community"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityCreateForm;
