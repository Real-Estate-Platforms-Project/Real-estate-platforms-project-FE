import axios from "axios";
import {getToken} from "../utils/storage";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(request => {
    const token = getToken();

    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
}, error => {
    if (error.response && error.response.status === 401) {
        window.location.href = 'http://localhost:3000/login';
    }
    return Promise.reject(error);
});

export default apiClient;
