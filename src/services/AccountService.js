import axios from "axios";
import apiClient from "../configs/axiosConfigs";

const URL_ACCOUNT = "http://localhost:8080/api/auth";

export const updatePassword = async (data) => {
    try {
        const response = await apiClient.put('/auth/updatePassWord', {
            recentPassWord: data.recentPassWord,
            newPassWord: data.newPassWord,
            reEnterPassWord: data.reEnterPassWord
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        return false;
    }
};

// export const UpdateAccount = async (data) => {
//     try {
//         await axios.put(`${URL_ACCOUNT}/update-password`,{
//             recentPassWord: data.recentPassWord,
//             newPassWord: data.newPassWord,
//             reEnterPassWord: data.reEnterPassWord
//         });
//         return true;
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// }


