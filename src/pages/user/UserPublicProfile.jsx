import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import useApi from "../../hooks/useApi";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import ChatBox from "../../components/chat/ChatBox";
import TopMembersSidebar from "../../components/user/public-profile/TopMembersSidebar";
import PublicUserProfile from "../../components/user/public-profile/PublicUserProfile";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { resData: user, loading, error, fetchData } = useApi();
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [pendingMessages, setPendingMessages] = useState({});

  const { onlineUsers, isConnected } = useSelector((state) => state.socket);
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

  // Handle incoming messages
  useEffect(() => {
    if (!isConnected) return;

    const handleMessage = (message) => {
      // Skip if this is our own optimistic message
      if (pendingMessages[message.timestamp]) {
        setPendingMessages((prev) => {
          const newPending = { ...prev };
          delete newPending[message.timestamp];
          return newPending;
        });
        return;
      }

      setActiveChats((prevChats) => {
        const chatUserId = message.isOwn
          ? message.receiverId
          : message.senderId;
        const existingChat = prevChats.find(
          (chat) => chat.userId === chatUserId
        );

        if (!existingChat) {
          return [
            ...prevChats,
            {
              userId: chatUserId,
              user: {
                _id: chatUserId,
                name: message.senderName || "Unknown User",
              },
              isMinimized: true,
              messages: [message],
              hasNewMessage: true,
            },
          ];
        }

        return prevChats.map((chat) =>
          chat.userId === chatUserId
            ? {
                ...chat,
                messages: [...chat.messages, message],
                hasNewMessage: chat.isMinimized,
              }
            : chat
        );
      });
    };

    // Register the message listener
    dispatch({ type: "socket/listenForMessages", payload: handleMessage });

    // Cleanup
    return () => {
      dispatch({
        type: "socket/removeMessageListener",
        payload: handleMessage,
      });
    };
  }, [isConnected, dispatch, pendingMessages]);

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
            messages: [],
            hasNewMessage: false,
          },
        ];
      }

      return prevChats.map((chat) =>
        chat.userId === targetUser._id
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

  const sendMessage = (chatUserId, messageContent) => {
    if (!isConnected || !currentUser?._id || !messageContent.trim()) return;

    const timestamp = new Date().toISOString();

    // Create the message object
    const message = {
      receiverId: chatUserId,
      content: messageContent.trim(),
      timestamp, // Use the same timestamp for tracking
    };

    // Optimistic UI update
    const optimisticMessage = {
      senderId: currentUser._id,
      receiverId: chatUserId,
      content: messageContent.trim(),
      timestamp,
      isOwn: true,
      status: "sending",
    };

    // Track this pending message
    setPendingMessages((prev) => ({
      ...prev,
      [timestamp]: true,
    }));

    setActiveChats((prevChats) =>
      prevChats.map((chat) =>
        chat.userId === chatUserId
          ? {
              ...chat,
              messages: [...chat.messages, optimisticMessage],
            }
          : chat
      )
    );

    // Send via Redux middleware
    dispatch({
      type: "socket/sendMessage",
      payload: message,
    });
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
        <PublicUserProfile
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
              user={chat.user}
              messages={chat.messages}
              onClose={() => closeChat(chat.userId)}
              onMinimize={() => toggleMinimize(chat.userId)}
              onOpen={() => toggleMinimize(chat.userId)}
              isMinimized={chat.isMinimized}
              hasNewMessage={chat.hasNewMessage}
              isOnline={onlineUsers[chat.userId]}
              onSendMessage={(message) => sendMessage(chat.userId, message)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPublicProfile;
