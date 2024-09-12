import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';


const ProtectedRoute = ({ requiredRoles }) => {

    const { isAuthenticated, roles } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !roles.includes(requiredRoles)) {
        return <Navigate to="/403" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
