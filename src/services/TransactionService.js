import axios from "axios";

const URL_TRANSACTION = "http://localhost:8080/api/transactions"

export const getAllHome = async (searchTransactionCode = "") => {
    try {
        // Kiểm tra nếu có mã giao dịch cần tìm kiếm, thêm vào query string
        let query = "";
        if (searchTransactionCode) {
            query = `?searchTransactionCode=${encodeURIComponent(searchTransactionCode)}`;
        }

        // Gửi request với query string
        let res = await axios.get(URL_TRANSACTION + query);

        // Trả về dữ liệu từ response
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

export const updateTransaction = async (id, transaction) => {
    try {
        const token = sessionStorage.getItem('token'); 
        console.log("Transaction data id:", id); 
        console.log("Transaction data request:", transaction);  // Kiểm tra dữ liệu transaction

        const res = await axios.put(`${URL_TRANSACTION}/${id}`, transaction, {
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json"
            }
        });
        console.log("Phản hồi từ API:", res);
        return res.data;
    } catch (e) {
        console.error("Lỗi khi cập nhật giao dịch:", e.response ? e.response.data : e);
        throw e;
    }
};


export const findTransactionId = async (id) => {
    try {
        let res = await axios.get(URL_TRANSACTION + "/" + id);
        console.log("du lieu",res.data);
        return res.data;
    } catch (e) {
        console.log('lỗi',e);
    }
}
