import axios from "axios";

const URL_TRANSACTION = "http://localhost:8080/api/transactions"



export const getAllHome = async (searchTransactionCode = "") => {
    try {
        const user = localStorage.getItem('user');
        if (!user) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }

        const { token } = JSON.parse(user);
        if (!token) {
            throw new Error('Không tìm thấy token hợp lệ');
        }

        const query = searchTransactionCode ? `?page=${encodeURIComponent(searchTransactionCode)}` : "";
        const url = `${URL_TRANSACTION}${query}`;

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất cả giao dịch:", error.message);
        return [];
    }
};


export const saveTransaction = async (transaction) => {
    try {

        const token = sessionStorage.getItem('token');
        console.log("token save", token);
        if (!token) {
            throw new Error('Không tìm thấy token trong session storage');
        }


        const response = await axios.post(URL_TRANSACTION, transaction);
        return response.data;
    } catch (e) {
        console.error("Lỗi khi lưu giao dịch:", e);
        return e.response ? e.response.data : { message: "Lỗi không xác định" };
    }
};


export const deleteTransaction = async (id) => {
    try {

        const token = sessionStorage.getItem('token');
        console.log("token delete", token);
        if (!token) {
            throw new Error('Không tìm thấy token trong session storage');
        }


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
        console.log("Transaction data request:", transaction);

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
