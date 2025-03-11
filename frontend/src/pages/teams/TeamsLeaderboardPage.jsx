import TeamLeaderboard from "../../components/teams/TeamLeaderboard";

const TeamsLeaderboardPage = () => {
  const mockTeams = [
    {
      id: 1,
      name: "Green Warriors",
      points: 24500,
      type: "public",
      members: Array(15).fill(null),
      achievements: Array(8).fill(null),
      latestActivity: "Tree Planting Drive",
    },
    {
      id: 2,
      name: "Ocean Savers",
      points: 19800,
      type: "public",
      members: Array(12).fill(null),
      achievements: Array(6).fill(null),
      latestActivity: "Beach Cleanup",
    },
    {
      id: 3,
      name: "Eco Innovators",
      points: 17250,
      type: "private",
      members: Array(8).fill(null),
      achievements: Array(5).fill(null),
      latestActivity: "Solar Panel Workshop",
    },
    {
      id: 4,
      name: "Urban Gardeners",
      points: 15400,
      type: "public",
      members: Array(10).fill(null),
      achievements: Array(4).fill(null),
      latestActivity: "Community Garden Setup",
    },
    {
      id: 5,
      name: "Clean Air Collective",
      points: 13200,
      type: "public",
      members: Array(9).fill(null),
      achievements: Array(3).fill(null),
      latestActivity: "Cycling Campaign",
    },
    {
      id: 6,
      name: "Wildlife Guardians",
      points: 11500,
      type: "private",
      members: Array(6).fill(null),
      achievements: Array(2).fill(null),
      latestActivity: "Animal Shelter Support",
    },
    {
      id: 7,
      name: "Zero Waste Heroes",
      points: 9800,
      type: "public",
      members: Array(7).fill(null),
      achievements: Array(2).fill(null),
      latestActivity: "Recycling Workshop",
    },
    {
      id: 8,
      name: "Climate Action Team",
      points: 8450,
      type: "public",
      members: Array(5).fill(null),
      achievements: Array(1).fill(null),
      latestActivity: "Awareness Campaign",
    },
    {
      id: 9,
      name: "Forest Protectors",
      points: 7200,
      type: "private",
      members: Array(4).fill(null),
      achievements: Array(1).fill(null),
      latestActivity: "Tree Conservation",
    },
    {
      id: 10,
      name: "Eco Educators",
      points: 6100,
      type: "public",
      members: Array(3).fill(null),
      achievements: Array(1).fill(null),
      latestActivity: "School Workshops",
    },
  ];

  return <TeamLeaderboard teams={mockTeams} />;
};

export default TeamsLeaderboardPage;
