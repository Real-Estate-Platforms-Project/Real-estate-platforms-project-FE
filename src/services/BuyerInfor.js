import axios from "axios";
import {getToken} from "../utils/storage";

const API_URL= 'http://localhost:8080/api/admin/buyers'

export const BuyerInfor = async () => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        const res = await axios.get(`http://localhost:8080/api/admin/buyers/info`, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching buyer data:", e);
        throw e;
    }
};

export const getBuyers = async (filters = {}) => {
    try {
        const token = sessionStorage.getItem('token');
        const query = new URLSearchParams(filters).toString();
        const res = await axios.get(`${API_URL}?${query}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching employee data:", e);
        throw e;
    }
};
