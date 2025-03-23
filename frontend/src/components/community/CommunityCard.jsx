import React, { useCallback, useState } from "react";
import {
  HiUsers,
  HiCalendar,
  HiArrowRight,
  HiGlobe,
  HiLockClosed,
  HiUserAdd,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const CommunityCard = ({ post }) => {
  const {
    name,
    description,
    tags,
    createdBy,
    createdAt,
    profileImage,
    isPublic,
    members,
  } = post;

  const navigate = useNavigate();
  const [isRequestPending, setIsRequestPending] = useState(false);

  // Format the creation date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Handle community join button
  const handleJoin = useCallback(() => {
    navigate(`/community/${post._id}`);
  }, [post._id, navigate]);

  // Handle request to join button
  const handleRequestToJoin = useCallback(() => {
    setIsRequestPending(true);
    alert(`Request sent to join ${name}`);
    navigate(`/community/${post._id}`);
  }, [name, navigate, post._id]);

  return (
    <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left Section: Profile Image and Stats */}
        <div className="w-full md:w-1/3 p-6 bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white relative">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HiUsers className="w-5 h-5" />
              <span className="text-sm">{members.length || 0} Members</span>
            </div>
          </div>

          {/* Public/Private Badge */}
          <div className="absolute top-4 right-4">
            {isPublic ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-full">
                <HiGlobe className="w-4 h-4" />
                <span className="text-xs">Public</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full">
                <HiLockClosed className="w-4 h-4" />
                <span className="text-xs">Private</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="w-full md:w-2/3 p-6">
          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Metadata */}
          <div className="text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Link to={`/user/profile/${createdBy._id}`}>
                <img
                  src={createdBy.profileImage}
                  alt={createdBy.name}
                  className="w-6 h-6 rounded-full object-cover hover:opacity-80 transition-opacity duration-200"
                />
              </Link>
              <span>
                Created by{" "}
                <Link to={`/user/profile/${createdBy._id}`}>
                  <span className="font-medium hover:underline">
                    {createdBy.name}
                  </span>
                </Link>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HiCalendar className="w-5 h-5 text-gray-500" />
              <span>Created on {formattedDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isPublic ? (
              <button
                onClick={handleJoin}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm cursor-pointer"
              >
                <span>Join</span>
                <HiUserAdd className="w-4 h-4 ml-2" />
              </button>
            ) : isRequestPending ? (
              <button
                disabled
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed text-sm"
              >
                <span>Request Pending</span>
              </button>
            ) : (
              <button
                onClick={handleRequestToJoin}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-sm cursor-pointer"
              >
                <span>Request to Join</span>
                <HiArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
            <button
              onClick={() => navigate(`/community/${post._id}`)}
              className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm cursor-pointer"
            >
              <span>View</span>
              <HiArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
