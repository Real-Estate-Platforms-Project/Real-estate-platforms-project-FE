import { toast } from 'react-toastify';
import apiClient from "../configs/AxiosConfigs";


export const addCustomer = async (formData) => {
    try {
        await apiClient.post('/admin/customers/add', formData, {
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
        const response = await apiClient.get(`/admin/customers/check-email`, {
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

export const updateAccountRole = async (accountId, newRole) => {
    try {
        const response = await apiClient.put(`/admin/customers/update-role/${accountId}?newRole=${newRole}`);
        toast.success('Vai trò đã được cập nhật thành công!', {
            position: "top-right",
            autoClose: 3000,
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating role for account with ID ${accountId}:`, error);
        if (error.response) {
            toast.error(`Lỗi khi cập nhật vai trò: ${error.response.data}`, {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error(`Đã xảy ra lỗi không xác định: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
        throw error;
    }
};

