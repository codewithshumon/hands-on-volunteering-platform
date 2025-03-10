import { useParams } from "react-router-dom";

import { mockTeams } from "../../data/mockTeams";
import { mockMembers } from "../../data/mockMembers";
import TeamDashboard from "./TeamDashboard";

const TeamDetailsPage = () => {
  const { teamId } = useParams();
  const team = mockTeams.find((t) => t.id === parseInt(teamId));

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
      <TeamDashboard team={team} members={mockMembers} />
      {team.admin === 1 && (
        <button onClick={() => console.log("Delete team:", team.id)}>
          Delete Team
        </button>
      )}
    </div>
  );
};

export default TeamDetailsPage;
