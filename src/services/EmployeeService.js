import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/employees';

export const getEmployees = async (filters = {}) => {
    try {
        const token = sessionStorage.getItem('token');
        const query = new URLSearchParams(filters).toString();
        const res = await axios.get(`${API_URL}?${query}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching employee data:", e);
        throw e;
    }
};

export const deleteEmployee = async (employeeId) => {
    try {
        const token = sessionStorage.getItem('token');
        await axios.delete(`${API_URL}/${employeeId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    } catch (e) {
        console.error("Error deleting employee:", e);
        throw e;
    }
};

export const updateEmployee = async (employee) => {
    try {
        const token = sessionStorage.getItem('token');
        const res = await axios.put(`${API_URL}/${employee.id}`, employee, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error updating employee:", e);
        throw e;
    }
};