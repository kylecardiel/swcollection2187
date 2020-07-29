import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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