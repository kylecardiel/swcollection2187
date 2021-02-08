import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { AboutMe } from 'components/aboutMe/aboutMe';
import HowToConnect from 'components/hoc/howToConnect';
import { ContactMe } from 'components/contactMe/contactMe';
import { FeatureFlagConsumer } from 'context/featureFlagsContext';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { TermsOfService } from 'components/termsOfService/termsOfService';
import { FuturePlans } from '../components/futurePlans/futurePlans';

const { ABOUT_ME, CONTACT_ME, HOME, HOW_TO, FUTURE_PLANS,  TOS } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    const { signUpPage, videoGamesCollection } = useContext(FeatureFlagConsumer);
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Route
                    exact
                    path={HOME}
                    component={() => <Homepage videoGamesCollection={videoGamesCollection}/>}
                />
                <Route
                    exact
                    path={ABOUT_ME}
                    component={AboutMe}
                />
                <Route
                    exact
                    path={HOW_TO}
                    component={HowToConnect}
                />
                <Route
                    exact
                    path={FUTURE_PLANS}
                    component={FuturePlans}
                />
                <Route
                    exact
                    path={TOS}
                    component={() => <TermsOfService signUpPage={signUpPage}/>}
                />
                <Route
                    exact
                    path={CONTACT_ME}
                    component={() => <ContactMe signUpPage={signUpPage}/>}
                />
            </Router>
        </React.Fragment>
    );
};
