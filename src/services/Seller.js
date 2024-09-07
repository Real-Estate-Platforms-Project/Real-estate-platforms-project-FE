import axios from "axios";

export const getSellerById = async (sellerId) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/sellers/${sellerId}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching seller data:", e);
        throw e;
    }
};
