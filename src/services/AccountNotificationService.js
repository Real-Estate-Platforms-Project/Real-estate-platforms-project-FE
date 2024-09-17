import axios from "axios";
import apiClient from "../configs/AxiosConfigs";

export const getNotificationByAccountId = async () => {
    try {
        const response = await apiClient.get(`http://localhost:8080/api/notification`);
        return response.data;
    } catch (error) {
        console.error("Error fetching real estate data:", error);
        throw error;
    }
};