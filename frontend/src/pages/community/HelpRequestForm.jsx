export const HelpRequestForm = ({
  newRequest,
  setNewRequest,
  onCreateRequest,
  onCancel,
}) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Help Request</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={newRequest.title}
          onChange={(e) =>
            setNewRequest({ ...newRequest, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={newRequest.description}
          onChange={(e) =>
            setNewRequest({ ...newRequest, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={newRequest.category}
          onChange={(e) =>
            setNewRequest({ ...newRequest, category: e.target.value })
          }
        />
        <select
          className="w-full p-2 border rounded"
          value={newRequest.urgency}
          onChange={(e) =>
            setNewRequest({ ...newRequest, urgency: e.target.value })
          }
        >
          <option value="low">Low Urgency</option>
          <option value="medium">Medium Urgency</option>
          <option value="urgent">Urgent</option>
        </select>
        <div className="flex gap-4">
          <button
            onClick={onCreateRequest}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestForm;
