const MilestoneProgressBar = ({ currentHours, milestones }) => {
  const nextMilestone = milestones.find(
    (m) => m.pointsRequired > currentHours * 5
  );

  return (
    <div>
      <p className="text-lg font-semibold text-gray-900">
        {nextMilestone?.title || "All milestones achieved!"}
      </p>
      {nextMilestone && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{
                width: `${Math.min(
                  ((currentHours * 5) / nextMilestone.pointsRequired) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {nextMilestone.pointsRequired - currentHours * 5} points to go
          </p>
        </div>
      )}
    </div>
  );
};
export default MilestoneProgressBar;
