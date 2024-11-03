import React, { useState, useEffect } from "react";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";

// Dữ liệu mẫu cho danh sách chat
const dataChat = [
  {
    id: 1,
    userName: "Người dùng B",
    lastMessage: "Tin nhắn cuối!",
    time: "12:00",
    avatar: "https://api.multiavatar.com/user10.svg",
    type: "private",
    messages: [
      {
        sender: "Người dùng B",
        text: "Chào bạn!",
        timestamp: "2024-10-27T15:30:00.000Z",
        avatar: "https://api.multiavatar.com/user10.svg",
      },
      {
        sender: "Bạn",
        text: "Xin chào, bạn có khỏe không?",
        timestamp: "2024-10-27T15:32:00.000Z",
      },
      {
        sender: "Người dùng B",
        text: "Tôi khỏe, cảm ơn bạn! Bạn thì sao?",
        timestamp: "2024-10-27T15:35:00.000Z",
        avatar: "https://api.multiavatar.com/user10.svg",
      },
      {
        sender: "Bạn",
        text: "Tôi cũng khỏe. Cảm ơn bạn đã hỏi!",
        timestamp: "2024-10-28T09:00:00.000Z",
      },
      {
        sender: "Người dùng B",
        text: "Hẹn gặp lại!",
        timestamp: "2024-10-28T09:05:00.000Z",
        avatar: "https://api.multiavatar.com/user10.svg",
      },
    ],
  },
  {
    id: 2,
    userName: "Nhóm B",
    lastMessage: "Tin nhắn cuối cùng",
    time: "12:19",
    avatars: [
      //   "https://api.multiavatar.com/user3.svg",
      //   "https://api.multiavatar.com/user14.svg",
    ],
    messages: [
      {
        sender: "Người dùng 1",
        text: "Chào mọi người!",
        timestamp: "2024-10-28T15:30:00.000Z",
        avatar: "https://api.multiavatar.com/user3.svg",
      },
      {
        sender: "Người dùng 2",
        text: "Chào bạn!",
        timestamp: "2024-10-28T15:30:00.000Z",
        avatar: "https://api.multiavatar.com/user14.svg",
      },
      {
        sender: "Người dùng 1",
        text: "Có ai muốn đi ăn trưa không?",
        timestamp: "2024-10-28T15:30:00.000Z",
        avatar: "https://api.multiavatar.com/user4.svg",
      },
    ],
    type: "group",
  },
];

const ChatApp = () => {
  // Trạng thái cho chat đã chọn
  const [selectedChat, setSelectedChat] = useState(null);
  // Tự động chọn đoạn chat đầu tiên khi component được load
  useEffect(() => {
    const storedChatId = localStorage.getItem("selectedChatId");
    if (storedChatId) {
      const chat = dataChat.find((chat) => chat.id === Number(storedChatId));
      setSelectedChat(chat);
    } else if (dataChat.length > 0) {
      setSelectedChat(dataChat[0]);
      localStorage.setItem("selectedChatId", dataChat[0].id);
    }
  }, []);

  // Hàm xử lý khi người dùng chọn một chat
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    localStorage.setItem("selectedChatId", chat.id); // Lưu chat đã chọn vào localStorage
  };

  // Ngăn cuộn trang khi cửa sổ chat đang mở
  useEffect(() => {
    if (selectedChat) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedChat]);

  return (
    <div className="flex h-screen">
      {/* Danh sách chat */}
      <ChatList chats={dataChat} onChatSelect={handleChatSelect} />
      {/* Khu vực chat chính */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onClose={() => setSelectedChat(null)}
          />
        ) : (
          <div>No chat selected</div> // Nội dung hiển thị khi không có chat
        )}
      </div>
    </div>
  );
};

export default ChatApp;
