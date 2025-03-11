import LeaderboardTable from "../../components/impact/LeaderboardTable";

const ImpactLeaderboardPage = ({ users }) => (
  <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
    <LeaderboardTable users={users} />
  </div>
);

export default ImpactLeaderboardPage;
