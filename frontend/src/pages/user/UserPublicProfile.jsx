/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaUser, FaHeart, FaClock, FaCalendar } from "react-icons/fa";
import { useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import ImageView from "../../components/global/ImageView";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import EventsCreated from "../../components/user/public-profile/EventsCreated";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const { resData: user, loading, error, fetchData } = useApi();
  const [volunteerHistory, setVolunteerHistory] = useState([]);

  useEffect(() => {
    fetchData(`/user/single-user/${userId}`);
  }, [userId]);

  useEffect(() => {
    if (user) {
      setVolunteerHistory(user.volunteerHistory || []);
    }
  }, [user]);

  if (loading || error) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 pt-22">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
            <ImageView
              image={user?.profileImage || "https://placehold.co/400"}
              alt="Profile Image"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.name}
          </h1>
          <p className="text-gray-600 mb-4">
            {user?.bio || "Volunteer enthusiast"}
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-blue-100 rounded-lg p-3">
              <p className="font-semibold text-blue-600 flex items-center">
                <FaClock className="mr-2" />
                {user?.hoursVolunteered || "0"} Hours
              </p>
            </div>
            <div className="bg-red-100 rounded-lg p-3">
              <p className="font-semibold text-red-600 flex items-center">
                <FaHeart className="mr-2" />
                {user?.causes?.length || "0"} Causes Supported
              </p>
            </div>
          </div>
        </div>

        {/* Skills and Causes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaHeart className="mr-2 text-red-600" />
              Supported Causes
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.causes?.map((cause, index) => (
                <span
                  key={index}
                  className="bg-red-100 px-3 py-1 rounded-full text-sm"
                >
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Volunteering History */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FaCalendar className="mr-2 text-green-600" />
            Volunteering History
          </h2>
          {volunteerHistory.length > 0 ? (
            <div className="space-y-4">
              {volunteerHistory.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} • {event.hours}{" "}
                    Hours
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No volunteering history available.</p>
          )}
        </div>

        {/* Events Created by the User */}
        <div className="mt-8">
          <EventsCreated userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserPublicProfile;
