const LeaderboardTable = ({ users = [] }) => {
  // Fallback to an empty array if users is undefined
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-4 px-6">Rank</th>
            <th className="text-left py-4 px-6">Name</th>
            <th className="text-left py-4 px-6">Hours</th>
            <th className="text-left py-4 px-6">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6 font-medium">{user.name}</td>
              <td className="py-4 px-6">{user.totalHours}</td>
              <td className="py-4 px-6 text-blue-600 font-semibold">
                {user.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
