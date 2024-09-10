import axios from "axios";

const URL_ACCOUNT = "http://localhost:8080/api/auth";

export const UpdateAccount = async (data) => {
    try {
        await axios.put(`${URL_ACCOUNT}/update-password`,{
            recentPassWord: data.recentPassWord,
            newPassWord: data.newPassWord,
            reEnterPassWord: data.reEnterPassWord
        });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}


