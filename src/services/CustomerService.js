import axios from 'axios';
import { toast } from 'react-toastify';

export const addCustomer = async (formData) => {
    try {
        await axios.post('http://localhost:8080/api/customers/add', formData, {
        });
        toast.success('Khách hàng đã được thêm thành công.', {
            position: "top-right",
            autoClose: 3000,
        });
    } catch (error) {
        console.error('Error adding customer:', error.response ? error.response.data : error.message);
        if (error.response) {
            toast.error(`Lỗi khi thêm khách hàng: ${error.response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error('Lỗi kết nối. Vui lòng thử lại.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
        throw error;
    }
};

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/customers/check-email`, {
            params: { email: email },
        });
        if (response.data) {
            toast.error('Email đã tồn tại. Vui lòng sử dụng email khác.', {
                position: "top-right",
                autoClose: 3000,
            });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking email:', error);
        toast.error('Lỗi kiểm tra email. Vui lòng thử lại.', {
            position: "top-right",
            autoClose: 3000,
        });
        throw error;
    }
};