import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { AboutMe } from 'components/aboutMe/aboutMe';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { ABOUT_ME, HOME } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Route
                    exact
                    path={ABOUT_ME}
                    component={AboutMe}
                />
            </Router>
        </React.Fragment>
    );
};
