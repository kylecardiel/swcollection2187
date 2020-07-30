import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { BlackSeries } from 'components/blackSeries/blackSeries';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Switch>
                    <Route
                        path={HOME}
                        component={Homepage}
                    />
                    <Route
                        path={BLACK_SERIES}
                        component={BlackSeries}
                    />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

