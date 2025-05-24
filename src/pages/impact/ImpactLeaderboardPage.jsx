import LeaderboardTable from "../../components/impact/LeaderboardTable";
import { users } from "../../data/mockData";

const ImpactLeaderboardPage = () => (
  <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-8 pt-16">Leaderboard</h1>
    <LeaderboardTable users={users} />
  </div>
);

export default ImpactLeaderboardPage;
