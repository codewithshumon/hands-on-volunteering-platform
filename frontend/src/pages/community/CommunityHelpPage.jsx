import { useState } from "react";
import { HelpRequestCard } from "./HelpRequestCard";
import { HelpRequestForm } from "./HelpRequestForm";

const helpRequestsMock = [
  {
    id: 1,
    title: "Winter Clothes Distribution Help",
    description:
      "Need volunteers to distribute winter clothes to homeless people downtown",
    category: "Homeless Support",
    urgency: "urgent",
    date: "2024-02-15",
    creator: "City Shelter Foundation",
    status: "open",
    comments: [
      {
        id: 1,
        author: "Volunteer123",
        text: "I can help with this!",
        date: "2024-02-10",
      },
    ],
  },
];

export const CommunityHelpPage = () => {
  const [requests, setRequests] = useState(helpRequestsMock);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
  });

  const handleOfferHelp = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "help-offered" } : req
      )
    );
  };

  const handleCommentSubmit = (requestId, commentText) => {
    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            comments: [
              ...req.comments,
              {
                id: req.comments.length + 1,
                author: "Current User",
                text: commentText,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          };
        }
        return req;
      })
    );
  };

  const handleCreateRequest = () => {
    const newId = requests.length + 1;
    setRequests([
      ...requests,
      {
        id: newId,
        ...newRequest,
        date: new Date().toISOString().split("T")[0],
        creator: "Current User",
        status: "open",
        comments: [],
      },
    ]);
    setShowNewRequestForm(false);
    setNewRequest({
      title: "",
      description: "",
      category: "",
      urgency: "medium",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Community Help Requests
        </h1>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create New Request
        </button>
      </div>

      {showNewRequestForm && (
        <HelpRequestForm
          newRequest={newRequest}
          setNewRequest={setNewRequest}
          onCreateRequest={handleCreateRequest}
          onCancel={() => setShowNewRequestForm(false)}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request, index) =>
          request ? ( // Ensure request is not undefined
            <HelpRequestCard
              key={request.id || index}
              request={request}
              onOfferHelp={handleOfferHelp}
              onCommentSubmit={handleCommentSubmit}
            />
          ) : null
        )}
      </div>
    </div>
  );
};
