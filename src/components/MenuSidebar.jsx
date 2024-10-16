import {
  Home,
  LineChart,
  MessageCircleHeart,
  Package,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function MenuSidebar() {
  return (
    // <div className="grid items-start px-2 text-sm font-medium lg:px-4">
    <Card className="p-1">
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="/user/profile" className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/npttuong.png" />
            <AvatarFallback className="bg-background">N/A</AvatarFallback>
          </Avatar>
          <span>Thanh Tường</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="/user/friends/all" className="flex items-center gap-3">
          <div className="flex justify-center w-10">
            <Users size={25} />
          </div>
          <span>Bạn bè</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="#" className="flex items-center gap-3">
          <div className="flex justify-center w-10">
            <MessageCircleHeart size={25} />
          </div>
          <span>Nhắn tin</span>
        </Link>
      </Button>
    </Card>

    // </div>
  );
}

export default MenuSidebar;
