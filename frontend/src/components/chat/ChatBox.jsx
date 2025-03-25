import { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaComment, FaCircle } from "react-icons/fa";

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
        className={`relative bg-blue-700 text-white rounded-t-lg shadow-lg cursor-pointer flex items-center p-2 hover:bg-blue-800 transition-colors ${
          isMobile ? "w-full" : ""
        }`}
        onClick={onOpen}
      >
        <div className="flex items-center">
          <div className="relative mr-2">
            <FaComment />
            <FaCircle
              className={`absolute -top-1 -right-1 text-xs ${
                isOnline ? "text-green-300" : "text-gray-300"
              }`}
            />
          </div>
          <span className="font-medium">{user?.name}</span>
          {hasNewMessage && (
            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-t-lg shadow-lg overflow-hidden ${
        isMobile ? "fixed inset-0 z-50 rounded-none" : "w-80"
      }`}
    >
      <div className="flex justify-between items-center bg-blue-700 text-white p-3">
        <div>
          <h3 className="font-semibold text-lg">{user?.name}</h3>
          <div className="flex items-center text-xs mt-1">
            <FaCircle
              className={`mr-1.5 text-xs ${
                isOnline ? "text-green-300" : "text-gray-300"
              }`}
            />
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onMinimize}
            className="hover:text-green-200 transition-colors"
            aria-label="Minimize chat"
          >
            <FaMinus />
          </button>
          <button
            onClick={onClose}
            className="hover:text-green-200 transition-colors"
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div
        className={`p-3 overflow-y-auto bg-gray-50 ${
          isMobile ? "h-[calc(100vh-120px)]" : "h-60"
        }`}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start chatting with {user?.name}</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${msg.isOwn ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.isOwn
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="break-words">{msg.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${user?.name}`}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`px-4 py-2 rounded-r-lg text-sm ${
              message.trim()
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
