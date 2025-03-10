export const TeamLeaderboard = ({ teams }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Top Teams</h2>
      <div className="space-y-4">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-medium">{index + 1}.</span>
              <img
                src={team.image}
                alt={team.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.points} points</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {team.members} members
              </span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  team.type === "private"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {team.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
