// ImpactDashboardPage.tsx

import {
  certificates,
  currentUser,
  events,
  milestones,
  users,
} from "../../data/mockData";

import CertificateBadge from "../../components/impact/CertificateBadge";
import ImpactEventCard from "../../components/impact/ImpactEventCard";
import LeaderboardTable from "../../components/impact/LeaderboardTable";
import MilestoneProgressBar from "../../components/impact/MilestoneProgressBar";
import VerificationAlert from "../../components/impact/VerificationAlert";

const ImpactDashboardPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impact Dashboard</h1>
          <p className="text-gray-600 mt-2">
            {currentUser.totalHours} verified hours • {currentUser.points}{" "}
            points
          </p>
        </div>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium">
          Log Hours
        </button>
      </div>

      {/* Verification Alert */}
      {currentUser.pendingVerifications > 0 && (
        <VerificationAlert count={currentUser.pendingVerifications} />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Current Rank</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            #{currentUser.rank}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Next Milestone</h3>
          <MilestoneProgressBar
            currentHours={currentUser.totalHours}
            milestones={milestones}
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Certificates</h3>
          <div className="mt-2 flex space-x-2">
            {certificates.map((cert) => (
              <CertificateBadge key={cert.id} certificate={cert} />
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Leaderboard
        </h2>
        <LeaderboardTable users={users} currentUserId={currentUser.id} />
      </div>

      {/* Recent Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Events
          </h2>
          <div className="space-y-4">
            {events.map((event) => (
              <ImpactEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Verification Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Verifications
          </h2>
          <div className="space-y-4">
            {/* Example verification request */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  Community Garden Setup
                </h3>
                <p className="text-sm text-gray-500">
                  3 hours • Requested by John Doe
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-green-600 px-3 py-1 rounded-md">
                  Approve
                </button>
                <button className="text-red-600 px-3 py-1 rounded-md">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImpactDashboardPage;
