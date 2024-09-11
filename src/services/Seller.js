import axios from "axios";

export const SellerInfo = async () => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        console.log(token)

        const res = await axios.get(`http://localhost:8080/api/admin/sellers/info`, {
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


