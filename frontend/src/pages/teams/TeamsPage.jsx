import { useState } from "react";
import { mockTeams } from "../../data/mockTeams";
import CreateTeamModal from "../../components/teams/CreateTeamModal";
import TeamCard from "../../components/teams/TeamCard";
import TeamLeaderboard from "../../components/teams/TeamLeaderboard";

const TeamPage = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [showModal, setShowModal] = useState(false);

  const handleCreateTeam = (newTeam) => {
    // Append the new team to the end of the array
    setTeams([
      ...teams,
      {
        ...newTeam,
        id: teams.length + 1, // Ensure unique ID
        members: [],
        events: [],
        achievements: [],
        admin: 1,
      },
    ]);
  };

  // Reverse the teams array for display
  const reversedTeams = [...teams].reverse();

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-22">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teams</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors mb-6"
      >
        Create New Team
      </button>
      {showModal && (
        <CreateTeamModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateTeam}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reversedTeams.map((team) => (
          <TeamCard key={team.id} team={team} onViewDetails={() => {}} />
        ))}
      </div>
      <TeamLeaderboard teams={teams} />
    </div>
  );
};

export default TeamPage;
