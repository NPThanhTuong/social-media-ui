import React, { useState, useEffect } from "react";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import SockJS from "sockjs-client";
import { useAuth } from "@/context/AuthContext";
import { Client } from "@stomp/stompjs";
import { axiosInstance } from "@/configs/axiosConfig";

// Dữ liệu mẫu cho danh sách chat
// const dataChat = [
//   {
//     id: 1,
//     userName: "Người dùng B",
//     lastMessage: "Tin nhắn cuối!",
//     time: "12:00",
//     avatar: "https://api.multiavatar.com/user10.svg",
//     type: "private",
//     messages: [
//       {
//         sender: "Người dùng B",
//         text: "Chào bạn!",
//         timestamp: "2024-10-27T15:30:00.000Z",
//         avatar: "https://api.multiavatar.com/user10.svg",
//       },
//       {
//         sender: "Bạn",
//         text: "Xin chào, bạn có khỏe không?",
//         timestamp: "2024-10-27T15:32:00.000Z",
//       },
//       {
//         sender: "Người dùng B",
//         text: "Tôi khỏe, cảm ơn bạn! Bạn thì sao?",
//         timestamp: "2024-10-27T15:35:00.000Z",
//         avatar: "https://api.multiavatar.com/user10.svg",
//       },
//       {
//         sender: "Bạn",
//         text: "Tôi cũng khỏe. Cảm ơn bạn đã hỏi!",
//         timestamp: "2024-10-28T09:00:00.000Z",
//       },
//       {
//         sender: "Người dùng B",
//         text: "Hẹn gặp lại!",
//         timestamp: "2024-10-28T09:05:00.000Z",
//         avatar: "https://api.multiavatar.com/user10.svg",
//       },
//     ],
//   },
//   {
//     id: 2,
//     userName: "Nhóm B",
//     lastMessage: "Tin nhắn cuối cùng",
//     time: "12:19",
//     avatars: [
//       //   "https://api.multiavatar.com/user3.svg",
//       //   "https://api.multiavatar.com/user14.svg",
//     ],
//     messages: [
//       {
//         sender: "Người dùng 1",
//         text: "Chào mọi người!",
//         timestamp: "2024-10-28T15:30:00.000Z",
//         avatar: "https://api.multiavatar.com/user3.svg",
//       },
//       {
//         sender: "Người dùng 2",
//         text: "Chào bạn!",
//         timestamp: "2024-10-28T15:30:00.000Z",
//         avatar: "https://api.multiavatar.com/user14.svg",
//       },
//       {
//         sender: "Người dùng 1",
//         text: "Có ai muốn đi ăn trưa không?",
//         timestamp: "2024-10-28T15:30:00.000Z",
//         avatar: "https://api.multiavatar.com/user4.svg",
//       },
//     ],
//     type: "group",
//   },
// ];

const ChatApp = () => {
  // Trạng thái cho chat đã chọn
  const [selectedChat, setSelectedChat] = useState(null);
  // =======
  const { user, token } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState();

  const [stompClient, setStompClient] = useState(null);

  // Tự động chọn đoạn chat đầu tiên khi component được load
  useEffect(() => {
    const getChatRooms = async () => {
      const res = await axiosInstance.get("rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { result } = res.data;
      console.log(result);

      setChats(result);
      setLoading(false);
    };

    getChatRooms();

    const storedChatId = localStorage.getItem("selectedChatId");
    if (storedChatId) {
      const chat = chats.find((chat) => chat.id === Number(storedChatId));
      setSelectedChat(chat);
    } else if (chats.length > 0) {
      setSelectedChat(chats[0]);
      localStorage.setItem("selectedChatId", chats[0].id);
    }
  }, []);

  // Hàm xử lý khi người dùng chọn một chat
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    localStorage.setItem("selectedChatId", chat.id); // Lưu chat đã chọn vào localStorage
  };

  // Ngăn cuộn trang khi cửa sổ chat đang mở
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get("/messages/" + selectedChat.id);

        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChat) {
      document.body.classList.add("overflow-hidden");

      getMessages();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedChat]);

  // Implement chat
  useEffect(() => {
    const connect = () => {
      if (!stompClient) {
        const socket = new SockJS("http://localhost:8080/ws");

        const client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => console.log(str),
        });

        client.onConnect = () => onConnected(client);
        client.onStompError = onError;

        client.activate();
        setStompClient(client); // Set the STOMP client instance in state
      }
    };

    connect();

    // Cleanup on component unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const onConnected = (client) => {
    console.log("Connected to WebSocket");

    // Subscribe to the user's private queue
    client.subscribe(`/user/${user.id}/queue/messages`, onMessageReceived);

    // Subscribe to the public topic
    client.subscribe(`/user/public`, onMessageReceived);

    // Send a message to register the user
    client.publish({
      destination: "/app/user.addUser",
      body: JSON.stringify({
        email: user.email,
      }),
    });
  };

  const onMessageReceived = async (payload) => {
    // await findAndDisplayConnectedUsers();
    const message = JSON.parse(payload.body);
    console.log({ message });
    setMessages((prev) =>
      prev ? [...prev, { ...message, sentAt: new Date() }] : null
    );
    // if (selectedUserId && selectedUserId === message.senderId) {
    //   displayMessage(message.senderId, message.content);
    //   chatArea.scrollTop = chatArea.scrollHeight;
    // }

    // if (selectedUserId) {
    //   document.querySelector(`#${selectedUserId}`).classList.add("active");
    // } else {
    //   messageForm.classList.add("hidden");
    // }

    // const notifiedUser = document.querySelector(`#${message.senderId}`);
    // if (notifiedUser && !notifiedUser.classList.contains("active")) {
    //   const nbrMsg = notifiedUser.querySelector(".nbr-msg");
    //   nbrMsg.classList.remove("hidden");
    //   nbrMsg.textContent = "";
  };

  const onError = () => {
    console.log("Error when connect web socket");
  };

  const sendMessage = (message) => {
    if (!stompClient || !stompClient.connected) {
      console.error("STOMP client is not connected. Cannot send message.");
      return;
    }

    if (message && stompClient) {
      // const chatMessage = {
      //   senderId: user.id,
      //   recipientId: recipientId,
      //   content: message,
      // };

      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Danh sách chat */}
      <ChatList chats={chats} onChatSelect={handleChatSelect} />
      {/* Khu vực chat chính */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onClose={() => setSelectedChat(null)}
            sendMessage={sendMessage}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <div>No chat selected</div> // Nội dung hiển thị khi không có chat
        )}
      </div>
    </div>
  );
};

export default ChatApp;
