// ImpactDashboardPage.tsx

import {
  certificates,
  currentUser,
  events,
  milestones,
  users,
} from "../../data/mockData";

import LeaderboardTable from "../../components/impact/LeaderboardTable";
import MilestoneProgressBar from "../../components/impact/MilestoneProgressBar";
import VerificationAlert from "../../components/impact/VerificationAlert";
import ImpactEventsCardList from "../../components/impact/ImpactEventsCardList";

const ImpactDashboardPage = () => {
  return (
    <div className="p-6 bg-[#eeeded] min-h-screen pt-16">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-start">
        <div className=" flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-gray-900">Impact Dashboard</h1>
          <div>
            <div className="text-gray-900 text-[1.3rem] font-bold">
              Hi, {currentUser.name}
            </div>
            <p className="text-gray-600 ">
              {currentUser.totalHours} verified hours • {currentUser.points}{" "}
              points
            </p>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* First two divs stacked in the first column */}
        <div className="space-y-6 md:col-span-1">
          {/* Current Rank Card */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
            <h3 className="text-sm font-medium text-purple-600 uppercase tracking-wider">
              Current Rank
            </h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              #{currentUser.rank}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              You're doing great! Keep it up.
            </p>
          </div>

          {/* Next Milestone Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Next Milestone
            </h3>
            <MilestoneProgressBar
              currentHours={currentUser.totalHours}
              milestones={milestones}
            />
            <p className="text-sm text-gray-500 mt-2">
              Reach the next milestone to unlock rewards.
            </p>
          </div>
        </div>

        {/* Certificates Card - Takes the second column */}
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 md:col-span-1">
          <h3 className="text-sm font-medium text-green-600 uppercase tracking-wider">
            Certificates
          </h3>
          <div className="mt-4 space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-900">{cert.title}</p>
                  <p className="text-sm text-gray-500">
                    Earned on {cert.dateEarned}
                  </p>
                </div>
                <span className="text-2xl">🏆</span>
              </div>
            ))}
          </div>
          {certificates.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              No certificates earned yet. Keep volunteering!
            </p>
          )}
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
            <ImpactEventsCardList events={events} />
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
