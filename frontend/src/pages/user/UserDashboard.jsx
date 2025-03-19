import { useState } from "react";
import {
  FaHistory,
  FaCalendar,
  FaSearch,
  FaList,
  FaHandsHelping,
} from "react-icons/fa";
import Profile from "../../components/dashboard/Profile";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import VolunteerHistory from "../../components/dashboard/VolunteerHistory";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("history");

  // Mock data
  const volunteerHistory = [
    { id: 1, title: "Food Distribution", date: "2023-03-15", hours: 4 },
    { id: 2, title: "Beach Cleanup", date: "2023-02-28", hours: 6 },
  ];

  const upcomingEvents = [
    {
      id: 3,
      title: "Tutoring Session",
      date: "2023-04-10",
      location: "City Library",
    },
    {
      id: 4,
      title: "Park Restoration",
      date: "2023-04-15",
      location: "Central Park",
    },
  ];

  const myEvents = [
    {
      id: 7,
      title: "Community Garden",
      date: "2023-05-01",
      location: "Local Park",
    },
  ];

  const myHelpRequests = [
    {
      id: 8,
      title: "Help Needed: Elderly Care",
      date: "2023-05-05",
      location: "Senior Center",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Side - User Profile */}
        <Profile />

        {/* Right Side - Content */}
        <div className="md:col-span-2">
          {/* Tabs Navigation */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
            {[
              { id: "history", label: "History", icon: FaHistory },
              { id: "upcoming", label: "Upcoming Events", icon: FaCalendar },
              { id: "events", label: "Events", icon: FaList },
              {
                id: "helpRequest",
                label: "Help Requests",
                icon: FaHandsHelping,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {activeTab === "history" && (
              <VolunteerHistory history={volunteerHistory} />
            )}

            {activeTab === "upcoming" && (
              <UpcomingEvents events={upcomingEvents} />
            )}

            {activeTab === "events" && <UpcomingEvents events={myEvents} />}

            {activeTab === "helpRequest" && (
              <UpcomingEvents events={myHelpRequests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
