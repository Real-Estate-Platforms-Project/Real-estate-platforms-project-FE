import axios from 'axios';

// Interceptor để thêm token vào mọi request
axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');

    if (token) {
        // Thêm token vào header Authorization
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
}, error => {
    if (error.response.status === 401) {
        window.location.href = 'http://localhost:3000/login';
    }
    return Promise.reject(error);
});
