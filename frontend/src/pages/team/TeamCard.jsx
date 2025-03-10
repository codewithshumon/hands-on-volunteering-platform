import { useState } from "react";

export const TeamCard = ({ team, onJoin }) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    setTimeout(() => {
      // Simulate async operation
      onJoin(team.id);
      setIsJoining(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      {/* ... (keep previous TeamCard implementation) */}
      {team.type === "public" && (
        <button
          onClick={handleJoin}
          disabled={isJoining}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {isJoining ? "Joining..." : "Join Team"}
        </button>
      )}
    </div>
  );
};
