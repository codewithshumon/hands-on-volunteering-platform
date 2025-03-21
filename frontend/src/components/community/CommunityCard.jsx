import React, { useCallback, useState } from "react";
import {
  HiUsers,
  HiCalendar,
  HiArrowRight,
  HiGlobe,
  HiLockClosed,
} from "react-icons/hi"; // Icons from react-icons
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
    events,
  } = post;

  const navigate = useNavigate();
  const [isRequestPending, setIsRequestPending] = useState(false); // State to track request status

  // Format the creation date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // handle community join button
  const handleJoin = useCallback(() => {
    navigate(`/community/${post._id}`);
  }, [post._id, navigate]);

  // handle request to join button
  const handleRequestToJoin = useCallback(() => {
    // Simulate sending a join request
    setIsRequestPending(true); // Set request to pending
    alert(`Request sent to join ${name}`);
  }, [name]);

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col md:flex-row">
      {/* Left Section: Profile Image and Stats */}
      <div className="w-full md:w-1/3 p-4 bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white">
        {/* Profile Image */}
        <img
          src={profileImage}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white mb-4"
        />

        {/* Stats */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HiUsers className="w-5 h-5" />
            <span className="text-sm">{members.length} Members</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HiCalendar className="w-5 h-5" />
            <span className="text-sm">{events.length} Events</span>
          </div>
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="w-full md:w-2/3 p-6">
        {/* Name and Public/Private Badge */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
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

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Link to={`/user/profile/${createdBy._id}`}>
              <img
                src={createdBy.profileImage}
                alt={createdBy.name}
                className="w-5 h-5 rounded-full object-cover"
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

        {/* Action Button */}
        {isPublic ? (
          <button
            onClick={handleJoin}
            className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm cursor-pointer"
          >
            <span>Join Community</span>
            <HiArrowRight className="w-4 h-4 ml-2" />
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
      </div>
    </div>
  );
};

export default CommunityCard;
