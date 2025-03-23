/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { HiUserGroup, HiArrowRight } from "react-icons/hi";

import useApi from "../../hooks/useApi";
import { FaPlus } from "react-icons/fa";

const TopCommunities = () => {
  const { fetchData, resData, loading, error } = useApi();
  const [communitys, setCommunitys] = useState([]);

  // Fetch community on component mount
  useEffect(() => {
    fetchData(`/community/get-all-Communities?sortBy=members`);
  }, [fetchData]);

  // Update community state when resData changes
  useEffect(() => {
    if (resData) {
      setCommunitys(resData);
    }
  }, [resData]);

  console.log("[community]", communitys);

  return (
    <div className="p-6 bg-white border-r border-gray-200 rounded-lg shadow-sm">
      <button
        className="bg-blue-600 text-white px-4 mb-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
        onClick={() => {}}
      >
        <FaPlus className="mr-2" />
        <span>New Community</span>
      </button>
      {/* Header */}
      <h2 className="text-xl font-bold mb-6 text-gray-800">Top Communities</h2>

      {/* Communities List */}
      <ul className="">
        {communitys.map((community) => (
          <li key={community._id}>
            <a
              href={`/community/${community._id}`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Community Icon */}
              {community?.profileImage ? (
                <img
                  src={community?.profileImage}
                  alt={community?.name}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                />
              ) : (
                <div className="p-2 bg-blue-50 rounded-full">
                  <HiUserGroup className="w-5 h-5 text-blue-600" />
                </div>
              )}

              {/* Community Name */}
              <span className="ml-4 text-gray-700 font-medium flex-1">
                {community.name}
              </span>

              {/* Arrow Icon */}
              <HiArrowRight className="w-5 h-5 text-gray-400" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCommunities;
