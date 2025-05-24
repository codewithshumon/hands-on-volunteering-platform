const MyHelpRequests = ({ events }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Help Requests</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">Date: {event.date}</p>
            <p className="text-gray-600">Description: {event.description}</p>
            <p className="text-gray-600">
              Category: <span className="font-semibold">{event.category}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHelpRequests;
