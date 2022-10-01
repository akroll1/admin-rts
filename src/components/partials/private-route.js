import React from 'react';
import { Navigate } from 'react-router-dom';
import { useScorecardStore } from '../../stores';

export const PrivateRoute = props => {
    const { children } = props
    const {
        user
    } = useScorecardStore()
    const auth = user.isLoggedIn;
    return auth ? children : <Navigate to="/signin" />;
}

