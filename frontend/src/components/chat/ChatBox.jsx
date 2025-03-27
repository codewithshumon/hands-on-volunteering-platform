import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaMinus, FaComment, FaCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useApi from "../../hooks/useApi";

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

  const handleMessage = useCallback(
    (message) => {
      if (!message.sender || !message.receiver) return;
      if (message.sender === currentUser._id) return;

      setMessages((prev) => [
        ...prev,
        {
          ...message,
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

        const formattedMessages = receivedMessages.map((msg) => ({
          ...msg,
          isOwn: msg.sender.toString() === currentUser._id.toString(),
          status: "delivered",
        }));

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
    if (!message.trim() || !currentUser?._id || !targetUser?._id) return;
    if (currentUser._id === targetUser._id) {
      setSendError("You cannot send messages to yourself");
      return;
    }

    setSendError(null);
    const timestamp = new Date().toISOString();
    const tempMessage = {
      _id: `temp-${timestamp}`,
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
      // Send via socket
      dispatch({
        type: "socket/sendMessage",
        payload: {
          senderId: currentUser._id,
          receiverId: targetUser._id,
          content: message.trim(),
          timestamp,
        },
      });

      // Persist to database
      const response = await updateData("/message", "POST", {
        sender: currentUser._id,
        receiver: targetUser._id,
        content: message.trim(),
      });

      // Update message status
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === `temp-${timestamp}`
            ? { ...msg, _id: response.data?._id, status: "delivered" }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      setSendError(error.response?.data?.error || "Failed to send message");
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === `temp-${timestamp}` ? { ...msg, status: "failed" } : msg
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
        className={`relative bg-blue-700 text-white rounded-t-lg shadow-lg cursor-pointer flex items-center p-2 hover:bg-blue-800 transition-colors ${
          isMobile ? "w-full" : ""
        }`}
        onClick={onOpen}
      >
        <div className="flex items-center">
          <div className="relative mr-2">
            <FaComment />
            {isOnline && (
              <FaCircle className="absolute -top-1 -right-1 text-xs text-green-300" />
            )}
          </div>
          <span className="font-medium">{targetUser?.name}</span>
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
          <h3 className="font-semibold text-lg">{targetUser?.name}</h3>
          <div className="flex items-center text-xs mt-1">
            {isOnline ? (
              <>
                <FaCircle className="mr-1.5 text-xs text-green-300" />
                <span>Online</span>
              </>
            ) : (
              <>
                <FaCircle className="mr-1.5 text-xs text-gray-300" />
                <span>Offline</span>
              </>
            )}
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
        {loadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No messages yet</p>
            <p className="text-sm mt-1">
              Start chatting with {targetUser?.name}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id || msg.timestamp}
              className={`mb-3 flex ${
                msg.isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.isOwn
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                } ${msg.status === "failed" ? "opacity-70" : ""}`}
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
                  {msg.status === "sending" && " (Sending...)"}
                  {msg.status === "failed" && " (Failed)"}
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
            placeholder={`Message ${targetUser?.name}`}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            disabled={apiLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={
              !message.trim() ||
              apiLoading ||
              currentUser?._id === targetUser?._id
            }
            className={`px-4 py-2 rounded-r-lg text-sm ${
              message.trim() &&
              !apiLoading &&
              currentUser?._id !== targetUser?._id
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            {apiLoading ? "Sending..." : "Send"}
          </button>
        </div>
        {sendError && <p className="text-red-500 text-xs mt-1">{sendError}</p>}
        {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}
      </div>
    </div>
  );
};

export default ChatBox;
