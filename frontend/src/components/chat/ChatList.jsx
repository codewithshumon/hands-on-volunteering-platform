import { FaSearch } from "react-icons/fa";

const ChatList = ({
  chats,
  activeChat,
  onChatSelect,
  searchTerm,
  onSearch,
}) => {
  return (
    <div className="bg-white w-80 border-r border-gray-200 flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Chats</h1>
      </div>

      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-120px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              activeChat === chat.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="relative mr-3">
              <img
                src={chat.user.avatar}
                alt={chat.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  chat.user.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">{chat.user.name}</h3>
                <span className="text-xs text-gray-500">
                  {chat.messages[chat.messages.length - 1].timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.messages[chat.messages.length - 1].sender === "You"
                  ? `You: ${chat.messages[chat.messages.length - 1].text}`
                  : chat.messages[chat.messages.length - 1].text}
              </p>
            </div>
            {chat.hasNewMessage && (
              <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
