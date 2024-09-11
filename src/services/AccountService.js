import apiClient from "../configs/axiosConfigs";

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
