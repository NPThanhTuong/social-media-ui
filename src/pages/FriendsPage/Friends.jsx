import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import friendShipApi from "@/apis/friendShipApi";

const onecePage = 12;

export default function Friends({ type, list, handleConfirm }) {
    const [visibleCount, setVisibleCount] = useState(onecePage); // Số phần tử hiển thị ban đầu

    useEffect(() => { setVisibleCount(onecePage) }, [type]);

    const handleAcceptRequest = async (e, id) => {
        e.preventDefault();
        try {
            await friendShipApi.acceptFriendRequest(id);
            handleConfirm(id);
        } catch (error) {
            console.error("Lỗi khi chấp nhận yêu cầu:", error);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            if (type === "requestsSent") {
                await friendShipApi.cancelFriendRequest(id);
            } else {
                await friendShipApi.removeFriend(id);
            }
            handleConfirm(id);
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    const handleSendRequest = async (e, id) => {
        e.preventDefault();
        try {
            await friendShipApi.sendFriendRequest(id);
            handleConfirm(id); // Cập nhật danh sách
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu kết bạn:", error);
        }
    };

    const renderFriendCard = (friend) => {
        const { id, name, avatar } = friend;
        return (
            <Link
                to={`/profile/${id}`}
                key={id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-60 flex flex-col items-center m-2"
            >
                <img src={avatar} alt={name} className="rounded-full w-20 h-20 object-cover mb-4" />
                <span className="font-semibold text-gray-800">{name}</span>

                {type === "friends" ? (
                    <button
                        className="bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 mt-2 px-4 py-1 rounded transition-colors duration-200"
                        onClick={(e) => handleDelete(e, id)}
                    >
                        Xóa bạn
                    </button>
                ) : type === "requests" ? (
                    <>
                        <button
                            className="bg-blue-500 text-white hover:bg-blue-600 mt-2 px-4 py-1 rounded transition-colors duration-200"
                            onClick={(e) => handleAcceptRequest(e, id)}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 mt-2 px-4 py-1 rounded transition-colors duration-200"
                            onClick={(e) => handleDelete(e, id)}
                        >
                            Từ chối
                        </button>
                    </>
                ) : type === "requestsSent" ? (
                    <button
                        className="bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 mt-2 px-4 py-1 rounded transition-colors duration-200"
                        onClick={(e) => handleDelete(e, id)}
                    >
                        Xóa lời mời
                    </button>
                ) : type === "suggestions" ? (
                    <button
                        className="bg-blue-500 text-white hover:bg-blue-600 mt-2 px-4 py-1 rounded transition-colors duration-200"
                        onClick={(e) => handleSendRequest(e, id)}
                    >
                        Kết bạn
                    </button>
                ) : null}

            </Link>
        );
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + onecePage);
    };

    if (!list || list.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-gray-600 mt-16">
                <i className="fas fa-user-friends text-blue-500 text-5xl mb-4"></i>
                <p className="font-medium text-lg">
                    Danh sách hiện đang trống!
                </p>
                <p className="text-sm text-gray-500">
                    Hãy kết nối và mở rộng danh sách bạn bè ngay bây giờ.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap justify-start">
                {list.slice(0, visibleCount).map(renderFriendCard)}
            </div>
            {visibleCount < list.length && (
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 block mx-auto"
                    onClick={handleLoadMore}
                >
                    Xem thêm
                </button>
            )}
        </div>
    );
}

