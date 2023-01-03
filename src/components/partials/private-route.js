import { Navigate } from 'react-router-dom';
import { useGlobalStore } from '../../stores';

export const PrivateRoute = ({ children }) => {
    
    const {
        user
    } = useGlobalStore()

    return user.isLoggedIn ? children : <Navigate to="/signin" />;
}

