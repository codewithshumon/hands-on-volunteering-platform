import {
  FaUser,
  FaHeart,
  FaCircle,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";
import { FiMessageSquare, FiClock, FiCalendar } from "react-icons/fi";
import ImageView from "../../global/ImageView";
import EventsCreated from "./EventsCreated";

const PublicViewUserProfile = ({
  user,
  onlineUsers,
  volunteerHistory,
  userId,
  openChat,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-400"></div>

        {/* Profile Content - Matching Previous Version */}
        <div className="px-6 pb-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-10">
            <div className="relative">
              <ImageView
                image={user?.profileImage || "https://placehold.co/400"}
                alt="Profile Image"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              {onlineUsers[user?._id] && (
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <FaCircle className="text-white text-xs animate-pulse" />
                </div>
              )}
            </div>

            <div className="sm:ml-6 mt-5 sm:mt-10 pt-5">
              <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center  ">
                <h1 className="text-2xl font-bold  text-gray-900">
                  {user?.name}
                </h1>
                <span className="ml-3 px-2  text-xs bg-blue-100 text-blue-800 rounded-full flex items-center">
                  <FaCircle
                    className={`text-xs ${
                      onlineUsers[user?._id]
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  {onlineUsers[user?._id] ? "Online" : "Offline"}
                </span>
              </div>

              <p className="text-gray-600 ">
                {user?.bio || "Volunteer enthusiast"}
              </p>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {user?.location && (
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-gray-400" />
                    {user.location}
                  </span>
                )}
                {user?.email && (
                  <span className="flex items-center">
                    <FaRegEnvelope className="mr-1 text-gray-400" />
                    {user.email}
                  </span>
                )}
                {user?.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <FaLink className="mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>

            <div className="sm:ml-auto mt-4 sm:mt-0">
              <button
                onClick={() => openChat(user)}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                <FiMessageSquare className="mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {user?.hoursVolunteered || "0"}
          </div>
          <div className="text-sm text-gray-500">Volunteer Hours</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {user?.eventsAttended?.length || "0"}
          </div>
          <div className="text-sm text-gray-500">Events Attended</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {user?.eventsCreated?.length || "0"}
          </div>
          <div className="text-sm text-gray-500">Events Created</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {user?.skills?.length || "0"}
          </div>
          <div className="text-sm text-gray-500">Skills</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Volunteering History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FiCalendar className="mr-2 text-green-600" />
              Volunteering History
            </h2>
            {volunteerHistory.length > 0 ? (
              <div className="space-y-4">
                {volunteerHistory.map((event, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gray-50/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                          <FiClock className="mr-1.5" />
                          {event.hours} Hours •{" "}
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-gray-700 mt-3 text-sm">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <FiCalendar className="inline-block text-3xl" />
                </div>
                <p className="text-gray-600">
                  No volunteering history available yet.
                </p>
              </div>
            )}
          </div>

          {/* Events Created */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <EventsCreated userId={userId} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              About
            </h2>
            <p className="text-gray-700">
              {user?.about || (
                <span className="text-gray-500 italic">
                  No bio information provided yet.
                </span>
              )}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {skill}
                </span>
              ))}
              {(!user?.skills || user.skills.length === 0) && (
                <p className="text-gray-600 text-sm">No skills listed yet.</p>
              )}
            </div>
          </div>

          {/* Causes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaHeart className="mr-2 text-red-600" />
              Supported Causes
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.causes?.map((cause, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-red-800 px-3 py-1 rounded-full text-sm hover:bg-red-100 transition-colors"
                >
                  {cause}
                </span>
              ))}
              {(!user?.causes || user.causes.length === 0) && (
                <p className="text-gray-600 text-sm">
                  No causes supported yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicViewUserProfile;
