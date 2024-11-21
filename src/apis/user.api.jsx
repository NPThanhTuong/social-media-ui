import { axiosInstance } from "@/configs/axiosConfig";

const token = localStorage.getItem("token");

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const userApi = {
  async getInfo() {
    try {
      const data = await axiosInstance.get("/users/info");
      return data.data;
    } catch (error) {
      console.error({ error });
      return {};
    }
  },

  async getDetailInfo(userId) {
    try {
      const data = await axiosInstance.get("/users/" + userId);
      return data.data;
    } catch (error) {
      console.error({ error });
      return {};
    }
  },

  async updateProfile(data) {
    try {
      const response = await axiosInstance.put("/users/update", data);
      return response.data;
    } catch (error) {
      console.error("Error in updateProfile API:", error);
      return null;
    }
  },
  async getUserImages() {
    try {
      const data = await axiosInstance.get("/users/images");
      return data.data;
    } catch (error) {
      console.error({ error });
      return {};
    }
  },
};

export default userApi;
