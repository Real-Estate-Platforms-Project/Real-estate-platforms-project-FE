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


