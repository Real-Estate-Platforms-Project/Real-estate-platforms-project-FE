import axios from "axios";
import {getToken} from "../utils/storage";

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

