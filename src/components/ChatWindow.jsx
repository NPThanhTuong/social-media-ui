import { Send, Phone, EllipsisVertical } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { axiosInstance } from "@/configs/axiosConfig";

const ChatWindow = ({ chat, sendMessage, messages, setMessages }) => {
  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef(null);
  const { user } = useAuth();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // const newMessage = {
      //   sender: "Bạn",
      //   text: inputMessage,
      //   timestamp: Date.now(),
      //   status: "Đã gửi",
      // };
      const newMessage = {
        senderId: user.id,
        recipientId: chat.users[0].id,
        content: inputMessage,
      };

      // Gửi tin nhắn qua WebSocket hoặc cập nhật local data
      if (chat) {
        // messages.push(newMessage);
        sendMessage(newMessage);
        setMessages((prev) => [
          ...prev,
          { ...newMessage, roomId: chat.id, sentAt: Date.now() },
        ]);
      }
      setInputMessage("");

      // Cuộn tới tin nhắn mới nhất
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight -
          chatContainerRef.current.clientHeight;
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.clientHeight;
    }
  }, [messages]);

  if (!chat || messages?.length === 0) {
    return null;
  }

  return (
    <div className="flex-grow flex flex-col border-l-2 h-full w-full rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
        <div className="flex items-center">
          {/* {chat.type === "group" ? (
            <div className="relative w-10 h-10">
              <Avatar className="absolute w-8 h-8 rounded-full border-2 border-gray right-0 top-0">
                <AvatarImage src={chat.avatars[0]} />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar> */}
          {/* Avatar thứ hai */}
          {/* <Avatar className="absolute w-8 h-8 rounded-full border-2 border-gray left-0 bottom-0">
                <AvatarImage src={chat.avatars[1]} />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
            </div>
          ) : ( */}
          <Avatar className="w-10 h-10 rounded-full mr-3">
            <AvatarImage src={chat.users[0].avatar} />
            <AvatarFallback className="bg-background">N/A</AvatarFallback>
          </Avatar>
          {/* )} */}
          <div className="ml-3">
            <div className="font-semibold text-lg">{chat.users[0].name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 pr-7">
          <Button className="p-2 rounded-full bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-600">
            <Phone className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        {messages?.map((msg, index) => (
          <React.Fragment key={index}>
            {/* Hiển thị dòng thời gian nếu cần */}
            {index === 0 ||
            new Date(msg.sentAt).toDateString() !==
              new Date(messages[index - 1].sentAt).toDateString() ? (
              <div className="text-center my-4 text-sm text-gray-500">
                {new Date(msg.sentAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            ) : null}

            {/* Tin nhắn */}
            <div
              className={`flex items-end gap-2 ${
                msg.senderId === user.id ? "justify-end" : "justify-start"
              } ${index === messages.length - 1 ? "mb-6" : "mb-2"}`}
            >
              {/* Avatar của người gửi, chỉ hiển thị nếu người gửi không phải là "Bạn" */}
              {msg.senderId !== user.id && (
                <Avatar>
                  <AvatarImage src={chat.users[0].avatar} />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
              )}

              {/* Hộp tin nhắn và Dropdown Menu */}
              <div className="flex flex-col max-w-xs">
                {/* 
                {msg.senderId !== user.id && (
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {msg.senderId}
                  </span>
                )}
                  */}

                <div className="flex items-center gap-2">
                  {/* Dropdown Menu cho người gửi "Bạn", hiển thị bên trái */}
                  {msg.senderId === user.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none cursor-pointer p-1 rounded-full transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md">
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="outline-none">
                        <DropdownMenuItem
                          onClick={() => handleRemoveMessage(index)}
                        >
                          Gỡ
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteMessage(index)}
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {/* Nội dung tin nhắn */}
                  <div
                    className={`${
                      msg.senderId === user.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    } rounded-2xl p-3 shadow-md relative`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs text-gray-600 dark:text-white">
                      {new Date(msg.sentAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Dòng trạng thái nếu người gửi là "Bạn" */}
                {/* {msg.senderId === user.id && (
                  <span className="text-xs text-gray-500 mt-1 ml-16">
                    {msg.isRead ? "Đã xem" : "Chưa xem"}
                  </span>
                )}*/}
              </div>

              {/* Nếu người gửi không phải là "Bạn", Dropdown Menu xuất hiện sau hộp tin nhắn */}
              {msg.senderId !== user.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="focus:outline-none ml-2 cursor-pointer p-1 
                  rounded-full transition duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md"
                  >
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleRemoveMessage(index)}
                    >
                      Gỡ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteMessage(index)}
                    >
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Thanh nhập tin nhắn */}
      <div className="p-4 border-t  rounded-b-lg">
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-full px-2 py-1">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none px-3"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <button
            // onClick={sendMessage}
            onClick={handleSendMessage}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Send className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
