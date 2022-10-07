import React from 'react';
import { Navigate } from 'react-router-dom';
import { useScorecardStore } from '../../stores';

export const PrivateRoute = ({ children }) => {
    const {
        user
    } = useScorecardStore()
    const auth = user.isLoggedIn;
    return auth ? children : <Navigate to="/signin" />;
}

