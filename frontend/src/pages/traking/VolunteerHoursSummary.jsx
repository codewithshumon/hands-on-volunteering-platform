const VolunteerHoursSummary = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Volunteer Summary</h2>
    <div className="space-y-2">
      <p>
        <span className="font-semibold">Total Hours:</span> {user.totalHours}
      </p>
      <p>
        <span className="font-semibold">Points Earned:</span> {user.points}
      </p>
      <p>
        <span className="font-semibold">Next Milestone:</span>
      </p>
    </div>
  </div>
);

export default VolunteerHoursSummary;
