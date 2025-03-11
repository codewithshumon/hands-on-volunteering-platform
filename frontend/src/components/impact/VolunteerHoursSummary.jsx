import { Clock } from "react-feather";

// Enhanced Components
const VolunteerHoursSummary = ({ user }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-blue-100 p-3">
        <Clock className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Volunteer Hours</h3>
        <p className="text-2xl font-bold text-gray-900">{user.totalHours}h</p>
      </div>
    </div>
    <div className="h-2 rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-blue-600"
        style={{ width: `${Math.min((user.totalHours / 100) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export default VolunteerHoursSummary;
