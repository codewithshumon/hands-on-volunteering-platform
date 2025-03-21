import { events } from "../../data/mockData";
import ImpactEventCard from "../../components/impact/ImpactEventCard";

const LogHoursPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen pt-16">
      <h1 className="text-3xl font-bold mb-8">Log Hours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <ImpactEventCard key={event.id} event={event} /> // Use EventCard
        ))}
      </div>
    </div>
  );
};

export default LogHoursPage;
