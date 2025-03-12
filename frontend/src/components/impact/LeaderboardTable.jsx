import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LeaderboardTable = ({ users, currentUserId }) => {
  const location = useLocation(); // Get current URL path
  const navigate = useNavigate(); // For navigation
  const [sortBy, setSortBy] = useState("points"); // Default sort by points

  // Sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "points") {
      return b.points - a.points; // Sort by points (descending)
    } else if (sortBy === "hours") {
      return b.totalHours - a.totalHours; // Sort by hours (descending)
    } else if (sortBy === "rank") {
      return a.rank - b.rank; // Sort by rank (ascending)
    }
    return 0;
  });

  // Determine if we're on the "/impact" route
  const isImpactRoute = location.pathname === "/impact" || "/impact/";

  // Slice users to show only 5 if on "/impact"
  const displayedUsers = isImpactRoute ? sortedUsers.slice(0, 5) : sortedUsers;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Top Contributors
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 px-3 py-1 rounded-md text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="points">Points</option>
            <option value="hours">Hours</option>
            <option value="rank">Rank</option>
          </select>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {displayedUsers.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-4 rounded-lg ${
              user.id === currentUserId
                ? "bg-purple-50 border-l-4 border-purple-500"
                : "bg-gray-50"
            }`}
          >
            {/* Rank Badge */}
            <span
              className={`w-8 text-center text-sm font-medium ${
                user.rank === 1
                  ? "text-yellow-400"
                  : user.rank === 2
                  ? "text-gray-400"
                  : user.rank === 3
                  ? "text-amber-600"
                  : "text-gray-500"
              }`}
            >
              #{user.rank}
            </span>

            {/* Avatar */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full mx-4"
            />

            {/* User Details */}
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user.name}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{user.points} points</span>
                <span>•</span>
                <span>{user.totalHours} hours</span>
              </div>
            </div>

            {/* Medal Icons for Top 3 */}
            {user.rank <= 3 && (
              <span className="ml-2 text-2xl">
                {user.rank === 1 && "🥇"}
                {user.rank === 2 && "🥈"}
                {user.rank === 3 && "🥉"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* "View All" Button (only on "/impact" route) */}
      {isImpactRoute && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/impact/leader-board")} // Navigate to leaderboard page
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
