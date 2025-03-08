// // Dashboard.js
// import React, { useState } from "react";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("volunteerHistory");

//   return (
//     <div className="flex h-screen">
//       {/* Left Side (User Details) */}
//       <div className="w-1/3 bg-gray-100 p-6">
//         <div className="text-center">
//           <img
//             src="user-photo.jpg"
//             alt="User Profile"
//             className="w-32 h-32 rounded-full mx-auto"
//           />
//           <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
//           <p className="mt-2 text-gray-700">Skills: Environmental, Education</p>
//           <p className="mt-2 text-gray-700">
//             Causes: Climate Change, Education Access
//           </p>
//         </div>
//       </div>

//       {/* Right Side (Volunteer History, Event Listings, and Discover) */}
//       <div className="w-2/3 bg-white p-6">
//         <div className="space-y-8">
//           {/* Tabs for navigation */}
//           <div className="flex border-b border-gray-200">
//             <button
//               className={`p-4 text-lg ${
//                 activeTab === "volunteerHistory"
//                   ? "border-b-2 border-blue-500"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("volunteerHistory")}
//             >
//               Volunteer History
//             </button>
//             <button
//               className={`p-4 text-lg ${
//                 activeTab === "upcomingEvents"
//                   ? "border-b-2 border-blue-500"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("upcomingEvents")}
//             >
//               Upcoming Volunteer Events
//             </button>
//             <button
//               className={`p-4 text-lg ${
//                 activeTab === "discover"
//                   ? "border-b-2 border-blue-500"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("discover")}
//             >
//               Discover Volunteer Opportunities
//             </button>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "volunteerHistory" && (
//             <div className="volunteer-history">
//               <h3 className="text-2xl font-semibold">Volunteer History</h3>
//               <ul className="mt-4 space-y-2">
//                 <li className="border-b pb-2">Event 1 - Joined: 12/01/2024</li>
//                 <li className="border-b pb-2">Event 2 - Joined: 05/12/2023</li>
//                 <li className="border-b pb-2">Event 3 - Joined: 09/25/2023</li>
//               </ul>
//             </div>
//           )}

//           {activeTab === "upcomingEvents" && (
//             <div className="event-listing">
//               <h3 className="text-2xl font-semibold">
//                 Upcoming Volunteer Events
//               </h3>
//               <div className="mt-4 flex justify-between items-center">
//                 <select className="border p-2 rounded">
//                   <option value="environment">Environmental</option>
//                   <option value="education">Education</option>
//                   <option value="healthcare">Healthcare</option>
//                 </select>
//                 <button className="bg-blue-500 text-white py-2 px-4 rounded">
//                   Filter
//                 </button>
//               </div>
//               <ul className="mt-4 space-y-4">
//                 <li className="border p-4 rounded">
//                   <h4 className="font-semibold">Event Title 1</h4>
//                   <p>Date: 12/05/2024</p>
//                   <p>Location: New York</p>
//                   <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded">
//                     Join Event
//                   </button>
//                 </li>
//                 <li className="border p-4 rounded">
//                   <h4 className="font-semibold">Event Title 2</h4>
//                   <p>Date: 15/06/2024</p>
//                   <p>Location: Los Angeles</p>
//                   <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded">
//                     Join Event
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeTab === "discover" && (
//             <div className="discover">
//               <h3 className="text-2xl font-semibold">
//                 Discover Volunteer Opportunities
//               </h3>
//               <ul className="mt-4 space-y-4">
//                 <li className="border p-4 rounded">
//                   <h4 className="font-semibold">Discover Event 1</h4>
//                   <p>Category: Environment</p>
//                   <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
//                     Join Event
//                   </button>
//                 </li>
//                 <li className="border p-4 rounded">
//                   <h4 className="font-semibold">Discover Event 2</h4>
//                   <p>Category: Education</p>
//                   <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
//                     Join Event
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import {
  FaUser,
  FaCalendar,
  FaSearch,
  FaHistory,
  FaHeart,
} from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data
  const user = {
    name: "John Doe",
    email: "john@handsOn.com",
    avatar: "https://via.placeholder.com/150",
    skills: ["Teaching", "Construction", "Medical"],
    causes: ["Education", "Homelessness", "Environment"],
    hoursVolunteered: 42,
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Side - User Profile */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
          <div className="text-center mb-6">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="bg-blue-100 rounded-lg p-3">
              <p className="font-semibold text-blue-600">
                {user.hoursVolunteered} Volunteer Hours
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FaHeart className="mr-2 text-red-600" />
                Supported Causes
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.causes.map((cause, index) => (
                  <span
                    key={index}
                    className="bg-red-100 px-3 py-1 rounded-full text-sm"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

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
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Volunteer History</h2>
                {volunteerHistory.map((event) => (
                  <div key={event.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-gray-600">{event.date}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {event.hours} hours
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-gray-600">
                          {event.date} • {event.location}
                        </p>
                      </div>
                      <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "discover" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>

                  <select
                    className="w-full md:w-48 px-4 py-2 rounded-lg border"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="education">Education</option>
                    <option value="environment">Environment</option>
                    <option value="healthcare">Healthcare</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {allEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-gray-600">{event.date}</p>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mt-2 inline-block">
                            {event.category}
                          </span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
