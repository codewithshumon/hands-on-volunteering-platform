export const TeamMembers = ({ members }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {members.map((member) => (
      <div
        key={member.id}
        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
      >
        <img
          src={member.avatar}
          alt={member.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
        <div className="ml-auto text-sm text-gray-500">
          Joined {member.joinedDate}
        </div>
      </div>
    ))}
  </div>
);

// Team Events Section
export const TeamEvents = ({ events }) => (
  <div className="space-y-4">
    {events.map((event) => (
      <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{event.name}</h3>
          <span className="text-sm text-gray-500">{event.date}</span>
        </div>
        <p className="text-gray-600 text-sm">{event.description}</p>
        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {event.participants} participants
          </span>
        </div>
      </div>
    ))}
  </div>
);

// Team Achievements Section
export const TeamAchievements = ({ achievements }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {achievements.map((achievement) => (
      <div
        key={achievement.id}
        className="p-4 text-center bg-gray-50 rounded-lg"
      >
        <div className="text-3xl mb-2">{achievement.icon}</div>
        <h3 className="font-medium mb-1">{achievement.title}</h3>
        <p className="text-sm text-gray-500">{achievement.description}</p>
      </div>
    ))}
  </div>
);
