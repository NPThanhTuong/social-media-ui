import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import lightLogo from "@/assets/logos/light-logo.png";
import darkLogo from "@/assets/logos/dark-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
import Search from "@/components/Search";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatList from "@/components/ChatList";
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

function Header() {
  const { user, logout, isLoggedIn, token } = useAuth();

  const { theme } = useTheme(); // Get the current theme (light, dark, system)

  const getLogo = () => {
    if (theme === "light") {
      return lightLogo;
    }
    return darkLogo;
  };

  const handleLogout = (event) => {
    logout();
  };

  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng chọn một chat
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    localStorage.setItem("selectedChatId", chat.id); // Lưu chat đã chọn vào localStorage
    navigate(`/messages`); // Chuyển đến trang Message với ID của chat
    setOpen(false); // Đóng popup sau khi chọn chat
  };

  // Trạng thái mở của Popover
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChatRooms = async () => {
      const res = await axiosInstance.get("rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { result } = res.data;

      setChats(result);
    };

    getChatRooms();
  }, []);

  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 bg-secondary shadow-md shadow-foreground/10"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex justify-start items-center gap-4">
          <Link to="/">
            <img src={getLogo()} alt="Main logo" />
          </Link>
          <Search />
        </div>
        <div className="flex justify-end items-center gap-4">
          {isLoggedIn() ? (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="" asChild>
                  <Button variant="outline" size="icon" className="">
                    <MessageCircleMore />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="shadow-lg shadow-foreground/5 
                rounded-lg w-full max-w-md mx-auto h-[75vh] overflow-y-auto"
                >
                  <ChatList chats={chats} onChatSelect={handleChatSelect} />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-background">
                      N/A
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Hồ sơ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/user/friends">Bạn bè</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div onClick={handleLogout}>Đăng xuất</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button>Login</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
