/* eslint-disable no-unused-vars */

import { useState } from "react";
import {
  FaHandsHelping,
  FaSearch,
  FaCalendar,
  FaUsers,
  FaComment,
  FaPlusCircle,
  FaTrophy,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const featuredEvents = [
    {
      id: 1,
      title: "Community Food Drive",
      date: "2023-04-20",
      location: "City Center",
      volunteersNeeded: 15,
    },
    {
      id: 2,
      title: "Beach Cleanup Initiative",
      date: "2023-04-22",
      location: "Sunset Beach",
      volunteersNeeded: 30,
    },
  ];

  const recentRequests = [
    {
      id: 1,
      title: "Weekly Tutoring Volunteers Needed",
      category: "Education",
      urgency: "medium",
    },
    {
      id: 2,
      title: "Emergency Shelter Support",
      category: "Humanitarian",
      urgency: "urgent",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Impact Through Collective Action
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Join hands with your community to create meaningful social change
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100"
            >
              Find Events
            </Link>
            <Link
              to="/community/new"
              className="border-2 border-white px-8 py-3 rounded-lg text-lg hover:bg-white hover:text-blue-600"
            >
              Post Request
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Events */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Volunteer Events</h2>
            <Link to="/events" className="text-blue-600 hover:text-blue-700">
              View All Events →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <FaCalendar className="inline mr-2" />
                      {event.date}
                    </p>
                    <p className="text-gray-600">
                      <FaUsers className="inline mr-2" />
                      {event.volunteersNeeded} volunteers needed
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Requests */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Community Requests</h2>
            <Link to="/community" className="text-blue-600 hover:text-blue-700">
              View All Requests →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {request.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
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
                      <span className="text-gray-600">{request.category}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FaComment className="inline mr-2" />
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <FaTrophy className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Track Your Social Impact
            </h2>
            <p className="text-gray-600 mb-6">
              Earn recognition for your contributions, build a verifiable
              volunteer portfolio, and see the collective impact of your
              community
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Hours Contributed", value: "10,000+" },
                { title: "Active Volunteers", value: "2,500+" },
                { title: "Community Projects", value: "500+" },
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
