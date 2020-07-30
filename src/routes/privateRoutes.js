import React, { useContext } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { ProtectedRoute } from 'routes/protectedRoute';
import { SignUp } from 'components/auth/signUp';
import { LogIn } from 'components/auth/logIn';
import { ForgotPassword } from 'components/auth/forgotPassword';
import { UserConsumer } from 'components/auth/authContext';
import { Admin } from 'components/admin/admin';
import { MyCollection } from 'components/myCollection/myCollection';
import { ROLES } from 'shared/constants/roleConstants';
import { Header } from 'components/header/header';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';

const { HOME, LOGIN, SIGNUP, FORGOT_PASSWORD, MY_COLLECTION, ADMIN } = ROUTE_CONSTANTS;

export const PrivateRoutes = () => {
    const { loggedIn, email } = useContext(UserConsumer);
    return (
        <React.Fragment>
            <Router>
                <Header title={HEADER_TITLE} userLoggedIn={loggedIn} />
                <Route exact path='/' render={ () => <Redirect to={HOME} /> } />
                <Switch>
                    <ProtectedRoute
                        path={LOGIN} 
                        redirectPath={HOME}
                        access={true}
                        userLoggedIn={!loggedIn}
                        component={LogIn}
                    />
                    <ProtectedRoute
                        path={FORGOT_PASSWORD} 
                        redirectPath={HOME}
                        access={true}
                        userLoggedIn={!loggedIn}
                        component={ForgotPassword}
                    />
                    <ProtectedRoute
                        path={SIGNUP} 
                        redirectPath={HOME}
                        access={true}
                        userLoggedIn={!loggedIn}
                        component={SignUp}
                    />
                    <ProtectedRoute
                        path={ADMIN} 
                        redirectPath={HOME}
                        access={email === ROLES.EMAIL}
                        userLoggedIn={loggedIn}
                        component={Admin}
                    />
                    <ProtectedRoute
                        path={MY_COLLECTION} 
                        redirectPath={HOME}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={MyCollection}
                    />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

