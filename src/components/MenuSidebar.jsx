import { MessageCircleHeart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/AuthContext";

function MenuSidebar() {
  const { user } = useAuth();

  return (
    <Card className="p-1">
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="/profile" className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-background">N/A</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="/user/friends/friends" className="flex items-center gap-3">
          <div className="flex justify-center w-10">
            <Users size={25} />
          </div>
          <span>Bạn bè</span>
        </Link>
      </Button>
      <Button asChild variant="ghost" className="w-full justify-start p-6">
        <Link to="/messages" className="flex items-center gap-3">
          <div className="flex justify-center w-10">
            <MessageCircleHeart size={25} />
          </div>
          <span>Nhắn tin</span>
        </Link>
      </Button>
    </Card>
  );
}

export default MenuSidebar;
