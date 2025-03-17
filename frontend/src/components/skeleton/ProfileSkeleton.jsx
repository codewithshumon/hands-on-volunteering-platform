import { FaUser, FaHeart } from "react-icons/fa";

const ProfileSkeleton = () => {
  return (
    <div className="md:col-span-1 bg-[#faf9f9] rounded-xl shadow-md p-6 h-fit relative">
      {/* Profile Content */}
      <div className="text-center mb-6">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 shimmer"></div>
        </div>

        {/* Name */}
        <div className="h-8 bg-gray-200 rounded-lg mx-auto w-48 mb-2 shimmer"></div>

        {/* Hours Volunteered */}
        <div className=" rounded-lg p-1 w-24 mx-auto">
          <div className="h-6 bg-gray-200 rounded-lg shimmer"></div>
        </div>
      </div>

      {/* Skills and Causes */}
      <div className="space-y-4">
        {/* Skills Section */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="h-8 bg-gray-200 rounded-full w-24 shimmer"></div>
            <div className="h-8 bg-gray-200 rounded-full w-24 shimmer"></div>
          </div>
        </div>

        {/* Causes Section */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <FaHeart className="mr-2 text-red-600" />
            Supported Causes
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="h-8 bg-gray-200 rounded-full w-24 shimmer"></div>
            <div className="h-8 bg-gray-200 rounded-full w-24 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
