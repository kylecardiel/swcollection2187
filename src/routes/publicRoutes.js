import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { BlackSeries } from 'components/blackSeries/blackSeries';
import ActionFigureDetailsConnect from 'components/hoc/actionFigureDetailsConnect';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Switch>
                    <Route
                        exact
                        path={HOME}
                        component={Homepage}
                    />
                    <Route
                        exact  
                        path={BLACK_SERIES}
                        component={BlackSeries}
                    />
                    <Route
                        exact
                        path={`${BLACK_SERIES}/:id`} 
                        component={ActionFigureDetailsConnect}
                    />
                </Switch>
            </Router>
        </React.Fragment>
    );
};
