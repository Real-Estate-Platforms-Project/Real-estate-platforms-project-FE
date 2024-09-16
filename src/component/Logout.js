import {useDispatch} from "react-redux";
import {logout} from "../redux/UserReducer";
import {useNavigate} from "react-router-dom";
import styles from "../css/NavClient.module.css";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    }

    return (
        <li className={styles.logout} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Đăng xuất</span>
        </li>
    );
}