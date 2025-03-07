const VolunteerHistory = () => {
  const history = [
    { event: "Tree Planting", hours: 5, date: "2023-10-01" },
    { event: "Food Drive", hours: 3, date: "2023-09-25" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Volunteer History
        </h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">{item.event}</p>
              <p>
                {item.hours} hours on {item.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerHistory;
