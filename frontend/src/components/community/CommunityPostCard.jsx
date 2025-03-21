import { useState } from "react";

import { HelpRequestDetails } from "./HelpRequestDetails";

const CommunityPostCard = ({ request, onOfferHelp }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [comment, setComment] = useState("");

  const urgencyColors = {
    low: "bg-emerald-100 text-emerald-800",
    medium: "bg-amber-100 text-amber-800",
    urgent: "bg-rose-100 text-rose-800",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      request.comments.push({
        id: request.comments.length + 1,
        author: "Current User",
        text: comment,
        date: new Date().toISOString().split("T")[0],
      });
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 mb-6 group">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {request.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {request.creator}
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
            urgencyColors[request.urgency]
          }`}
        >
          {request.urgency}
        </span>
      </div>

      <p className="text-gray-600 mb-5 leading-relaxed text-sm">
        {request.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          {request.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {new Date(request.date).toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowDetails(true)}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onOfferHelp(request.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            request.status === "open"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={request.status !== "open"}
        >
          {request.status === "open" ? "Offer Help" : "Assisted"}
        </button>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-100 pt-5">
        <h4 className="font-semibold text-sm mb-3 text-gray-700">
          Discussion ({request.comments.length})
        </h4>
        <div className="space-y-3 mb-4">
          {request.comments.map((comment) => (
            <div
              key={comment.id}
              className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-400">{comment.date}</span>
              </div>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Post
          </button>
        </form>
      </div>

      {showDetails && (
        <HelpRequestDetails
          request={request}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default CommunityPostCard;
