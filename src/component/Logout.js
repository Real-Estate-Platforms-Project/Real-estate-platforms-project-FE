import {removeToken} from "../utils/storage";
import {useDispatch} from "react-redux";

export default function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        removeToken();
        dispatch({
            type: "resetUser"
        })
        window.location.href='/login';
    }

    return (
        <button className='button-black'>
            <span className='fw-bold' onClick={handleLogout}>Đăng xuất</span>
        </button>
    )
}