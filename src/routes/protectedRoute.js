import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ component: Comp, userLoggedIn, access, path, redirectPath, ...rest }) => {

    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return userLoggedIn && access ? <Comp {...props} /> : <Redirect to={redirectPath} />;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    userLoggedIn: PropTypes.bool.isRequired,
    access: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    redirectPath: PropTypes.string.isRequired,
};
