import apiClient from "../configs/AxiosConfigs";
import axios from "axios";
import {date} from "yup";
import data from "bootstrap/js/src/dom/data";
import {getToken} from "../utils/storage";


const URL_BASE = "http://localhost:8080/api/auth";

export const checkDateToChangePassword = async () => {
    try {
        const res = await apiClient.get(`${URL_BASE}/checkDateToChangePassword`);
        return res.data;
    } catch (e) {
        return "Lỗi catch rồi"
    }
}

export const getExpiryDate = async () => {
    try {
        const res = await apiClient.get(`${URL_BASE}/getExpiryDate`);
        return res.data;
    } catch (e) {
        return "Lỗi catch rồi"
    }
}

export const checkIsDeleted = async () => {
    try {
        const res = await apiClient.get(`${URL_BASE}/checkIsDeleted`);
        return !!res.data;
    } catch (e) {
        return "Lỗi  rồi"
    }
}
export const UpdatePassword = async (data) => {
    try {
        await apiClient.put(`/auth/updatePassWord`, {
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
export const UpdateForgetPassword = async (data, token) => {
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