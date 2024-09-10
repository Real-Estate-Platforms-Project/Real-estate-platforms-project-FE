import axios from "axios";
const URL_TRANSACTION = "http://localhost:8080/api/transactions"

export const getAllHome = async (searchTransactionCode, ) => {
    try {
        let query = "";

        let res = await axios.get(URL_TRANSACTION + query);
        return res.data;
    } catch (e) {
        console.log("Lỗi khi truy xuất tất cả giao dịch:", e);
        return [];
    }
}