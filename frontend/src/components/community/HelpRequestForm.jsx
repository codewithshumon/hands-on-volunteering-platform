import { useState } from "react";

export const HelpRequestForm = ({ onCreateRequest, onCancel }) => {
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRequest(newRequest);
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Help Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={newRequest.title}
              onChange={(e) =>
                setNewRequest({ ...newRequest, title: e.target.value })
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
              value={newRequest.description}
              onChange={(e) =>
                setNewRequest({ ...newRequest, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={newRequest.category}
              onChange={(e) =>
                setNewRequest({ ...newRequest, category: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Urgency</label>
            <select
              className="w-full p-2 border rounded"
              value={newRequest.urgency}
              onChange={(e) =>
                setNewRequest({ ...newRequest, urgency: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
