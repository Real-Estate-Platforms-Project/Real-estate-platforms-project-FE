import { Code, Search } from "@mui/icons-material";
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
        console.log("Dữ liệu gửi đi:", transaction);
        const response = await axios.post(URL_TRANSACTION, transaction);
        console.log("Phản hồi từ API:", response);
        return response.status === 200;
    } catch (e) {
        console.error("Lỗi khi lưu giao dịch:", e);
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

export const searchTransactionCodeAndDescription = async (keyword) => {
    try {
        let query = `/search/${keyword}`; 
        console.log('Query:', query); 
        let res = await axios.get(URL_TRANSACTION + query);
        console.log('Response:', res.data);
        return res.data.content;  
    } catch (e) {
        console.log("Lỗi khi truy xuất giao dịch:", e);
        return [];
    }
};

