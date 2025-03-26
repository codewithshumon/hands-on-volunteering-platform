import { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaPaperPlane, FaCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ImageView from "../global/ImageView";

const ChatBox = ({
  user,
  messages = [],
  onClose,
  onMinimize,
  onOpen,
  isMinimized,
  isOnline,
  hasNewMessage,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div
        className={`relative bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-xl cursor-pointer flex items-center justify-between p-3 hover:from-blue-700 hover:to-blue-600 transition-all ${
          isMobile ? "w-full" : "w-64"
        }`}
        onClick={onOpen}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user?.profileImage || "https://placehold.co/400"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
              onError={(e) => {
                e.target.src = "https://placehold.co/400";
              }}
            />
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div>
            <span className="font-medium">{user?.name}</span>
            {hasNewMessage && (
              <span className="ml-2 px-1.5 py-0.5 bg-blue-800 text-xs rounded-full animate-pulse">
                New
              </span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:text-red-200 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col bg-white rounded-lg shadow-xl overflow-hidden ${
        isMobile ? "fixed inset-0 z-50" : "w-96 h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user?.profileImage || "https://placehold.co/400"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
              onError={(e) => {
                e.target.src = "https://placehold.co/400";
              }}
            />
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-xs opacity-80">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onMinimize}
            className="hover:text-blue-200 transition-colors"
            aria-label="Minimize chat"
          >
            <FaMinus />
          </button>
          <button
            onClick={onClose}
            className="hover:text-red-200 transition-colors"
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 p-4 overflow-y-auto bg-gray-50 ${
          isMobile ? "h-[calc(100vh-120px)]" : ""
        }`}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm mt-1">Start chatting with {user?.name}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.isOwn
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isOwn ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${user?.name}`}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-full ${
              message.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            <IoMdSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
