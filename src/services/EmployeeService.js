import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/employees';

const getEmployees = () => axios.get(API_URL);
const addEmployee = (employee) => axios.post(API_URL, employee);
const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};
