import { axiosInstance } from "@/configs/axiosConfig"

const token = localStorage.getItem("token");

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const postApi = {
    async getMyPost() {
        try {
            const data = await axiosInstance.get("/posts");
            return data.data;
        } catch (error) {
            console.error({ error });
            return {};
        }
    },
}