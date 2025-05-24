import { FaComment } from "react-icons/fa";

const ChatEmpty = ({ onNewMessage }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FaComment className="text-gray-400 text-3xl" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Select a conversation
        </h2>
        <p className="text-gray-500 mb-6">
          Choose an existing conversation or start a new one to begin messaging
        </p>
        <button
          onClick={onNewMessage}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Message
        </button>
      </div>
    </div>
  );
};

export default ChatEmpty;
