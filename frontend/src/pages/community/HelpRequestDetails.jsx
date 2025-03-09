// src/components/CommunityHelp/HelpRequestDetails.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const urgencyStyles = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  urgent: "bg-red-100 text-red-800",
};

export default function HelpRequestDetails({ requests, onCommentSubmit }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const request = requests.find((req) => req.id === id);

  if (!request) return <div>Request not found</div>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit(id, comment);
      setComment("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Link to="/community-help" className="text-blue-500 mb-4 inline-block">
        ← Back to Requests
      </Link>
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{request.title}</h1>
          <span
            className={`px-3 py-1 rounded-full ${
              urgencyStyles[request.urgency]
            }`}
          >
            {request.urgency}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{request.description}</p>
        <div className="text-sm text-gray-500">
          <p>Category: {request.category}</p>
          <p>Posted: {new Date(request.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Offer Help</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">
          Send Private Message
        </button>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">
            Comments ({request.comments.length})
          </h3>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Write a comment..."
              rows="3"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-4">
            {request.comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600">{comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
