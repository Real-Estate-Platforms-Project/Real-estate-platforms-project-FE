import {useDispatch} from "react-redux";
import {logout} from "../redux/UserReducer";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    }

    return (
        <button className='button-black'>
            <span className='fw-bold' onClick={handleLogout}>Đăng xuất</span>
        </button>
    )
}