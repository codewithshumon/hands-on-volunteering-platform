// src/data/mockTeams.js
export const mockTeams = [
  {
    id: 1,
    name: "Green Warriors",
    type: "public",
    description: "Dedicated to city-wide environmental cleanups",
    image: "https://example.com/green-warriors.jpg",
    members: [
      { id: 1, name: "Alice Smith", role: "Leader", joinedDate: "2023-01-15" },
      { id: 2, name: "Bob Johnson", role: "Member", joinedDate: "2023-02-01" },
    ],
    events: [
      { id: 1, name: "Beach Cleanup", date: "2023-03-15", participants: 25 },
      { id: 2, name: "Tree Planting", date: "2023-04-22", participants: 40 },
    ],
    achievements: [
      { id: 1, title: "1000 Trees Planted", icon: "🌳" },
      { id: 2, title: "Eco Hero Award", icon: "🏆" },
    ],
    points: 2450,
    tags: ["environment", "cleanups", "sustainability"],
  },
  {
    id: 2,
    name: "Book Buddies",
    type: "private",
    description: "Private group for library volunteers",
    image: "https://example.com/book-buddies.jpg",
    members: [
      {
        id: 1,
        name: "Charlie Brown",
        role: "Organizer",
        joinedDate: "2023-01-10",
      },
    ],
    events: [
      { id: 1, name: "Book Drive", date: "2023-03-01", participants: 8 },
    ],
    achievements: [{ id: 1, title: "500 Books Collected", icon: "📚" }],
    points: 850,
    tags: ["education", "literacy"],
  },
];
