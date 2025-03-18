import React, { useState } from "react";

const EventCreationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    volunteersNeeded: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md mx-auto">
      <div>
        <label className="block text-xs font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full  text-sm border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full  text-sm border rounded-md h-20"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full  text-sm border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full  text-sm border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full  text-sm border rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-1 text-sm border rounded-md"
            required
          >
            <option value="">Select category</option>
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
          <label className="block text-xs font-medium mb-1">
            Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            min="1"
            className="w-full  text-sm border rounded-md"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs bg-gray-500 text-white px-3 p rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-xs bg-blue-600 text-white px-3 p rounded-md hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventCreationForm;
