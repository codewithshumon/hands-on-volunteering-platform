import React from "react";

export const TopCommunities = () => {
  const topCommunities = [
    { id: 1, name: "Environmental Volunteers" },
    { id: 2, name: "Education for All" },
    { id: 3, name: "Healthcare Heroes" },
  ];

  return (
    <div className=" p-6 bg-white border-r border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Top Communities</h2>
      <ul className="space-y-3">
        {topCommunities.map((community) => (
          <li key={community.id}>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-blue-600 font-medium">
                {community.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
