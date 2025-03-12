import { useLocation, useNavigate } from "react-router-dom";
import ImpactEventCard from "./ImpactEventCard";

const ImpactEventsCardList = ({ events }) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("[events]", events);

  // Determine if the current route is "/impact" or "/impact/log-hour"
  const isImpactRoute = location.pathname === "/impact" || "/impact/";

  // Slice the events array to show only 5 events on the "/impact" route
  const displayedEvents = isImpactRoute ? events.slice(0, 5) : events;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {displayedEvents.map((event, index) => (
          <ImpactEventCard key={index} event={event} />
        ))}
      </div>

      {/* Show "View All" button only on the "/impact" route */}
      {isImpactRoute && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/impact/log-hour")}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default ImpactEventsCardList;
