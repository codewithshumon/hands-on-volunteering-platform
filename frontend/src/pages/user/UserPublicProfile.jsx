import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import useApi from "../../hooks/useApi";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import ChatBox from "../../components/chat/ChatBox";
import TopMembersSidebar from "../../components/user/public-profile/TopMembersSidebar";
import PublicViewUserProfile from "../../components/user/public-profile/PublicViewUserProfile";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { resData: user, loading, error, fetchData } = useApi();
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const { onlineUsers } = useSelector((state) => state.socket);
  const currentUser = useSelector((state) => state.auth.user);

  // Fetch user data
  useEffect(() => {
    fetchData(`/user/single-user/${userId}`);
  }, [userId, fetchData]);

  // Connect socket when user is available
  useEffect(() => {
    if (currentUser?._id) {
      dispatch({ type: "socket/connect", payload: currentUser._id });
    }

    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, [currentUser?._id, dispatch]);

  // Update volunteer history
  useEffect(() => {
    if (user) {
      setVolunteerHistory(user.volunteerHistory || []);
    }
  }, [user]);

  const openChat = (targetUser) => {
    setActiveChats((prevChats) => {
      const existingChat = prevChats.find(
        (chat) => chat.userId === targetUser._id
      );

      if (!existingChat) {
        return [
          ...prevChats,
          {
            userId: targetUser._id,
            user: targetUser,
            isMinimized: false,
          },
        ];
      }

      return prevChats.map((chat) =>
        chat.userId === targetUser._id ? { ...chat, isMinimized: false } : chat
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
          ? { ...chat, isMinimized: !chat.isMinimized }
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
      {/* Sidebar */}
      <div
        className={`relative ${
          isSidebarExpanded ? "w-1/4" : "w-0"
        } transition-all duration-300`}
      >
        <TopMembersSidebar
          openChat={openChat}
          isExpanded={isSidebarExpanded}
          onlineUsers={onlineUsers}
          onClose={toggleSidebar}
        />
      </div>

      {/* Sidebar Toggle */}
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

      {/* Main Content */}
      <div
        className={`${
          isSidebarExpanded ? "w-3/4" : "w-full"
        } transition-all duration-300`}
      >
        <PublicViewUserProfile
          user={user}
          onlineUsers={onlineUsers}
          volunteerHistory={volunteerHistory}
          userId={userId}
          openChat={openChat}
        />
      </div>

      {/* Chat Windows */}
      <div className="fixed bottom-0 right-5 z-50 flex flex-row-reverse items-end">
        {activeChats.map((chat) => (
          <div
            key={chat.userId}
            className="mr-2"
            style={{ marginRight: "20px" }}
          >
            <ChatBox
              currentUser={currentUser}
              targetUser={chat.user}
              isMinimized={chat.isMinimized}
              isOnline={!!onlineUsers[chat.userId]}
              onClose={() => closeChat(chat.userId)}
              onMinimize={() => toggleMinimize(chat.userId)}
              onOpen={() => toggleMinimize(chat.userId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPublicProfile;
