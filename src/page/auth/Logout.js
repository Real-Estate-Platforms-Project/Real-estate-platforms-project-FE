import { useNavigate } from 'react-router-dom';
import {removeToken} from "../../utils/tokenUtils";


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <div>
            <i className="fa-solid fa-right-from-bracket"></i>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
