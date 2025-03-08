import { useState } from "react";
import {
  FaHandsHelping,
  FaPlusCircle,
  FaComment,
  FaClock,
  FaFire,
} from "react-icons/fa";

const CommunityHelp = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Winter Clothes Distribution for Homeless",
      description:
        "Need volunteers to help distribute winter clothing and blankets in downtown area",
      author: "City Homeless Support",
      category: "Humanitarian",
      urgency: "urgent",
      comments: [],
      createdAt: "2h ago",
    },
    // Add more mock data as needed
  ]);

  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
  });

  const [newComment, setNewComment] = useState("");

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const request = {
      ...newRequest,
      id: requests.length + 1,
      author: "Current User",
      comments: [],
      createdAt: "Just now",
    };
    setRequests([request, ...requests]);
    setNewRequest({
      title: "",
      description: "",
      category: "",
      urgency: "medium",
    });
  };

  const handleAddComment = (requestId) => {
    if (!newComment.trim()) return;

    setRequests(
      requests.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            comments: [
              ...request.comments,
              {
                author: "Volunteer",
                text: newComment,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return request;
      })
    );
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation (Reuse from homepage) */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-3xl font-bold mb-4 md:mb-0">
                Community Help
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Create Request
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Request Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaPlusCircle className="mr-2 text-blue-600" />
            Create New Help Request
          </h2>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRequest.title}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRequest.description}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newRequest.category}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="humanitarian">Humanitarian</option>
                  <option value="environment">Environment</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Urgency
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Post Request
            </button>
          </form>
        </div>

        {/* Requests List */}
        <h2 className="text-2xl font-bold mb-6">Community Help Requests</h2>
        <div className="grid gap-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{request.title}</h3>
                  <p className="text-gray-600 mt-1">{request.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Posted by {request.author}</span>
                    <span>•</span>
                    <span>{request.createdAt}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {request.category}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.urgency === "urgent"
                      ? "bg-red-100 text-red-800"
                      : request.urgency === "medium"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {request.urgency.charAt(0).toUpperCase() +
                    request.urgency.slice(1)}
                </span>
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaComment className="text-gray-500" />
                  <h4 className="font-medium">
                    Offers to Help ({request.comments.length})
                  </h4>
                </div>

                {/* Comment Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Write your offer to help..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={() => handleAddComment(request.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Offer Help
                  </button>
                </div>

                {/* Comments List */}
                {request.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityHelp;
