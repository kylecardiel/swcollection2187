import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { AboutMe } from 'components/aboutMe/aboutMe';
import { Homepage } from 'components/homePage/homePage';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { TermsOfService } from 'components/termsOfService/termsOfService';

const { ABOUT_ME, HOME, TOS } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Route
                    exact
                    path={HOME}
                    component={Homepage}
                />
                <Route
                    exact
                    path={ABOUT_ME}
                    component={AboutMe}
                />
                <Route
                    exact
                    path={TOS}
                    component={TermsOfService}
                />
            </Router>
        </React.Fragment>
    );
};
