import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaComment,
  FaArrowRight,
  FaTimes,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import useApi from "../../../hooks/useApi";

const TopMembersSidebar = ({ openChat, isExpanded, onClose, onlineUsers }) => {
  const { resData, loading, error, fetchData } = useApi();
  const [topMembers, setTopMembers] = useState([]);

  useEffect(() => {
    fetchData("/user/get-all-user");
  }, [fetchData]);

  useEffect(() => {
    if (resData) {
      const sortedMembers = [...resData]
        .sort((a, b) => (b.hoursVolunteered || 0) - (a.hoursVolunteered || 0))
        .slice(0, 5);
      setTopMembers(sortedMembers);
    }
  }, [resData]);

  if (loading) return <div className="p-4">Loading top members...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading members</div>;

  return (
    <div
      className={`bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 ${
        !isExpanded && "hidden"
      }`}
      style={{ width: isExpanded ? "25%" : "0" }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaUsers className="text-blue-500 mr-2" />
            Top Volunteers
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-hidden hover:overflow-y-auto">
          <div className="space-y-4 pr-2">
            {topMembers.map((member) => (
              <div
                key={member._id}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="relative mr-3">
                  <img
                    src={member.profileImage || "https://placehold.co/400"}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {onlineUsers[member._id] && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1 text-xs" />
                    <span>{member.hoursVolunteered || 0} hours</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.skills?.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills?.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{member.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChat(member);
                    }}
                    className="p-2 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
                    aria-label="Message this user"
                  >
                    <FaComment />
                  </button>
                  <Link
                    to={`/user/profile/${member._id}`}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    aria-label="View profile"
                  >
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMembersSidebar;
