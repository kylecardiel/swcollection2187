import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
            </Router>
        </React.Fragment>
    );
};
