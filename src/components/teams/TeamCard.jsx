const TeamCard = ({ team, onViewDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{team.name}</h3>
      <p className="text-gray-600 mb-4">{team.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Type: {team.type === "public" ? "🌍 Public" : "🔒 Private"}
      </p>
      <button
        onClick={() => onViewDetails(team.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

export default TeamCard;
