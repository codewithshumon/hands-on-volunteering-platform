import React from "react";

const TeamLeaderboard = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
  const topTeamPoints = sortedTeams[0]?.points || 1;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center flex items-center justify-center gap-3">
        🏆 <span>Community Leaderboard</span>
      </h2>

      <div className="space-y-6">
        {sortedTeams.map((team, index) => {
          const progress = (team.points / topTeamPoints) * 100;

          return (
            <div
              key={team.id}
              className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-8 border-blue-500"
            >
              {/* Ranking Badge */}
              <div
                className={`absolute -top-4 -left-4 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md
                ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                    : index === 1
                    ? "bg-gradient-to-br from-gray-400 to-gray-500"
                    : index === 2
                    ? "bg-gradient-to-br from-orange-500 to-orange-600"
                    : "bg-blue-500"
                }`}
              >
                #{index + 1}
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {team.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full shadow-md
                      ${
                        team.type === "public"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {team.type === "public" ? "🌍 Public" : "🔒 Private"}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      👥{" "}
                      <span className="font-medium">{team.members.length}</span>{" "}
                      members
                    </div>
                    <div className="flex items-center gap-2">
                      🎖️{" "}
                      <span className="font-medium">
                        {team.achievements.length}
                      </span>{" "}
                      achievements
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {team.points.toLocaleString()} pts
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamLeaderboard;
