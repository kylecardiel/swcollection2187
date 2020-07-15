import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { Header } from 'components/header/header';
import { ProtectedRoute } from 'routes/protectedRoute';
import { SignUp } from 'components/auth/signUp';
import { LogIn } from 'components/auth/logIn';
import { ForgotPassword } from 'components/auth/forgotPassword';

const {
    HOME,
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
} = ROUTE_CONSTANTS;

export const Routes = props => {

    const {
        logoutUser,
        userLoggedIn,
        registerUser,
    } = props;


    return (
        <React.Fragment>
            <Router>
                <Header title={'@SWCollection2187'} userLoggedIn={userLoggedIn} logoutUser={logoutUser} />
                <Route exact path='/' render={
                    () => <Redirect to={HOME} />
                }
                />
                <Switch>
                <ProtectedRoute
                        path={LOGIN} redirectPath={HOME}
                        userLoggedIn={!userLoggedIn}
                        component={LogIn}
                    />
                    <ProtectedRoute
                        path={FORGOT_PASSWORD} redirectPath={HOME}
                        userLoggedIn={!userLoggedIn}
                        component={ForgotPassword}
                    />
                    <ProtectedRoute
                        path={SIGNUP} redirectPath={HOME}
                        userLoggedIn={!userLoggedIn}
                        component={
                            () => <SignUp registerUser={registerUser}
                            />}
                    />
                    <ProtectedRoute
                        path={HOME} redirectPath={LOGIN}
                        userLoggedIn={userLoggedIn} access={true}
                        component={
                            () => <Homepage
                                userLoggedIn={userLoggedIn}
                            />}
                    />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

