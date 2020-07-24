import React, { useContext } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { Header } from 'components/header/header';
import { ProtectedRoute } from 'routes/protectedRoute';
import { SignUp } from 'components/auth/signUp';
import { LogIn } from 'components/auth/logIn';
import { ForgotPassword } from 'components/auth/forgotPassword';
import { UserConsumer } from 'components/auth/authContext';
import { BlackSeries } from 'components/blackSeries/blackSeries';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';
import { Admin } from 'components/admin/admin';
import { MyCollection } from 'components/myCollection/myCollection';

const { HOME, LOGIN, SIGNUP, FORGOT_PASSWORD, BLACK_SERIES, MY_COLLECTION, ADMIN } = ROUTE_CONSTANTS;

export const Routes = () => {
    const { loggedIn } = useContext(UserConsumer);
    return (
        <React.Fragment>
            <Router>
                <Header title={HEADER_TITLE} userLoggedIn={loggedIn} />
                <Route exact path='/' render={ () => <Redirect to={HOME} /> } />
                <Switch>
                    <ProtectedRoute
                        path={LOGIN} 
                        redirectPath={HOME}
                        userLoggedIn={!loggedIn}
                        component={LogIn}
                    />
                    <ProtectedRoute
                        path={FORGOT_PASSWORD} 
                        redirectPath={HOME}
                        userLoggedIn={!loggedIn}
                        component={ForgotPassword}
                    />
                    <ProtectedRoute
                        path={SIGNUP} 
                        redirectPath={HOME}
                        userLoggedIn={!loggedIn}
                        component={SignUp}
                    />
                    <Route
                        path={HOME} 
                        component={Homepage}
                    />
                    <Route
                        path={BLACK_SERIES} 
                        component={BlackSeries}
                    />
                    <ProtectedRoute
                        path={ADMIN} 
                        redirectPath={HOME}
                        userLoggedIn={loggedIn}
                        component={Admin}
                    />
                    <ProtectedRoute
                        path={MY_COLLECTION} 
                        redirectPath={HOME}
                        userLoggedIn={loggedIn}
                        component={MyCollection}
                    />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

