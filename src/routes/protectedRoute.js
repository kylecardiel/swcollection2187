import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Comp, userLoggedIn, path, redirectPath, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return userLoggedIn ? <Comp {...props} /> : <Redirect to={redirectPath} />;
            }}
        />
    );
};