import axios from "axios";
import apiClient from "../configs/AxiosConfigs";

export const SellerInfo = async () => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem('token'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        console.log(token)

        const res = await apiClient.get(`/admin/sellers/info`, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching seller data:", e);
        throw e;
    }
};


