import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  HiUsers,
  HiCalendar,
  HiPencil,
  HiGlobe,
  HiLockClosed,
  HiUserAdd, // Add this icon
} from "react-icons/hi";

const CommunityProfile = () => {
  const { fetchData, resData, loading, error } = useApi();
  const [community, setCommunity] = useState({});
  const { communityId } = useParams();

  // Fetch community on component mount
  useEffect(() => {
    fetchData(`/community/get-community/${communityId}`);
  }, [fetchData, communityId]);

  // Update community state when resData changes
  useEffect(() => {
    if (resData) {
      setCommunity(resData);
    }
  }, [resData]);

  // Format the creation date
  const formattedDate = community?.createdAt
    ? new Date(community.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  // Handle loading and error states
  if (loading) {
    return <div className="text-center py-4">Loading community details...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Gradient Background Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        {/* Gradient Cover Photo */}
        <div className="relative grid grid-cols-1 px-3 h-fit p-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg">
          {/* Community Header */}
          <div className="w-full justify-center flex items-center space-x-4">
            <img
              src={community?.profileImage}
              alt={community?.name}
              className="w-16 h-16 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold text-white">
                {community?.name || "Community Name"}
              </h3>
              <p className="text-sm text-white flex items-center space-x-1">
                {community?.isPublic ? (
                  <>
                    <HiGlobe className="w-4 h-4" />
                    <span>Public community</span>
                  </>
                ) : (
                  <>
                    <HiLockClosed className="w-4 h-4" />
                    <span>Private community</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Members and Created On Stats */}
          <div className="w-full flex items-center justify-center">
            <div className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <HiUsers className="w-4 h-4 text-white" />
                <p className="text-sm text-gray-100">Members</p>
              </div>
              <p className="text-lg font-bold text-gray-100 text-center">
                {community?.members?.length || 0}
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <HiCalendar className="w-4 h-4 text-white" />
                <p className="text-sm text-gray-100">Created On</p>
              </div>
              <p className="text-lg font-bold text-gray-100 text-center">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Description */}
          <p className="text-gray-600 mb-6 text-center sm:text-left">
            {community?.description || "No description available."}
          </p>

          {/* Tags */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {community?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
              <HiUserAdd className="w-5 h-5 mr-2" /> {/* Add HiUserAdd icon */}
              <span>Join</span>
            </button>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center">
              <HiPencil className="w-5 h-5 mr-2" />
              <span>Create</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfile;
