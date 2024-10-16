import { axiosInstance } from "@/configs/axiosConfig"


const friendShipApi = {

    async getALL(userId) {
        try {
            const data = await axiosInstance.get("/friends/relationship/" + userId);
            return data.data;
        } catch (error) {
            console.log(error)
            return {}
        }
    }
}

export default friendShipApi;