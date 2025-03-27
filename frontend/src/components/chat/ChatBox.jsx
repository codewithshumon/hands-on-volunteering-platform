import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaMinus, FaComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import useApi from "../../hooks/useApi";

const formatMessageTime = (timestamp) => {
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) return "--:--";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    console.error("Error formatting timestamp:", timestamp, e);
    return "--:--";
  }
};

const ChatBox = ({
  currentUser,
  targetUser,
  isMinimized,
  isOnline,
  onClose,
  onMinimize,
  onOpen,
}) => {
  const {
    updateData,
    fetchData,
    loading: apiLoading,
    error: apiError,
  } = useApi();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendError, setSendError] = useState(null);

  const dispatch = useDispatch();

  const normalizeMessage = (msg) => ({
    ...msg,
    timestamp: msg.timestamp
      ? new Date(msg.timestamp)
      : msg.createdAt
      ? new Date(msg.createdAt)
      : new Date(),
  });

  const handleMessage = useCallback(
    (message) => {
      if (!message.sender || !message.receiver) return;

      const senderId =
        typeof message.sender === "object"
          ? message.sender._id
          : message.sender;

      const isOwn = senderId === currentUser._id.toString();
      if (isOwn) return;

      setMessages((prev) => [
        ...prev,
        {
          ...normalizeMessage(message),
          isOwn: false,
          status: "delivered",
        },
      ]);
      if (isMinimized) setHasNewMessage(true);
    },
    [currentUser?._id, isMinimized]
  );

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!currentUser?._id || !targetUser?._id) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const response = await fetchData(
          `/message/${currentUser._id}/${targetUser._id}`
        );

        const receivedMessages = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];

        const formattedMessages = receivedMessages.map((msg) => {
          const senderId =
            typeof msg.sender === "object" ? msg.sender._id : msg.sender;

          return {
            ...normalizeMessage(msg),
            isOwn: senderId === currentUser._id.toString(),
            status: "delivered",
          };
        });

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [currentUser?._id, targetUser?._id, fetchData]);

  useEffect(() => {
    if (!currentUser?._id) return;

    const listenerId = `chat-${currentUser._id}-${targetUser._id}`;
    dispatch({
      type: "socket/registerMessageListener",
      payload: { listenerId, handler: handleMessage },
    });

    return () => {
      dispatch({
        type: "socket/unregisterMessageListener",
        payload: listenerId,
      });
    };
  }, [dispatch, currentUser?._id, targetUser?._id, handleMessage]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser?._id || !targetUser._id) return;
    if (currentUser._id === targetUser._id) {
      setSendError("You cannot send messages to yourself");
      return;
    }

    setSendError(null);
    const timestamp = new Date();
    const tempMessage = {
      _id: `temp-${timestamp.getTime()}`,
      sender: currentUser._id,
      receiver: targetUser._id,
      content: message.trim(),
      timestamp,
      isOwn: true,
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMessage]);
    setMessage("");

    try {
      dispatch({
        type: "socket/sendMessage",
        payload: {
          senderId: currentUser._id,
          receiverId: targetUser._id,
          content: message.trim(),
          timestamp: timestamp.toISOString(),
        },
      });

      const response = await updateData("/message", "POST", {
        sender: currentUser._id,
        receiver: targetUser._id,
        content: message.trim(),
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === `temp-${timestamp.getTime()}`
            ? {
                ...msg,
                _id: response.data?._id,
                status: "delivered",
                timestamp: new Date(response.data?.createdAt || Date.now()),
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      setSendError(error.response?.data?.error || "Failed to send message");
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === `temp-${timestamp.getTime()}`
            ? { ...msg, status: "failed" }
            : msg
        )
      );
    }
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
              src={targetUser?.profileImage}
              alt={targetUser?.name}
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
            <span className="font-medium">{targetUser?.name}</span>
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
              src={targetUser?.profileImage}
              alt={targetUser?.name}
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
            <h3 className="font-semibold">{targetUser?.name}</h3>
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
        {loadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <FaComment className="w-8 h-8 text-blue-500" />
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm mt-1">
              Start chatting with {targetUser?.name}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => {
              const senderId =
                typeof msg.sender === "object" ? msg.sender._id : msg.sender;
              const isOwn = senderId === currentUser._id.toString();

              return (
                <div
                  key={msg._id || msg.timestamp?.getTime() || Math.random()}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      isOwn
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    } ${msg.status === "failed" ? "opacity-70" : ""}`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <div className="flex items-center justify-end mt-1 space-x-2">
                      {msg.status === "sending" && (
                        <span className="text-xs text-blue-100">
                          Sending...
                        </span>
                      )}
                      {msg.status === "failed" && (
                        <span className="text-xs text-red-100">Failed</span>
                      )}
                      <p
                        className={`text-xs ${
                          isOwn ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {formatMessageTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            placeholder={`Message ${targetUser?.name}`}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={apiLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={
              !message.trim() ||
              apiLoading ||
              currentUser?._id === targetUser?._id
            }
            className={`p-2 rounded-full ${
              message.trim() &&
              !apiLoading &&
              currentUser?._id !== targetUser?._id
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            <IoMdSend className="w-5 h-5" />
          </button>
        </div>
        {sendError && <p className="text-red-500 text-xs mt-1">{sendError}</p>}
        {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}
      </div>
    </div>
  );
};

export default ChatBox;
