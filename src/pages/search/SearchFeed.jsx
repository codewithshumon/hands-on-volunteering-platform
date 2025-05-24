import React, { useState } from "react";

const SearchFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("events"); // State to manage active tab

  // Handle search button click
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  // Handle clear button click
  const handleClear = () => {
    setSearchQuery("");
  };

  // Dummy data for events and community posts
  const events = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "2023-11-15",
      location: "San Francisco, CA",
      description: "Join us for the biggest tech conference of the year!",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Community Cleanup Day",
      date: "2023-11-20",
      location: "New York, NY",
      description: "Help us clean up the city and make a difference!",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Tech Conference 2025",
      date: "2023-11-15",
      location: "San Francisco, CA",
      description: "Join us for the biggest tech conference of the year!",
      image: "https://via.placeholder.com/150",
    },
  ];

  const communityPosts = [
    {
      id: 1,
      user: "JohnDoe",
      content:
        "Just finished a great hike at the local park. Highly recommend it!",
      timestamp: "2 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      user: "JaneSmith",
      content:
        "Looking for recommendations for a good yoga studio in the area.",
      timestamp: "5 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 1,
      user: "JohnDoe",
      content:
        "Just finished a great hike at the local park. Highly recommend it!",
      timestamp: "2 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = communityPosts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pt-22">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative w-full border rounded-full border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm">
          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={handleClear}
              className=" absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Search Button (SVG) */}
          <button
            onClick={handleSearch}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Search events or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-15 py-4 focus:outline-none"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 text-lg font-semibold flex items-center space-x-2 ${
              activeTab === "events"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Events</span>
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`px-4 py-2 text-lg font-semibold flex items-center space-x-2 ${
              activeTab === "community"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Community</span>
          </button>
        </div>
      </div>

      {/* Content Based on Active Tab */}
      <div className="max-w-4xl mx-auto">
        {activeTab === "events" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Events</h2>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">
                        {event.date} | {event.location}
                      </p>
                      <p className="text-gray-700 mt-2">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "community" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Community Posts
            </h2>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {post.user}
                      </h3>
                      <p className="text-gray-600 text-sm">{post.timestamp}</p>
                      <p className="text-gray-700 mt-2">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchFeed;
