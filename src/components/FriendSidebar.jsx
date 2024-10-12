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
import { Separator } from "./ui/separator";
import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/configs/axiosConfig";
import Loading from "./Loading";

function FriendSidebar() {
  const [friends, setFriend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFriendsUser = async () => {
      try {
        // Need change
        const res = await axiosInstance.get("/friends/1");
        setFriend(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getFriendsUser();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bạn bè</CardTitle>
        <CardDescription>Kết nối với bạn bè ngay!</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 w-full">
          {loading ? (
            <Loading title="" />
          ) : (
            friends.map((friend) => (
              <div
                className="flex items-center gap-2 mb-4"
                key={friend.id + "_friend_contact"}
              >
                <div className="relative w-10 h-10">
                  <Avatar>
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-background">
                      N/A
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      true ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <span className="font-semibold">{friend.name}</span>
              </div>
            ))
          )}
        </ScrollArea>

        <Separator className="my-4" />
        <div>
          <h3 className="font-bold mb-3">Sinh nhật</h3>
          {loading ? (
            <Loading title="" />
          ) : (
            friends.map((friend) => {
              const friendDate = new Date(friend.dob).getDate();
              const friendMonth = new Date(friend.dob).getMonth();
              const currDate = new Date().getDate();
              const currMonth = new Date().getMonth();

              if (friendDate === currDate && friendMonth === currMonth)
                return (
                  <div
                    className="flex items-center gap-2 hover:bg-accent hover:cursor-pointer rounded p-1"
                    key={friend.id + "_birthday"}
                  >
                    <Gift size={35} />
                    <span>
                      Hôm nay là sinh nhật của <strong>{friend.name}</strong>
                    </span>
                  </div>
                );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FriendSidebar;
