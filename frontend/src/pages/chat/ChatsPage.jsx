import { useState, useEffect } from "react";
import ChatEmpty from "../../components/chat/ChatEmpty";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatList from "../../components/chat/ChatList";

const ChatsPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([
    {
      id: 1,
      user: {
        id: 101,
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "online",
      },
      messages: [
        {
          id: 1,
          text: "Hey there! How are you doing?",
          sender: "Sarah Johnson",
          timestamp: "10:30 AM",
        },
        {
          id: 2,
          text: "I'm good, thanks! Just working on some projects.",
          sender: "You",
          timestamp: "10:32 AM",
        },
      ],
      hasNewMessage: false,
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Mike Peterson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "online",
      },
      messages: [
        {
          id: 1,
          text: "Did you see the game last night?",
          sender: "Mike Peterson",
          timestamp: "9:15 AM",
        },
      ],
      hasNewMessage: true,
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Emma Williams",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        status: "offline",
      },
      messages: [
        {
          id: 1,
          text: "Meeting at 2pm tomorrow",
          sender: "You",
          timestamp: "Yesterday",
        },
        {
          id: 2,
          text: "Got it, see you then!",
          sender: "Emma Williams",
          timestamp: "Yesterday",
        },
      ],
      hasNewMessage: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenChat = (chatId) => {
    setChats(
      chats.map((chat) => ({
        ...chat,
        hasNewMessage: chat.id === chatId ? false : chat.hasNewMessage,
      }))
    );
    setActiveChat(chatId);
  };

  const handleCloseChat = (chatId) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };

  const handleSendMessage = (chatId, messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats(
      chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              hasNewMessage: false,
            }
          : chat
      )
    );

    // Simulate reply after 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const replies = [
        "Sounds good!",
        "I'll get back to you on that.",
        "Thanks for letting me know!",
        "Can we talk about this later?",
        "Interesting point!",
        "I appreciate your message!",
        "Let me think about that...",
        "Got it, thanks!",
      ];
      const replyMessage = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: chats.find((c) => c.id === chatId).user.name,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChats(
        chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, replyMessage],
                hasNewMessage: chatId !== activeChat,
              }
            : chat
        )
      );
    }, delay);
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" w-full h-full fixed">
      <div className="flex w-full h-screen bg-gray-100 pt-16">
        {/* Sidebar - Chat List */}
        {(!isMobileView || !activeChat) && (
          <ChatList
            chats={filteredChats}
            activeChat={activeChat}
            onChatSelect={handleOpenChat}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        )}

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            isMobileView && !activeChat ? "hidden" : "block"
          }`}
        >
          {activeChat ? (
            <ChatWindow
              chat={chats.find((c) => c.id === activeChat)}
              onClose={() => handleCloseChat(activeChat)}
              onSendMessage={(message) =>
                handleSendMessage(activeChat, message)
              }
              isMobile={isMobileView}
              onBack={() => setActiveChat(null)}
            />
          ) : (
            <ChatEmpty
              onNewMessage={() => console.log("New message clicked")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
