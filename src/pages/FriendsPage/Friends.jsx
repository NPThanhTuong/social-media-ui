
// import { Skeleton } from "@/components/ui/skeleton"

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Friends({ type, list, handleConfirm }) {

    const handleConfirmRequest = async (e, id) => {
        e.preventDefault();
        handleConfirm(id);
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        handleConfirm(id);
    };

    const renderFriendCard = (friend) => {
        const { id, name, avatar } = friend;
        return (
            <Link to={`/profile/${id}`} key={id} className="border p-4 rounded-md shadow-md w-60 flex flex-col items-center m-2 ">
                <img src={avatar} alt={name} className="rounded-full w-20 h-20 object-cover mb-4" />
                <span className="font-semibold">{name}</span>
                {type === "requests" ? (
                    <>
                        <button className="bg-blue-500 text-white mt-2 px-4 py-1 rounded" onClick={(e) => handleConfirmRequest(e, id)}>Xác nhận</button>
                        <button className="bg-gray-300 mt-2 px-4 py-1 rounded" onClick={(e) => handleDelete(e, id)}>Xóa</button>
                    </>
                ) : type === "requestsSent" ? (
                    <button className="bg-gray-300 mt-2 px-4 py-1 rounded" onClick={(e) => handleDelete(e, id)}>Xóa</button>
                ) : null}
            </Link>
        );
    };

    if (!list) {
        return;
    }

    return (
        <div className="flex flex-wrap justify-start">
            {list.map(renderFriendCard)}
        </div>
    );
}
