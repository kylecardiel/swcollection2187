import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ component: Comp, userLoggedIn, access, path, redirectPath, ...rest }) => {
    const location = useLocation();

    return (
        <Route {...rest}>
            {userLoggedIn && access 
                ? <Comp /> 
                : <Redirect to={{ pathname: redirectPath, state: { from: location } }} />
            }
        </Route>
    );
};

ProtectedRoute.propTypes = {
    userLoggedIn: PropTypes.bool.isRequired,
    access: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    redirectPath: PropTypes.string.isRequired,
};
