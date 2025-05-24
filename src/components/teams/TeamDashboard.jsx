import { FaTrash } from "react-icons/fa";

const TeamDashboard = ({ team, members }) => {
  if (!team) {
    return <p>Loading...</p>; // Handle case where team is undefined
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      {/* Dashboard Header */}
      <div className=" w-full flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {team.name} Dashboard
        </h2>

        <div className="w-fit h-fit">
          {team.admin === 1 && (
            <button
              onClick={() => {}}
              className="relative bg-red-500 text-white px-6 py-2 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:scale-105 focus:outline-none group"
            >
              <div className="flex items-center space-x-2 relative z-10">
                <FaTrash className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Delete Team</span>
              </div>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          )}
        </div>
      </div>

      {/* Members Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Members</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {team.members.map((memberId) => (
            <li
              key={memberId}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {members.find((m) => m.id === memberId).name[0]}
              </div>
              <span className="text-gray-700 font-medium">
                {members.find((m) => m.id === memberId).name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Events</h3>
        <ul className="space-y-3">
          {team.events.map((event, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                {index + 1}
              </div>
              <span className="text-gray-700">{event}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Achievements
        </h3>
        <ul className="space-y-3">
          {team.achievements.map((achievement, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {index + 1}
              </div>
              <span className="text-gray-700">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDashboard;
