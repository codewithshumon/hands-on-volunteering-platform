const LeaderboardTable = ({ users }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 ">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Top Contributors
      </h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-600">{user.points} points</p>
            </div>
            <span className="text-xl font-bold text-purple-600">
              #{user.rank}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;
