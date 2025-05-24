export const HelpRequestDetails = ({ request, onClose }) => {
  const urgencyColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    urgent: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{request.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className=" text-gray-900 pb-5">{request.description}</div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-medium">{request.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Date Posted</p>
            <p className="font-medium">
              {new Date(request.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Urgency</p>
            <p
              className={`font-medium ${
                urgencyColors[request.urgency]
              } px-2 py-1 rounded`}
            >
              {request.urgency}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Posted By</p>
            <p className="font-medium">{request.creator}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
