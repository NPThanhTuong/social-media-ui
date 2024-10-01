import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";
import { Gift } from "lucide-react";

function FriendSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bạn bè</CardTitle>
        <CardDescription>Kết nối với bạn bè ngay!</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npttuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  false ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npthanhtuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npttuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  false ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npthanhtuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npttuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  false ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npthanhtuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npttuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  false ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Avatar>
                <AvatarImage src="https://github.com/npthanhtuong.png" />
                <AvatarFallback className="bg-background">N/A</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  true ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <span className="font-semibold">Nguyễn Phan Thanh Tường</span>
          </div>
        </ScrollArea>

        <Separator className="my-4" />
        <div>
          <h3 className="font-bold mb-3">Sinh nhật</h3>
          <div className="flex items-center gap-2 hover:bg-accent hover:cursor-pointer rounded p-1">
            <Gift size={35} />
            <span>
              Hôm nay là sinh nhật của <strong>Thanh Tường</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 hover:bg-accent hover:cursor-pointer rounded p-1">
            <Gift size={35} />
            <span>
              Hôm nay là sinh nhật của <strong>Nguyễn Văn A</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FriendSidebar;
