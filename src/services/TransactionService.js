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

export const saveTransaction = async (transaction) => {
    try {
        await axios.post(URL_TRANSACTION, transaction);
        return true;
    } catch (e) {
        return false;
    }
}