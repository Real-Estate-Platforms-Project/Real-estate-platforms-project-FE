import apiClient from "../configs/axiosConfigs";
import axios from "axios";

const URL_BASE = "http://localhost:8080/api/auth";
export const UpdatePassword = async (data,token) => {
    try {
       await apiClient.put(`/auth/updatePassWord?token=${token}`, {
            recentPassWord: data.recentPassWord,
            newPassWord: data.newPassWord,
            reEnterPassWord: data.reEnterPassWord
        });
       return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};

export const ConfirmEmail = async (token) => {
    return await axios.get(`${URL_BASE}/confirmEmail?token=${token}`)
}

export const createToken = async (email) => {
    return await axios.post(`${URL_BASE}/createToken/${email}`)
}
export const UpdateForgetPassword = async (data,token) => {
    try {
        await axios.put(`${URL_BASE}/updateForgetPassword?token=${token}`, {
            recentPassWord: data.recentPassWord,
            newPassWord: data.newPassWord,
            reEnterPassWord: data.reEnterPassWord
        });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};


export const getAllRoles = async () => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        const res = await axios.get(`http://localhost:8080/api/auth/get-roles`, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        let roles =  res.data.map((value)=>value.name)
        return roles
    } catch (e) {
        console.error("Error fetching buyer data:", e);
        throw e;
    }
};






