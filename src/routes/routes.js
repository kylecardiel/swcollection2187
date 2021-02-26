import { AboutMe } from 'components/aboutMe/aboutMe';
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
import { ContactMe } from 'components/contactMe/contactMe';
import { FuturePlans } from 'components/futurePlans/futurePlans';
import { Header } from 'components/header/header';
import HowToConnect from 'components/hoc/howToConnect';
import ReadContactMeConnect from 'components/hoc/readContactMeConnect';
import UserProfileConnect from 'components/hoc/userProfileConnect';
import { Homepage } from 'components/homePage/homePage';
import { TermsOfService } from 'components/termsOfService/termsOfService';
import { FeatureFlagConsumer } from 'context/featureFlagsContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from 'routes/protectedRoute';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_TITLE } from 'shared/constants/stringConstantsSelectors';

const { ABOUT_ME, CONTACT_ME, HOW_TO, FUTURE_PLANS, TOS, HOME, LOGIN, SIGNUP, FORGOT_PASSWORD, ADMIN, BLACK_SERIES, VIDEO_GAMES, READ_CONTACT_ME, USER_PROFILE } = ROUTE_CONSTANTS;

export const Routes = ({ setScreenSizes }) => {  
    const { googleSignin, signUpPage } = useContext(FeatureFlagConsumer);
    const { loggedIn, email } = useContext(UserConsumer);
    const authorizedAdmin = email === ROLES.EMAIL;

    return (
        <React.Fragment>
            <Router>
                <Header title={HEADER_TITLE} userLoggedIn={loggedIn} />
                <Switch>
                    <Route exact path='/'><Homepage/></Route>
                    <Route path={HOME}><Homepage/></Route>
                    <Route path={ABOUT_ME}><AboutMe/></Route>
                    <Route path={HOW_TO}><HowToConnect/></Route>
                    <Route path={FUTURE_PLANS}><FuturePlans/></Route>
                    <Route path={TOS}><TermsOfService signUpPage={signUpPage}/></Route>
                    <Route path={CONTACT_ME}><ContactMe signUpPage={signUpPage}/></Route>
                    
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
                    <ProtectedRoute
                        exact
                        path={USER_PROFILE}
                        redirectPath={LOGIN}
                        access={true}
                        userLoggedIn={loggedIn}
                        component={UserProfileConnect}
                    />
                </Switch>
            </Router>
            <ScreenSize setScreenSizes={setScreenSizes}/>
        </React.Fragment>
    );
};

Routes.propTypes = {
    setScreenSizes: PropTypes.func.isRequired,
};