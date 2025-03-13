import { useState } from "react";

import { HelpRequestForm } from "../../components/community/HelpRequestForm";
import { HelpRequestCard } from "../../components/community/HelpRequestCard";

const mockRequests = [
  {
    id: 1,
    title: "Winter Clothes Distribution",
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
  {
    id: 2,
    title: "Weekly Tutoring Volunteers",
    description: "Looking for educators to help with after-school program",
    category: "Education",
    urgency: "medium",
    date: "2024-02-20",
    creator: "Community Learning Center",
    status: "open",
    comments: [],
  },
];

export const CommunityHelpPage = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [showForm, setShowForm] = useState(false);

  const handleCreateRequest = (newRequest) => {
    setRequests([
      ...requests,
      {
        id: requests.length + 1,
        ...newRequest,
        date: new Date().toISOString(),
        creator: "Current User",
        status: "open",
        comments: [],
      },
    ]);
  };

  const handleOfferHelp = (requestId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "helping" } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Community Help Board
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Request
          </button>
        </div>

        {showForm && (
          <HelpRequestForm
            onCreateRequest={handleCreateRequest}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div className="grid grid-cols-1 gap-6">
          {requests.map((request) => (
            <HelpRequestCard
              key={request.id}
              request={request}
              onOfferHelp={handleOfferHelp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
