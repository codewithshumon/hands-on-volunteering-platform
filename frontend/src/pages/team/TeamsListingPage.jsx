import { useState } from "react";
import { TeamCard } from "../components/TeamCard";
import { TeamLeaderboard } from "../components/TeamLeaderboard";
import { mockTeams } from "../../data/mockTeams";

export const TeamsListingPage = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [showType, setShowType] = useState("all");

  const filteredTeams = teams.filter((team) =>
    showType === "all" ? true : team.type === showType
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Volunteer Teams</h1>
        <select
          value={showType}
          onChange={(e) => setShowType(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Teams</option>
          <option value="public">Public Teams</option>
          <option value="private">Private Teams</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onJoin={(teamId) => {
                setTeams(
                  teams.map((t) =>
                    t.id === teamId
                      ? {
                          ...t,
                          members: [
                            ...t.members,
                            {
                              id: Date.now(),
                              name: "New Member",
                              role: "Member",
                            },
                          ],
                        }
                      : t
                  )
                );
              }}
            />
          ))}
        </div>

        <div className="md:col-span-1">
          <TeamLeaderboard
            teams={[...teams].sort((a, b) => b.points - a.points).slice(0, 5)}
          />
        </div>
      </div>
    </div>
  );
};
