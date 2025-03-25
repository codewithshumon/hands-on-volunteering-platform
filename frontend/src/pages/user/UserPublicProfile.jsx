/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaClock,
  FaCalendar,
  FaComments,
  FaCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import ImageView from "../../components/global/ImageView";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import EventsCreated from "../../components/user/public-profile/EventsCreated";
import ChatBox from "../../components/chat/ChatBox";
import TopMembersSidebar from "../../components/user/public-profile/TopMembersSidebar";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const { resData: user, loading, error, fetchData } = useApi();
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    fetchData(`/user/single-user/${userId}`);

    // Simulate online status updates
    const statusInterval = setInterval(() => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: Math.random() > 0.3,
      }));
    }, 10000);

    return () => clearInterval(statusInterval);
  }, [userId]);

  useEffect(() => {
    if (user) {
      setVolunteerHistory(user.volunteerHistory || []);
      setOnlineUsers((prev) => ({
        ...prev,
        [user._id]: Math.random() > 0.5,
      }));
    }
  }, [user]);

  const openChat = (user) => {
    setActiveChats((prevChats) => {
      const existingChat = prevChats.find((chat) => chat.userId === user._id);
      if (!existingChat) {
        return [
          ...prevChats,
          {
            userId: user._id,
            user,
            isMinimized: false,
            messages: [],
            hasNewMessage: false,
          },
        ];
      }
      return prevChats.map((chat) =>
        chat.userId === user._id
          ? { ...chat, isMinimized: false, hasNewMessage: false }
          : chat
      );
    });
  };

  const closeChat = (userId) => {
    setActiveChats((prevChats) =>
      prevChats.filter((chat) => chat.userId !== userId)
    );
  };

  const toggleMinimize = (userId) => {
    setActiveChats((prevChats) =>
      prevChats.map((chat) =>
        chat.userId === userId
          ? { ...chat, isMinimized: !chat.isMinimized, hasNewMessage: false }
          : chat
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  if (loading || error) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex">
      {/* Sidebar Area */}
      <div
        className={`relative ${
          isSidebarExpanded ? "w-1/4" : "w-0"
        } transition-all duration-300`}
      >
        <TopMembersSidebar openChat={openChat} isExpanded={isSidebarExpanded} />
      </div>

      {/* Fixed Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed left-0 top-1/2 z-50 w-8 h-8 bg-white rounded-r-full shadow-md flex items-center justify-center transform -translate-y-1/2 ${
          isSidebarExpanded ? "ml-[25%]" : "ml-0"
        } transition-all duration-300 border border-gray-200 border-l-0 hover:bg-gray-100`}
        aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isSidebarExpanded ? (
          <FaChevronLeft className="text-gray-600" />
        ) : (
          <FaChevronRight className="text-gray-600" />
        )}
      </button>

      {/* Main Content Area */}
      <div
        className={`${
          isSidebarExpanded ? "w-3/4" : "w-full"
        } transition-all duration-300`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
              <ImageView
                image={user?.profileImage || "https://placehold.co/400"}
                alt="Profile Image"
              />
              {onlineUsers[user?._id] && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {user?.bio || "Volunteer enthusiast"}
              <span className="flex items-center justify-center mt-2 text-sm">
                <FaCircle
                  className={`mr-1 text-xs ${
                    onlineUsers[user?._id] ? "text-green-500" : "text-gray-400"
                  }`}
                />
                {onlineUsers[user?._id] ? "Online" : "Offline"}
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="font-semibold text-blue-600 flex items-center">
                  <FaClock className="mr-2" />
                  {user?.hoursVolunteered || "0"} h
                </p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 hover:bg-green-200 transition-colors">
                <button
                  className="font-semibold text-blue-700 flex items-center cursor-pointer"
                  onClick={() => openChat(user)}
                >
                  <div className="relative mr-2">
                    <FaComments />
                    {onlineUsers[user?._id] ? (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    ) : (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"></span>
                    )}
                  </div>
                  Chat
                </button>
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
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.hours} Hours
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No volunteering history available.
              </p>
            )}
          </div>

          {/* Events Created by the User */}
          <div className="mt-8">
            <EventsCreated userId={userId} />
          </div>
        </div>
      </div>

      {/* Chat Windows */}
      <div className="fixed bottom-0 right-5 z-50 flex flex-row-reverse items-end">
        {activeChats.map((chat, index) => (
          <div
            key={index}
            className="mr-2"
            style={{
              marginRight: "20px",
            }}
          >
            <ChatBox
              user={chat.user}
              messages={chat.messages}
              onClose={() => closeChat(chat.userId)}
              onMinimize={() => toggleMinimize(chat.userId)}
              onOpen={() => toggleMinimize(chat.userId)}
              isMinimized={chat.isMinimized}
              hasNewMessage={chat.hasNewMessage}
              isOnline={onlineUsers[chat.userId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPublicProfile;
