import { useState, useEffect } from "react";
import { FaHistory, FaCalendar, FaSearch } from "react-icons/fa";
import Profile from "../../components/dashboard/Profile";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import VolunteerHistory from "../../components/dashboard/VolunteerHistory";
import DiscoverEvents from "../../components/dashboard/DiscoverEvents";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/single-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const allEvents = [
    {
      id: 5,
      title: "Homeless Shelter Help",
      date: "2023-04-20",
      category: "Humanitarian",
    },
    {
      id: 6,
      title: "Animal Rescue Support",
      date: "2023-04-22",
      category: "Animals",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Side - User Profile */}
        {user && <Profile user={user} />}

        {/* Right Side - Content */}
        <div className="md:col-span-2">
          {/* Tabs Navigation */}
          <div className="flex space-x-4 mb-6">
            {[
              { id: "history", label: "Volunteer History", icon: FaHistory },
              { id: "upcoming", label: "Upcoming Events", icon: FaCalendar },
              { id: "discover", label: "Discover", icon: FaSearch },
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

            {activeTab === "discover" && (
              <DiscoverEvents
                events={allEvents}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
