const TeamLeaderboard = ({ teams }) => {
  const sortedTeams = [...teams].sort(
    (a, b) => b.achievements.length - a.achievements.length
  );

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
      <ol className="space-y-2">
        {sortedTeams.map((team) => (
          <li
            key={team.id}
            className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-800">{team.name}</span> -{" "}
            <span className="text-gray-600">
              {team.achievements.length} achievements
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TeamLeaderboard;
