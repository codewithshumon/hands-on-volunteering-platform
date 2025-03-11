import { currentUser, events, users } from "../../data/mockData";
import ImpactEventCard from "../../components/impact/ImpactEventCard";
import LeaderboardTable from "../../components/impact/LeaderboardTable";
import MilestoneProgressBar from "../../components/impact/MilestoneProgressBar";
import VolunteerHoursSummary from "../../components/impact/VolunteerHoursSummary";

const ImpactDashboardPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Impact Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <VolunteerHoursSummary user={currentUser} />
        <MilestoneProgressBar user={currentUser} />
      </div>
      <div className="mb-8">
        <LeaderboardTable users={users.slice(0, 5)} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <ImpactEventCard key={event.id} event={event} /> // Use EventCard
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboardPage;
