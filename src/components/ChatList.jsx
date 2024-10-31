import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatList = ({ chats, onChatSelect }) => {
  const ids = chats.map((chat) => chat.id);
  const hasDuplicates = ids.length !== new Set(ids).size;

  if (hasDuplicates) {
    console.error("Có id trùng lặp trong danh sách chats.");
  }

  return (
    <div className="w-96 h-full flex flex-col">
      <div className="p-4 flex-shrink-0 border-b ">
        <h1 className="text-2xl font-bold mb-4">Đoạn chat</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Tìm kiếm trong Tin nhắn"
            className="w-full pl-10 pr-4 py-2 rounded-full outline-none bg-gray-200 dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Chat List Area */}
      <div className="space-y-2 overflow-y-auto max-h-[400px] p-4 flex-1">
        {" "}
        {/* Đặt max-h để hạn chế chiều cao */}
        {chats.length === 0 ? (
          <p className="text-gray-500 text-center">
            Không có cuộc trò chuyện nào
          </p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <div className="relative w-12 h-12 mr-3 flex-shrink-0 flex items-center justify-center">
                {chat.type === "group" ? (
                  <div className="relative w-12 h-12">
                    <div className="absolute top-0 right-0">
                      {/* Avatar thứ nhất (chat nhóm) */}
                      <Avatar className="w-8 h-8 rounded-full border-2 border-gray">
                        <AvatarImage
                          src={chat.avatars[0]}
                          className="rounded-full border-2 border-white"
                        />
                        <AvatarFallback className="bg-background">
                          N/A
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-0 left-0">
                      {/* Avatar thứ hai (chat nhóm) */}
                      <Avatar className="w-8 h-8 rounded-full border-2 border-gray">
                        <AvatarImage
                          src={chat.avatars[1]}
                          className="rounded-full border-2 border-white"
                        />
                        <AvatarFallback className="bg-background">
                          N/A
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ) : (
                  // Avatar chat riêng
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-background">
                      N/A
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-center ml-2">
                <div className="font-semibold">{chat.userName}</div>
                <div className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </div>
              </div>
              <div className="text-xs text-gray-400 ml-auto">{chat.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
