import apiClient from "../configs/axiosConfigs";
import axios from "axios";

export const updatePassword = async (data) => {
    try {
        await apiClient.put('/auth/updatePassWord', {
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
        const token = localStorage.getItem("token");
        if (token != null) {
            const res = await axios.get(`http://localhost:8080/api/auth/get-roles`, {
                headers: {
                    "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
                }
            });
            return res.data.map((value) => value.name)
        }
        return [];
    }
    catch
        (e)
        {
            console.error("Error fetching buyer data:", e);
            return []
        }


};





