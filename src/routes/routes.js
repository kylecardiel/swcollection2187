import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { Header } from 'components/header/header';

const {
    HOME,
} = ROUTE_CONSTANTS;

export const Routes = props => {
    return (
        <React.Fragment>
            <Router>
                <Header title={'Star Wars Collection @ SWCollection2187'} />
                <Route exact path='/' render={
                    () => <Redirect to={HOME} />
                }
                />
                <Switch>
                    <Route path={HOME} component={Homepage} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

