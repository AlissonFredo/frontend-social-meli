import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UsersContext';

export default function ProtectedPages({ rule = "BUYER" }) {
    const { selectedUser } = useUser();

    const isAuthenticated = selectedUser && selectedUser.tipo == rule;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
}