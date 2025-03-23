import React from "react";

export const CommunityProfile = () => {
  const community = {
    name: "Environmental Volunteers",
    description: "A community for environmental activists.",
    members: 120,
    events: 5,
  };

  return (
    <div className=" p-6 bg-white border-l border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Community Profile
      </h2>
      <div className="p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {community.name}
        </h3>
        <p className="text-gray-600 mb-4">{community.description}</p>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Members:</span> {community.members}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-bold">Events:</span> {community.events}
          </p>
        </div>
      </div>
    </div>
  );
};
