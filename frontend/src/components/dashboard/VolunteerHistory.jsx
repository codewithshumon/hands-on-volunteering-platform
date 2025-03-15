const VolunteerHistory = ({ history }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Volunteer History</h2>
      {history.map((event) => (
        <div key={event.id} className="border-b pb-4 last:border-0">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {event.hours} hours
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerHistory;
