import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from "./Loading";


const ProtectedRoute = ({ requiredRoles }) => {

    const { isAuthenticated, roles, status } = useSelector((state) => state.information);
    const roleNames = roles.map(role => role.name);

    if (status === 'idle') {
        return <Loading/>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    if (requiredRoles && !requiredRoles.some(role => roleNames.includes(role))) {
        return <Navigate to="/403"/>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
