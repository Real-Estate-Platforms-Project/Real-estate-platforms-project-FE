import axios from "axios";

const URL_ACCOUNT = "http://localhost:8080/api/auth";

export const UpdateAccount = async (value) => {
    try {
        await axios.put(URL_ACCOUNT,value);
        return true;
    } catch (error) {
        return [];
    }
}
export const Login = async (value) => {
    try {
        await axios.post(URL_ACCOUNT,value);
        return true;
    } catch (error) {
        return [];
    }
}

