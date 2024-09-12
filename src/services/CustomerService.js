import axios from 'axios';
import { toast } from 'react-toastify';

export const addCustomer = async (values) => {
    try {
        await axios.post('http://localhost:8080/api/customers/add', values);
        toast.success('Khách hàng đã được thêm thành công.', {
            position: "top-right",
            autoClose: 3000,
        });
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/customers/check-email?email=${email}`);
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