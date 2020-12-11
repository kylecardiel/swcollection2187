import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import ActionFigureDetailsConnect from 'components/hoc/actionFigureDetailsConnect';
import Admin from 'components/admin/admin';
import { BlackSeries } from 'components/blackSeries/blackSeries';
import { FeatureFlagConsumer } from 'context/featureFlagsContext';
import { ForgotPassword } from 'components/auth/forgotPassword';
import { Header } from 'components/header/header';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';
import { LogIn } from 'components/auth/logIn';
import { NoSignUp } from 'components/auth/noSignUp';
import PropTypes from 'prop-types';
import { ProtectedRoute } from 'routes/protectedRoute';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { ScreenSize } from 'components/common/screenSize';
import { SignUp } from 'components/auth/signUp';
import { UserConsumer } from 'components/auth/authContext';

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
                    <ProtectedRoute
                        exact
                        path={BLACK_SERIES}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={BlackSeries}
                    />
                    <ProtectedRoute
                        exact
                        path={`${BLACK_SERIES}/:id`}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={ActionFigureDetailsConnect}
                    />
                </Switch>
            </Router>
            <ScreenSize setScreenSizes={setScreenSizes}/>
        </React.Fragment>
    );
};

PrivateRoutes.propTypes = {
    setScreenSizes: PropTypes.func.isRequired,
};
