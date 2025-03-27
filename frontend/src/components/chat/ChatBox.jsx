/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import { FaTimes, FaMinus, FaComment, FaCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
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
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socket = useSelector((state) => state.socket.socket);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalizeMessage = (msg) => ({
    ...msg,
    timestamp: msg.timestamp
      ? new Date(msg.timestamp)
      : msg.createdAt
      ? new Date(msg.createdAt)
      : new Date(),
  });

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle incoming real-time messages
  useEffect(() => {
    if (!socket || !currentUser?._id || !targetUser?._id) return;

    const handleIncomingMessage = (newMessage) => {
      const senderId =
        typeof newMessage.sender === "object"
          ? newMessage.sender._id
          : newMessage.sender;
      const receiverId =
        typeof newMessage.receiver === "object"
          ? newMessage.receiver._id
          : newMessage.receiver;

      if (
        (senderId === targetUser._id.toString() &&
          receiverId === currentUser._id.toString()) ||
        (senderId === currentUser._id.toString() &&
          receiverId === targetUser._id.toString())
      ) {
        setMessages((prev) => {
          // Remove temp message if exists
          const filtered = prev.filter(
            (m) => !m.tempId || m.tempId !== newMessage.tempId
          );
          return [
            ...filtered,
            {
              ...normalizeMessage(newMessage),
              isOwn: senderId === currentUser._id.toString(),
              status: newMessage.status || "delivered",
            },
          ];
        });

        if (senderId === targetUser._id.toString() && isMinimized) {
          setHasNewMessage(true);
          setUnreadMessages((prev) => [...prev, newMessage._id]);
        }
      }
    };

    const handleTypingIndicator = (data) => {
      if (data.userId === targetUser._id.toString()) {
        setIsTyping(true);
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => setIsTyping(false), 2000));
      }
    };

    const handleMessagesRead = (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          data.messageIds.includes(msg._id)
            ? { ...msg, read: true, status: "read" }
            : msg
        )
      );
    };

    const handleMessageStatusUpdate = (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === data.tempId
            ? {
                ...msg,
                _id: data._id,
                status: data.status,
                timestamp: new Date(data.timestamp),
              }
            : msg._id === data._id
            ? { ...msg, status: data.status }
            : msg
        )
      );
    };

    socket.on("receive-message", handleIncomingMessage);
    socket.on("typing", handleTypingIndicator);
    socket.on("messages-read", handleMessagesRead);
    socket.on("message-status", handleMessageStatusUpdate);

    return () => {
      socket.off("receive-message", handleIncomingMessage);
      socket.off("typing", handleTypingIndicator);
      socket.off("messages-read", handleMessagesRead);
      socket.off("message-status", handleMessageStatusUpdate);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [socket, currentUser?._id, targetUser?._id, isMinimized]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (!isMinimized && unreadMessages.length > 0 && socket) {
      socket.emit("mark-as-read", {
        messageIds: unreadMessages,
        readerId: currentUser._id,
      });
      setUnreadMessages([]);
      setHasNewMessage(false);
    }
  }, [isMinimized, unreadMessages, socket, currentUser?._id]);

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (socket && message.trim() && currentUser?._id && targetUser?._id) {
      socket.emit("typing", {
        senderId: currentUser._id,
        receiverId: targetUser._id,
        isTyping: true,
      });
    }
  }, [socket, message, currentUser?._id, targetUser?._id]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, 500);
    return () => clearTimeout(timer);
  }, [message, handleTyping]);

  const fetchMessages = useCallback(async () => {
    if (!currentUser?._id || !targetUser?._id) return;

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
          status: msg.read ? "read" : "delivered",
        };
      });

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, [currentUser?._id, targetUser?._id, fetchData]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // In ChatBox component
  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.log("Message is empty, not sending");
      return;
    }

    if (!currentUser?._id || !targetUser?._id) {
      console.error(
        "Missing user IDs - current:",
        currentUser?._id,
        "target:",
        targetUser?._id
      );
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      _id: tempId,
      sender: currentUser._id,
      receiver: targetUser._id,
      content: message.trim(),
      timestamp: new Date(),
      isOwn: true,
      status: "sending",
      tempId,
    };

    console.log("Adding temporary message:", tempMessage);
    setMessages((prev) => [...prev, tempMessage]);
    setMessage("");

    try {
      console.log("Fetching conversation...");
      const convResponse = await fetchData(
        `/message/conversations/${currentUser._id}`
      );
      const conversations = convResponse?.data || [];
      console.log("Found conversations:", conversations);

      let conversation = conversations.find((c) =>
        c.participants.includes(targetUser._id)
      );

      if (!conversation) {
        console.log("No existing conversation, creating new one");
        const newConv = await updateData("/message", "POST", {
          sender: currentUser._id,
          receiver: targetUser._id,
          content: message.trim(),
        });
        conversation = { _id: newConv.data?.conversation._id };
        console.log("Created new conversation:", conversation);
      }

      console.log("Sending via socket with payload:", {
        senderId: currentUser._id,
        receiverId: targetUser._id,
        content: message.trim(),
        conversationId: conversation._id,
        tempId,
      });

      socket.emit(
        "send-message",
        {
          senderId: currentUser._id,
          receiverId: targetUser._id,
          content: message.trim(),
          conversationId: conversation._id,
          tempId,
        },
        (ack) => {
          console.log("Received acknowledgment: in Chatbox", ack);
          if (ack?.error) {
            console.error("[Message send failed in Chatbox]", ack.error);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.tempId === tempId ? { ...msg, status: "failed" } : msg
              )
            );
            setSendError(ack.error);
          } else {
            console.log(
              "[Message successfully delivered, updating status in Chatbox]"
            );
            setMessages((prev) =>
              prev.map((msg) =>
                msg.tempId === tempId
                  ? {
                      ...msg,
                      _id: ack._id,
                      status: ack.status,
                      timestamp: new Date(ack.timestamp),
                    }
                  : msg
              )
            );
          }
        }
      );

      // Stop typing indicator
      socket.emit("typing", {
        senderId: currentUser._id,
        receiverId: targetUser._id,
        isTyping: false,
      });
    } catch (error) {
      console.error("Message send error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
      setSendError(error.response?.data?.error || "Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
              src={targetUser?.profileImage || "https://placehold.co/400"}
              alt={targetUser?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
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
              src={targetUser?.profileImage || "https://placehold.co/400"}
              alt={targetUser?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
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
              {isTyping && (
                <span className="ml-2 text-blue-200">Typing...</span>
              )}
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
                  key={msg._id || msg.tempId || Math.random()}
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
                      {isOwn && (
                        <span className="flex items-center">
                          {msg.status === "read" ? (
                            <FaCircle className="text-xs text-blue-300" />
                          ) : (
                            <FaCircle className="text-xs text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
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
