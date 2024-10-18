import {
  Users,
  UserSearch,
  Send
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Friends from "./Friends"

import friendShipApi from "@/apis/friendShipApi";

const relationShipMenu = [
  {
    label: "Bạn bè",
    path: "/user/friends/friends",
    icon: Users
  },
  {
    label: "Lời mời kết bạn",
    path: "/user/friends/requests",
    icon: UserSearch
  },
  {
    label: "Lời mời đã gửi",
    path: "/user/friends/requestsSent",
    icon: Send
  }
]

function FriendsPage() {
  const { page } = useParams();
  const [friendData, setFriendData] = useState()
  useEffect(() => {
    fetchRelationship()
  }, [page]);

  async function fetchRelationship() {
    const data = await friendShipApi.getALL(1);
    setFriendData(data[page])
  }

  async function handleConfirm(id) {
    const newData = friendData.filter(friend => {
      return friend.id != id;
    })
    setFriendData(newData)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 shadow-md">
        {relationShipMenu.map(relationShipMenuItem => {
          const { label, path, icon: Icon } = relationShipMenuItem;
          return (
            <Link to={path} key={path} className="flex items-center gap-3 p-3 hover:bg-gray-200">
              <Icon size={25}></Icon>
              <span>{label}</span>
            </Link>
          );
        })}</div>
      <div className="w-3/4 p-6">
        <Friends type={page} list={friendData} handleConfirm={handleConfirm}></Friends>
      </div>
    </div>
  );
}

export default FriendsPage;


