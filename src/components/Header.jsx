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

function Header() {
  const [userLogin, setUserLogin] = useState(true);

  const { theme } = useTheme(); // Get the current theme (light, dark, system)

  const getLogo = () => {
    if (theme === "light") {
      return lightLogo;
    }
    return darkLogo;
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 bg-secondary shadow-md shadow-foreground/10"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex justify-start items-center gap-4">
          <img src={getLogo()} alt="Main logo" />
          <Search />
        </div>
        <div className="flex justify-end items-center gap-4">
          {userLogin ? (
            <>
              <Popover>
                <PopoverTrigger className="" asChild>
                  <Button variant="outline" size="icon" className="">
                    <MessageCircleMore />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="shadow-lg shadow-foreground/5 rounded-lg 
                   w-screen md:w-96 lg:w-[500px]"
                >
                  <h3>Đoạn chat</h3>
                  <Search />

                  {/* <Tabs></Tabs> */}
                  {/* message list */}
                  <div>Danh sách đoạn Chat</div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcm.png" />
                    <AvatarFallback className="bg-background">
                      N/A
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/user/profile">Hồ sơ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/user/friends">Bạn bè</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div onClick={(e) => handleLogout()}>Đăng xuất</div>
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
