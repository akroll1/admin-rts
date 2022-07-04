import React from 'react';
import { isLoggedIn } from '../../utils'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = props => {
    const { children, setIsLoggedIn } = props;
    const auth = isLoggedIn();
    setIsLoggedIn(auth ? true : false);
    return auth ? children : <Navigate to="/signin" />;
}

