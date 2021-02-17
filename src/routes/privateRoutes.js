import Admin from 'components/admin/admin';
import { UserConsumer } from 'components/auth/authContext';
import { ForgotPassword } from 'components/auth/forgotPassword';
import { LogIn } from 'components/auth/logIn';
import { NoSignUp } from 'components/auth/noSignUp';
import { SignUp } from 'components/auth/signUp';
import { BlackSeries } from 'components/catalog/actionFigures/blackSeries/pages/blackSeries';
import { BlackSeriesDetailsPage } from 'components/catalog/actionFigures/blackSeries/pages/blackSeriesDetailsPage';
import { VideoGameDetailsPage } from 'components/catalog/videoGames/pages/videoGameDetailsPage';
import { VideoGamesPage } from 'components/catalog/videoGames/pages/videoGamesPage';
import { ScreenSize } from 'components/common/screenSize';
import { Header } from 'components/header/header';
import { FeatureFlagConsumer } from 'context/featureFlagsContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'routes/protectedRoute';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';
import ReadContactMeConnect from 'components/hoc/readContactMeConnect';

const { HOME, LOGIN, SIGNUP, FORGOT_PASSWORD, ADMIN, BLACK_SERIES, VIDEO_GAMES, READ_CONTACT_ME } = ROUTE_CONSTANTS;

export const PrivateRoutes = ({ setScreenSizes }) => {
    const { loggedIn, email } = useContext(UserConsumer);
    const { googleSignin, signUpPage } = useContext(FeatureFlagConsumer);
    const redirectRender = () => <Redirect to={HOME} />;
    const authorizedAdmin = email === ROLES.EMAIL;

    console.log(googleSignin)

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
                        component={() => <LogIn googleSignInFlag={googleSignin}/>}
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
                        access={authorizedAdmin}
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
                        component={BlackSeriesDetailsPage}
                    />
                    <ProtectedRoute
                        exact
                        path={VIDEO_GAMES}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={VideoGamesPage}
                    />
                    <ProtectedRoute
                        exact
                        path={`${VIDEO_GAMES}/:id`}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={VideoGameDetailsPage}
                    />
                    <ProtectedRoute
                        exact
                        path={READ_CONTACT_ME}
                        redirectPath={LOGIN}
                        access={authorizedAdmin}
                        userLoggedIn={loggedIn}
                        component={ReadContactMeConnect}
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
