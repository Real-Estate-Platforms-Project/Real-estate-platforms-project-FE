import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

const getEmployees = () => axios.get(API_URL);
const addEmployee = (employee) => axios.post(API_URL, employee);
const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

async function ListEmployees() {
    let response = null
    await axios({
        url: `http://localhost:8080/api/employees`,
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    })
        .then((res) => {
            response = res
        })
        .catch((e) => {
            response = e.response
        })

    return response.data
}

export default {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    ListEmployees
};
