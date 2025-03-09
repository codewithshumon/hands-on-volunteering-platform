import { useState } from "react";

export const HelpRequestCard = ({ request, onOfferHelp, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(request.id, commentText);
      setCommentText("");
    }
  };

  const getUrgencyBorder = (urgency) => {
    switch (urgency) {
      case "low":
        return "border-green-500";
      case "medium":
        return "border-yellow-500";
      case "urgent":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        className={`border-l-4 ${getUrgencyBorder(request.urgency)} mb-4 pl-4`}
      >
        <h3 className="text-xl font-semibold text-gray-800">{request.title}</h3>
        <p className="text-sm text-gray-600">{request.creator}</p>
      </div>
      <p className="text-gray-700 mb-4">{request.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
          {request.category}
        </span>
        <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
          {request.date}
        </span>
      </div>

      {/* Comments Section */}
      <div className="mt-4 border-t pt-4">
        <h4 className="font-medium mb-2">
          Comments ({request.comments.length})
        </h4>
        <div className="space-y-2 mb-4">
          {request.comments.map((comment) => (
            <div key={comment.id} className="text-sm p-2 bg-gray-50 rounded">
              <p className="font-medium">{comment.author}</p>
              <p className="text-gray-600">{comment.text}</p>
              <p className="text-xs text-gray-400">{comment.date}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
          >
            Post
          </button>
        </form>
      </div>

      <button
        onClick={() => onOfferHelp(request.id)}
        className={`w-full py-2 rounded mt-4 ${
          request.status === "open"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={request.status !== "open"}
      >
        {request.status === "open" ? "Offer Help" : "Help Offered"}
      </button>
    </div>
  );
};

export default HelpRequestCard;
