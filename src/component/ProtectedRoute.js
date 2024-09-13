import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';


const ProtectedRoute = ({ requiredRoles }) => {

    const { isAuthenticated, roles, status } = useSelector((state) => state.auth);
    const roleNames = roles.map(role => role.name);

    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - roles:", roles);
    console.log("ProtectedRoute - status:", status);


    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    if (requiredRoles && !requiredRoles.some(role => roleNames.includes(role))) {
        return <Navigate to="/403"/>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
