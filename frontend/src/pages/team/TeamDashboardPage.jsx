import { useParams } from "react-router-dom";
import { mockTeams } from "../data/mockTeams";
import { TeamDashboard } from "../components/TeamDashboard";

export const TeamDashboardPage = () => {
  const { teamId } = useParams();
  const team = mockTeams.find((t) => t.id === Number(teamId));

  if (!team) return <div className="p-6 text-red-500">Team not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <TeamDashboard team={team} />
    </div>
  );
};
