import axios from "axios";
import {getToken} from "../utils/tokenUtils";

const URL_ACCOUNT = "http://localhost:8080/api/auth";

export const UpdateAccount = async (data) => {
    alert("djsdagd")
    const token = getToken();
    try {
        await axios.put(
            `${URL_ACCOUNT}/update-password`,
            {
                recentPassWord: data.recentPassWord,
                newPassWord: data.newPassWord,
                reEnterPassWord: data.reEnterPassWord
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Gửi token trong header
                    'Content-Type': 'application/json',
                }
            }

        );
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
// export const Login = async (value) => {
//     try {
//         await axios.post(URL_ACCOUNT,value);
//         return true;
//     } catch (error) {
//         return [];
//     }
// }

