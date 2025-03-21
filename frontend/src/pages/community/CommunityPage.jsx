import React from "react";

const CommunityPage = () => {
  // Dummy data for top communities, posts, and profile
  const topCommunities = [
    { id: 1, name: "Environmental Volunteers" },
    { id: 2, name: "Education for All" },
    { id: 3, name: "Healthcare Heroes" },
  ];

  const communityPosts = [
    {
      id: 1,
      title: "Help needed for food distribution",
      description: "We need volunteers to distribute food to the homeless.",
      comments: [
        { id: 1, text: "I can help with this!" },
        { id: 2, text: "Count me in!" },
      ],
    },
    {
      id: 2,
      title: "Winter clothes donation drive",
      description: "Join us to distribute winter clothes to those in need.",
      comments: [
        { id: 1, text: "I have some clothes to donate." },
        { id: 2, text: "Where is the location?" },
      ],
    },
  ];

  const communityProfile = {
    name: "Environmental Volunteers",
    description: "A community for environmental activists.",
    members: 120,
    events: 5,
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Left Sidebar - Top Communities */}
      <div className="w-1/4 p-4 bg-white border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">Top Communities</h2>
        <ul>
          {topCommunities.map((community) => (
            <li key={community.id} className="mb-2">
              <a href="#" className="text-blue-500 hover:underline">
                {community.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Section - Community Posts Feed */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Community Feed</h2>
        {communityPosts.map((post) => (
          <div key={post.id} className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
            <div className="mt-2">
              <h4 className="text-sm font-bold">Comments:</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="ml-4 mt-1 text-gray-700">
                  {comment.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar - Community Profile */}
      <div className="w-1/4 p-4 bg-white border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4">Community Profile</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{communityProfile.name}</h3>
          <p className="text-gray-600">{communityProfile.description}</p>
          <div className="mt-4">
            <p className="text-sm">
              <span className="font-bold">Members:</span>{" "}
              {communityProfile.members}
            </p>
            <p className="text-sm">
              <span className="font-bold">Events:</span>{" "}
              {communityProfile.events}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
