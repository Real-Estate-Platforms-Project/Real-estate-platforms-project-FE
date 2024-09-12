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
        const response = await axios.post(URL_TRANSACTION, transaction);
        return response.status === 200;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deleteTransaction = async (id) => {
    try {
        await axios.delete(URL_TRANSACTION + "/" + id);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

