import { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperclip, FaSmile, FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const ChatWindow = ({ chat, onClose, onSendMessage, onBack, isMobile }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          {isMobile && (
            <button
              onClick={onBack}
              className="mr-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <div className="relative mr-3">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${
                chat.user.status === "online" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{chat.user.name}</h3>
            <p className="text-xs text-gray-500">
              {chat.user.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close chat"
        >
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              {msg.sender !== "You" && (
                <p className="font-medium text-xs text-gray-500 mb-1">
                  {msg.sender}
                </p>
              )}
              <p className="break-words">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "You" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaPaperclip />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaSmile />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 mx-2 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {message ? (
            <button
              onClick={handleSend}
              className="p-2 text-blue-500 hover:text-blue-700"
            >
              <IoMdSend className="text-xl" />
            </button>
          ) : (
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FaMicrophone />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
