const MilestoneProgressBar = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Milestone Progress</h2>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${(user.totalHours % 50) * 2}%` }}
      ></div>
    </div>
    <p className="mt-2 text-sm">
      {user.totalHours % 50}/50 hours to next milestone
    </p>
  </div>
);

export default MilestoneProgressBar;
