import { axiosInstance } from "@/configs/axiosConfig"

const friendShipApi = {
    async getALL(userId) {
        try {
            const data = await axiosInstance.get("/friends/relationship/" + userId);
            return data.data;
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    // Chấp nhận yêu cầu kết bạn
    async acceptFriendRequest(userId, requesterId) {
        try {
            await axiosInstance.post(`/friends/accept/${userId}/${requesterId}`);
            alert("Đã chấp nhận lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi khi chấp nhận yêu cầu kết bạn:", error);
        }
    },

    // Xóa bạn hoặc từ chối yêu cầu kết bạn
    async removeFriend(userId, friendId) {
        try {
            await axiosInstance.delete(`/friends/remove/${userId}/${friendId}`);
            alert("Đã xóa bạn thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa bạn:", error);
        }
    },

    // Hủy lời mời kết bạn đã gửi
    async cancelFriendRequest(userId, friendId) {
        try {
            await axiosInstance.delete(`/friends/cancel/${userId}/${friendId}`);
            alert("Đã hủy lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi khi hủy lời mời:", error);
        }
    }
};

export default friendShipApi;