import { axiosInstance } from "@/configs/axiosConfig"

const token = localStorage.getItem("token");
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const friendShipApi = {
    async getALL() {
        try {
            const data = await axiosInstance.get("/friends/relationship");
            return data.data;
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    // Chấp nhận yêu cầu kết bạn
    async acceptFriendRequest(requesterId) {
        try {
            await axiosInstance.post(`/friends/accept/${requesterId}`);
            alert("Đã chấp nhận lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi khi chấp nhận yêu cầu kết bạn:", error);
        }
    },

    // Xóa bạn hoặc từ chối yêu cầu kết bạn
    async removeFriend(friendId) {
        try {
            await axiosInstance.delete(`/friends/remove/${friendId}`);
            alert("Đã xóa bạn thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa bạn:", error);
        }
    },

    // Hủy lời mời kết bạn đã gửi
    async cancelFriendRequest(friendId) {
        try {
            await axiosInstance.delete(`/friends/cancel/${friendId}`);
            alert("Đã hủy lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi khi hủy lời mời:", error);
        }
    },
    async getFriends() {
        try {
            const data = await axiosInstance.get("/friends");
            return data.data;
        } catch (error) {
            console.error({ error });
            return null;
        }
    },

    async getSuggestedFriends() {
        try {
            const data = await axiosInstance.get(`/friends/suggestions`);
            return data.data;
        } catch (error) {
            console.error("Lỗi khi lấy gợi ý kết bạn:", error);
            return [];
        }
    },

    // Gửi lời mời kết bạn
    async sendFriendRequest(receiverId) {
        try {
            await axiosInstance.post(`/friends/send-request/${receiverId}`);
            alert("Đã gửi lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi khi gửi lời mời kết bạn:", error);
        }
    }
};

export default friendShipApi;