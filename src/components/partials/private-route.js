import React from 'react';
import { isLoggedIn } from '../../utils'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = props => {
    const { children } = props;
    const auth = isLoggedIn();
    
    return auth ? children : <Navigate to="/signin" />;
}

