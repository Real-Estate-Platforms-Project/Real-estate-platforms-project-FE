import axios from "axios";
import apiClient from "../configs/axiosConfigs";

const URL_AUTH_BASE = "http://localhost:8080/api/auth";

const login = (email, password) => {
    return axios.post(`${URL_AUTH_BASE}/login`, {
        email,
        password
    });
};

const register = (data) => {
    return axios.post(`${URL_AUTH_BASE}/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
    });
};

const confirmRegister = async (token) => {
    return axios.get(`${URL_AUTH_BASE}/confirm?token=${token}`)
}

const authService = {
    login,
    register,
    confirmRegister
};

export default authService;

export const getAllUserRoles = async (data) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        console.log(token)

        const res = await axios.get(`http://localhost:8080/api/auth/get-roles`, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching buyer data:", e);
        throw e;
    }
};