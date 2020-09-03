import React, { useContext } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { ProtectedRoute } from 'routes/protectedRoute';
import { SignUp } from 'components/auth/signUp';
import { LogIn } from 'components/auth/logIn';
import { ForgotPassword } from 'components/auth/forgotPassword';
import { UserConsumer } from 'components/auth/authContext';
import Admin from 'components/admin/admin';
import { ROLES } from 'shared/constants/roleConstants';
import { Header } from 'components/header/header';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';
import { FeatureFlagConsumer } from '../context/featureFlagsContext';
import { NoSignUp } from 'components/auth/noSignUp';
import { Homepage } from 'components/homePage/homePage';
import { BlackSeries } from 'components/blackSeries/blackSeries';
import ActionFigureDetailsConnect from 'components/hoc/actionFigureDetailsConnect';
import { ScreenSize } from 'components/common/screenSize';

const { HOME, LOGIN, SIGNUP, FORGOT_PASSWORD, ADMIN, BLACK_SERIES } = ROUTE_CONSTANTS;

export const PrivateRoutes = ({ setScreenSizes }) => {
    const { loggedIn, email } = useContext(UserConsumer);
    const { signUpPage } = useContext(FeatureFlagConsumer);
    const redirectRender = () => <Redirect to={HOME} />;

    return (
        <React.Fragment>
            <Router>
                <Header title={HEADER_TITLE} userLoggedIn={loggedIn} />
                <Route exact path='/' render={redirectRender} />
                <Switch>
                    <ProtectedRoute
                        path={HOME}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={Homepage}
                    />
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
                        component={signUpPage ? SignUp : NoSignUp}
                    />
                    <ProtectedRoute
                        path={ADMIN}
                        redirectPath={HOME}
                        access={email === ROLES.EMAIL}
                        userLoggedIn={loggedIn}
                        component={Admin}
                    />
                    {loggedIn &&
                        <>
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
                        </>
                    }
                </Switch>
            </Router>
            <ScreenSize setScreenSizes={setScreenSizes}/>
        </React.Fragment>
    );
};

