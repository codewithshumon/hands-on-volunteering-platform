import { useParams } from "react-router-dom";

import { mockTeams } from "../../data/mockTeams";

import { mockMembers } from "../../data/mockMembers";
import TeamDashboard from "../../components/teams/TeamDashboard";

const TeamDetailsPage = () => {
  const { teamId } = useParams();
  const team = mockTeams.find((t) => t.id === parseInt(teamId));

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
      <TeamDashboard team={team} members={mockMembers} />
    </div>
  );
};

export default TeamDetailsPage;
