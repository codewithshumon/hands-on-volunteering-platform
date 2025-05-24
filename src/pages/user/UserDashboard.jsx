import { useState } from "react";
import { useSelector } from "react-redux";
import { FaHistory, FaCalendar, FaList, FaHandsHelping } from "react-icons/fa";
import Profile from "../../components/dashboard/Profile";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import VolunteerHistory from "../../components/dashboard/VolunteerHistory";
import MyEvents from "../../components/dashboard/MyEvents";
import MyHelpRequests from "../../components/dashboard/MyHelpRequests";

// Tab data defined as a constant
const tabs = [
  { id: "events", label: "Events", icon: FaList },
  { id: "upcoming", label: "Upcoming Events", icon: FaCalendar },
  { id: "helpRequest", label: "Help Requests", icon: FaHandsHelping },
  { id: "history", label: "History", icon: FaHistory },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const currentUser = useSelector((state) => state.auth.user);

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
            {tabs.map((tab) => (
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
            {activeTab === "events" && <MyEvents user={currentUser} />}

            {activeTab === "upcoming" && <UpcomingEvents user={currentUser} />}

            {activeTab === "helpRequest" && (
              <MyHelpRequests events={myHelpRequests} />
            )}
            {activeTab === "history" && <VolunteerHistory user={currentUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
