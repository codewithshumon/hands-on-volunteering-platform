import TeamLeaderboard from "./TeamLeaderboard";

const LeaderboardPage = () => {
  const mockTeams = [
    { id: 1, name: "Green Warriors", points: 1200 },
    { id: 2, name: "Helping Hands", points: 950 },
    { id: 3, name: "Eco Heroes", points: 800 },
  ];

  return <TeamLeaderboard teams={mockTeams} />;
};

export default LeaderboardPage;
