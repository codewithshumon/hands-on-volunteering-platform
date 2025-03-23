import { TopCommunities } from "../../components/community/TopCommunities";
import { CommunityProfile } from "../../components/community/CommunityProfile";

const CommunityFeedPage = () => {
  // Dummy data for top communities, posts, and profile

  const communityPosts = [
    {
      id: 1,
      title: "Help needed for food distribution",
      description: "We need volunteers to distribute food to the homeless.",
      comments: [
        { id: 1, text: "I can help with this!" },
        { id: 2, text: "Count me in!" },
      ],
    },
    {
      id: 2,
      title: "Winter clothes donation drive",
      description: "Join us to distribute winter clothes to those in need.",
      comments: [
        { id: 1, text: "I have some clothes to donate." },
        { id: 2, text: "Where is the location?" },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Left Sidebar - Top Communities */}
      <div className="w-1/4">
        <TopCommunities />
      </div>

      {/* Middle Section - Community Posts Feed */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Community Feed</h2>
        <div className="space-y-6">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  Comments:
                </h4>
                <div className="space-y-2">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 bg-gray-50 rounded-lg text-gray-700"
                    >
                      {comment.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/4">
        <CommunityProfile />
      </div>
    </div>
  );
};

export default CommunityFeedPage;
