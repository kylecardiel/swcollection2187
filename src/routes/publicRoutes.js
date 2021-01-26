import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { AboutMe } from 'components/aboutMe/aboutMe';
import { ContactMe } from 'components/contactMe/contactMe';
import { FeatureFlagConsumer } from 'context/featureFlagsContext';
import { Homepage } from 'components/homePage/homePage';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { TermsOfService } from 'components/termsOfService/termsOfService';

const { ABOUT_ME, CONTACT_ME, HOME, TOS } = ROUTE_CONSTANTS;

export const PublicRoutes = () => {  
    const { signUpPage } = useContext(FeatureFlagConsumer);
    return (
        <React.Fragment>
            <Router>
                <Route exact path='/' render={() => <Redirect to={HOME} />} />
                <Route
                    exact
                    path={HOME}
                    component={Homepage}
                />
                <Route
                    exact
                    path={ABOUT_ME}
                    component={AboutMe}
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
