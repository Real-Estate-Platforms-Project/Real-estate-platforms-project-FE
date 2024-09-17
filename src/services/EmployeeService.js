
import apiClient from "../configs/AxiosConfigs";
import employee from "sockjs-client/lib/transport/receiver/jsonp";

export const getEmployees = async (filters = {}) => {
    try {
        const query = new URLSearchParams(filters).toString();
        console.log(query);
        const res = await apiClient.get(`/admin/employees/search?${query}`);
        return res.data;
    } catch (e) {
        console.error("Error fetching employee data:", e);
        throw e;
    }
};

export const deleteEmployee = async (employeeId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('Không tìm thấy token trong session storage');
        }
        const response = await apiClient.delete(`/admin/employees/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status !== 200) {
            throw new Error(`Lỗi khi xóa nhân viên: ${response.statusText}`);
        }
        return response.data;
    } catch (e) {
        console.error("Lỗi khi xóa nhân viên:", e);
        throw e;
    }
};


export const updateEmployee = async (employee) => {
    try {
        const token = sessionStorage.getItem('token');
        const res = await apiClient.put(`/admin/employees/${employee.id}`, employee, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error updating employee:", e);
        throw e;
    }
};

export const checkEmailExists = async (email) => {
    try {
        const token = sessionStorage.getItem('token');
        const res = await apiClient.get(`/admin/employees/check-email`, {
            params: { email },
        });
        return res.data;
    } catch (e) {
        console.error("Error checking email:", e);
        throw e;
    }
};