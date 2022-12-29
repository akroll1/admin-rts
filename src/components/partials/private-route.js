import { Navigate } from 'react-router-dom';
import { useGlobalStore } from '../../stores';

export const PrivateRoute = ({ children }) => {
    
    const {
        isLoggedIn
    } = useGlobalStore()

    return isLoggedIn ? children : <Navigate to="/signin" />;
}

