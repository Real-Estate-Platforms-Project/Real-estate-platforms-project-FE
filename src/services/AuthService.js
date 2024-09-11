import axios from "axios";

const URL_AUTH_BASE = "http://localhost:8080/api/auth";

const login = (email, password) => {
    return axios.post(`${URL_AUTH_BASE}/login`, {
        email,
        password
    });
};

const register = async (data) => {
    return await axios.post(`${URL_AUTH_BASE}/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
    });
};

const confirmRegister = async (token) => {
    return await axios.get(`${URL_AUTH_BASE}/confirm?token=${token}`)
}

const authService = {
    login,
    register,
    confirmRegister
};

export default authService;